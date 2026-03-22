import type { CSSProperties } from 'react';

const dots = [
  { left: '8%', top: '16%', size: 6, delay: '0s', duration: '9s' },
  { left: '18%', top: '62%', size: 4, delay: '1.8s', duration: '11s' },
  { left: '28%', top: '34%', size: 5, delay: '0.6s', duration: '10s' },
  { left: '42%', top: '20%', size: 3, delay: '2.1s', duration: '12s' },
  { left: '54%', top: '68%', size: 6, delay: '1.1s', duration: '13s' },
  { left: '66%', top: '28%', size: 4, delay: '2.7s', duration: '9.5s' },
  { left: '76%', top: '52%', size: 5, delay: '0.9s', duration: '10.5s' },
  { left: '88%', top: '18%', size: 3, delay: '1.4s', duration: '12.5s' },
  { left: '84%', top: '74%', size: 6, delay: '2.4s', duration: '11.5s' },
  { left: '12%', top: '82%', size: 4, delay: '1.9s', duration: '14s' }
];

const symbols = [
  { label: 'f(x) = x^3 - 2x + 1', left: '14%', top: '24%', delay: '0s', duration: '20s' },
  { label: 'e^(iπ) + 1 = 0', left: '9%', top: '48%', delay: '3.2s', duration: '21s' },
  { label: '∫[a,b] (x^2 + 1) dx', left: '17%', top: '66%', delay: '5.1s', duration: '27s' },
  { label: 'sin t', left: '73%', top: '18%', delay: '4s', duration: '24s' },
  { label: 'cos θ', left: '61%', top: '14%', delay: '1.6s', duration: '23s' },
  { label: 'Σ[k=1→n] k^2 = n(n+1)(2n+1)/6', left: '46%', top: '17%', delay: '7.3s', duration: '25s' },
  { label: 'πr^2', left: '35%', top: '29%', delay: '2.8s', duration: '19s' },
  { label: 'Δx/Δt = lim[h→0] (f(x+h)-f(x))/h', left: '82%', top: '31%', delay: '6.4s', duration: '22s' },
  { label: '∇·F', left: '69%', top: '42%', delay: '0.9s', duration: '18.5s' },
  { label: 'x^2 + y^2 = r^2', left: '58%', top: '72%', delay: '2.5s', duration: '22s' },
  { label: 'P(A|B) = P(B|A)P(A)/P(B)', left: '43%', top: '58%', delay: '4.7s', duration: '24.5s' },
  { label: 'ln x', left: '30%', top: '71%', delay: '8.1s', duration: '21.5s' },
  { label: 'dy/dx = 3x^2 - 2', left: '22%', top: '78%', delay: '6s', duration: '26s' },
  { label: 'lim[n→∞] (1 + 1/n)^n', left: '84%', top: '56%', delay: '1.2s', duration: '18s' },
  { label: 'λ = c/f,  E = hf', left: '74%', top: '78%', delay: '2.2s', duration: '26.5s' },
  { label: 'mgh', left: '12%', top: '14%', delay: '9.4s', duration: '20.5s' },
  { label: 'i^2 = -1', left: '87%', top: '84%', delay: '5.8s', duration: '28s' },
  { label: '∮ E·dl = -(dΦ_B)/(dt)', left: '26%', top: '40%', delay: '10.2s', duration: '29s' },
  { label: '∂u/∂t = α ∂^2u/∂x^2', left: '55%', top: '49%', delay: '3.7s', duration: '30s' },
  { label: 'F(x) = ∫[-∞,x] f(t) dt', left: '64%', top: '82%', delay: '11.1s', duration: '31s' }
];

const lines = [
  { left: '10%', top: '18%', width: '18%', angle: 24, delay: '0s' },
  { left: '24%', top: '60%', width: '16%', angle: -18, delay: '1.3s' },
  { left: '48%', top: '26%', width: '20%', angle: 17, delay: '2.6s' },
  { left: '62%', top: '66%', width: '14%', angle: -26, delay: '0.8s' },
  { left: '74%', top: '36%', width: '12%', angle: 34, delay: '2.1s' }
];

const orbs = [
  { left: '12%', top: '12%', size: '26rem', delay: '0s', duration: '22s' },
  { left: '68%', top: '8%', size: '20rem', delay: '4s', duration: '26s' },
  { left: '52%', top: '60%', size: '24rem', delay: '2s', duration: '28s' }
];

export function LandingBackground() {
  return (
    <div className="landing-background" aria-hidden="true">
      <div className="landing-background__veil" />

      {orbs.map((orb, index) => (
        <span
          key={`${orb.left}-${orb.top}`}
          className="landing-background__orb"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
            opacity: 0.2 - index * 0.04
          } as CSSProperties}
        />
      ))}

      {lines.map((line) => (
        <span
          key={`${line.left}-${line.top}-${line.angle}`}
          className="landing-background__line"
          style={{
            left: line.left,
            top: line.top,
            width: line.width,
            transform: `rotate(${line.angle}deg)`,
            animationDelay: line.delay
          }}
        />
      ))}

      {dots.map((dot) => (
        <span
          key={`${dot.left}-${dot.top}`}
          className="landing-background__dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: dot.delay,
            animationDuration: dot.duration
          }}
        />
      ))}

      {symbols.map((symbol) => (
        <span
          key={symbol.label}
          className="landing-background__symbol"
          style={{
            left: symbol.left,
            top: symbol.top,
            animationDelay: symbol.delay,
            animationDuration: symbol.duration
          }}
        >
          {symbol.label}
        </span>
      ))}
    </div>
  );
}