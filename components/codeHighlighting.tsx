import React from 'react';

type TokenType =
  | 'plain'
  | 'keyword'
  | 'type'
  | 'string'
  | 'number'
  | 'comment'
  | 'function'
  | 'preprocessor'
  | 'constant';

type Token = {
  type: TokenType;
  value: string;
};

export type HighlightToken = {
  type: TokenType;
  value: string;
  start: number;
  end: number;
};

const TOKEN_CLASSNAMES: Record<TokenType, string> = {
  plain: 'text-slate-100',
  keyword: 'text-blue-300',
  type: 'text-cyan-300',
  string: 'text-amber-300',
  number: 'text-violet-300',
  comment: 'text-slate-400 italic',
  function: 'text-emerald-300',
  preprocessor: 'text-pink-300',
  constant: 'text-orange-300',
};

export const getTokenClassName = (tokenType: TokenType): string => TOKEN_CLASSNAMES[tokenType];

const CPP_KEYWORDS = new Set([
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return',
  'void', 'class', 'struct', 'enum', 'namespace', 'template', 'typename', 'using', 'public',
  'private', 'protected', 'static', 'const', 'constexpr', 'inline', 'volatile', 'virtual',
  'override', 'new', 'delete', 'try', 'catch', 'throw', 'true', 'false', 'nullptr',
]);

const CPP_TYPES = new Set([
  'int', 'long', 'short', 'float', 'double', 'char', 'bool', 'size_t', 'uint8_t', 'uint16_t',
  'uint32_t', 'uint64_t', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'auto',
]);

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'return', 'import',
  'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'pass', 'yield', 'in',
  'is', 'and', 'or', 'not', 'None', 'True', 'False', 'global', 'nonlocal',
]);

const PYTHON_BUILTIN_TYPES = new Set(['int', 'float', 'str', 'bool', 'list', 'dict', 'tuple', 'set']);

const CPP_CONSTANTS = new Set(['HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP']);

const isIdentifierStart = (char: string) => /[A-Za-z_]/.test(char);
const isIdentifierPart = (char: string) => /[A-Za-z0-9_]/.test(char);

const normalizeLanguage = (language: string): string => {
  const lower = (language || '').toLowerCase();
  if (['c', 'cc', 'cpp', 'c++', 'h', 'hpp', 'arduino'].includes(lower)) return 'cpp';
  if (['py', 'python', 'py3', 'python3', 'micropython'].includes(lower)) return 'python';
  if (['js', 'javascript', 'ts', 'typescript', 'jsx', 'tsx'].includes(lower)) return 'javascript';
  return 'plain';
};

const readWhile = (text: string, index: number, predicate: (char: string) => boolean): string => {
  let cursor = index;
  while (cursor < text.length && predicate(text[cursor])) {
    cursor += 1;
  }
  return text.slice(index, cursor);
};

const tokenizeCpp = (text: string): Token[] => {
  const tokens: Token[] = [];
  let index = 0;

  while (index < text.length) {
    const rest = text.slice(index);

    const whitespace = rest.match(/^\s+/);
    if (whitespace) {
      tokens.push({ type: 'plain', value: whitespace[0] });
      index += whitespace[0].length;
      continue;
    }

    if ((index === 0 || text[index - 1] === '\n') && rest.match(/^[ \t]*#[A-Za-z_][A-Za-z0-9_]*/)) {
      const line = rest.match(/^[^\n]*/)?.[0] ?? '';
      tokens.push({ type: 'preprocessor', value: line });
      index += line.length;
      continue;
    }

    const lineComment = rest.match(/^\/\/[^\n]*/);
    if (lineComment) {
      tokens.push({ type: 'comment', value: lineComment[0] });
      index += lineComment[0].length;
      continue;
    }

    const blockComment = rest.match(/^\/\*[\s\S]*?\*\//);
    if (blockComment) {
      tokens.push({ type: 'comment', value: blockComment[0] });
      index += blockComment[0].length;
      continue;
    }

    const stringLiteral = rest.match(/^"(?:\\.|[^"\\])*"|^'(?:\\.|[^'\\])*'/);
    if (stringLiteral) {
      tokens.push({ type: 'string', value: stringLiteral[0] });
      index += stringLiteral[0].length;
      continue;
    }

    const numberLiteral = rest.match(/^0x[\da-fA-F]+|^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (numberLiteral) {
      tokens.push({ type: 'number', value: numberLiteral[0] });
      index += numberLiteral[0].length;
      continue;
    }

    const identifier = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (identifier) {
      const value = identifier[0];
      const nextNonSpace = rest.slice(value.length).match(/^\s*\(/);
      if (CPP_TYPES.has(value)) {
        tokens.push({ type: 'type', value });
      } else if (CPP_KEYWORDS.has(value)) {
        tokens.push({ type: 'keyword', value });
      } else if (CPP_CONSTANTS.has(value)) {
        tokens.push({ type: 'constant', value });
      } else if (nextNonSpace) {
        tokens.push({ type: 'function', value });
      } else {
        tokens.push({ type: 'plain', value });
      }
      index += value.length;
      continue;
    }

    tokens.push({ type: 'plain', value: text[index] });
    index += 1;
  }

  return tokens;
};

const tokenizePython = (text: string): Token[] => {
  const tokens: Token[] = [];
  let index = 0;
  let expectsCallableName = false;
  let expectsTypeName = false;

  while (index < text.length) {
    const rest = text.slice(index);

    const whitespace = rest.match(/^\s+/);
    if (whitespace) {
      tokens.push({ type: 'plain', value: whitespace[0] });
      index += whitespace[0].length;
      continue;
    }

    const comment = rest.match(/^#[^\n]*/);
    if (comment) {
      tokens.push({ type: 'comment', value: comment[0] });
      index += comment[0].length;
      continue;
    }

    const decorator = rest.match(/^@[A-Za-z_][A-Za-z0-9_\.]*/);
    if (decorator) {
      tokens.push({ type: 'preprocessor', value: decorator[0] });
      index += decorator[0].length;
      continue;
    }

    const tripleQuote = rest.match(/^"""[\s\S]*?"""|^'''[\s\S]*?'''/);
    if (tripleQuote) {
      tokens.push({ type: 'string', value: tripleQuote[0] });
      index += tripleQuote[0].length;
      continue;
    }

    const stringLiteral = rest.match(/^"(?:\\.|[^"\\])*"|^'(?:\\.|[^'\\])*'/);
    if (stringLiteral) {
      tokens.push({ type: 'string', value: stringLiteral[0] });
      index += stringLiteral[0].length;
      continue;
    }

    const numberLiteral = rest.match(/^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (numberLiteral) {
      tokens.push({ type: 'number', value: numberLiteral[0] });
      index += numberLiteral[0].length;
      continue;
    }

    if (isIdentifierStart(text[index])) {
      const identifier = readWhile(text, index, isIdentifierPart);
      const nextNonSpace = text.slice(index + identifier.length).match(/^\s*\(/);

      if (expectsCallableName) {
        tokens.push({ type: 'function', value: identifier });
        expectsCallableName = false;
      } else if (expectsTypeName) {
        tokens.push({ type: 'type', value: identifier });
        expectsTypeName = false;
      } else if (PYTHON_BUILTIN_TYPES.has(identifier)) {
        tokens.push({ type: 'type', value: identifier });
      } else if (PYTHON_KEYWORDS.has(identifier)) {
        tokens.push({ type: 'keyword', value: identifier });
        if (identifier === 'def') {
          expectsCallableName = true;
        }
        if (identifier === 'class') {
          expectsTypeName = true;
        }
      } else if (identifier.toUpperCase() === identifier && identifier.length > 1) {
        tokens.push({ type: 'constant', value: identifier });
      } else if (nextNonSpace) {
        tokens.push({ type: 'function', value: identifier });
      } else {
        tokens.push({ type: 'plain', value: identifier });
      }

      index += identifier.length;
      continue;
    }

    tokens.push({ type: 'plain', value: text[index] });
    index += 1;
  }

  return tokens;
};

const tokenizeJavaScriptLike = (text: string): Token[] => {
  const jsKeywords = new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case',
    'break', 'continue', 'class', 'extends', 'import', 'from', 'export', 'default', 'new',
    'try', 'catch', 'finally', 'throw', 'await', 'async', 'true', 'false', 'null', 'undefined',
  ]);

  const tokens: Token[] = [];
  let index = 0;

  while (index < text.length) {
    const rest = text.slice(index);

    const whitespace = rest.match(/^\s+/);
    if (whitespace) {
      tokens.push({ type: 'plain', value: whitespace[0] });
      index += whitespace[0].length;
      continue;
    }

    const comment = rest.match(/^\/\/[^\n]*|^\/\*[\s\S]*?\*\//);
    if (comment) {
      tokens.push({ type: 'comment', value: comment[0] });
      index += comment[0].length;
      continue;
    }

    const stringLiteral = rest.match(/^`(?:\\.|[^`\\])*`|^"(?:\\.|[^"\\])*"|^'(?:\\.|[^'\\])*'/);
    if (stringLiteral) {
      tokens.push({ type: 'string', value: stringLiteral[0] });
      index += stringLiteral[0].length;
      continue;
    }

    const numberLiteral = rest.match(/^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (numberLiteral) {
      tokens.push({ type: 'number', value: numberLiteral[0] });
      index += numberLiteral[0].length;
      continue;
    }

    const identifier = rest.match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
    if (identifier) {
      const value = identifier[0];
      const nextNonSpace = rest.slice(value.length).match(/^\s*\(/);
      if (jsKeywords.has(value)) {
        tokens.push({ type: 'keyword', value });
      } else if (value.toUpperCase() === value && value.length > 1) {
        tokens.push({ type: 'constant', value });
      } else if (nextNonSpace) {
        tokens.push({ type: 'function', value });
      } else {
        tokens.push({ type: 'plain', value });
      }
      index += value.length;
      continue;
    }

    tokens.push({ type: 'plain', value: text[index] });
    index += 1;
  }

  return tokens;
};

const tokenizeCode = (text: string, language: string): Token[] => {
  const normalizedLanguage = normalizeLanguage(language);
  switch (normalizedLanguage) {
    case 'cpp':
      return tokenizeCpp(text);
    case 'python':
      return tokenizePython(text);
    case 'javascript':
      return tokenizeJavaScriptLike(text);
    default:
      return [{ type: 'plain', value: text }];
  }
};

export const tokenizeCodeWithPositions = (text: string, language: string): HighlightToken[] => {
  const tokens = tokenizeCode(text, language);
  let cursor = 0;

  return tokens.map((token) => {
    const start = cursor;
    const end = start + token.value.length;
    cursor = end;
    return {
      ...token,
      start,
      end,
    };
  });
};

export const renderSyntaxHighlightedCode = (
  text: string,
  language: string,
  keyPrefix: string
): React.ReactNode[] => {
  const tokens = tokenizeCode(text, language);
  return tokens.map((token, index) => (
    <span key={`${keyPrefix}-${index}`} className={TOKEN_CLASSNAMES[token.type]}>
      {token.value}
    </span>
  ));
};
