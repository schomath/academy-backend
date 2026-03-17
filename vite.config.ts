import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     port: 3000,
//     host: '0.0.0.0'
//   }
// });

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: 'https://matisha.github.io/academy-backend/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        tailwindcss(),
        viteStaticCopy({
        targets: [
          { src: 'images/*', dest: 'images' },
          { src: 'plotly/*', dest: 'plotly' },
          { src: '3dmodels/*', dest: '3dmodels' }
        ]
      })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
