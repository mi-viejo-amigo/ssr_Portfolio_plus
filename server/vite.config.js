// server/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
    ssr: '../client/src/entry-server.tsx',   // Убедитесь, что этот путь правильный
    outDir: '../dist/server',                // Папка для сборки серверной части
      rollupOptions: {
        external: ['react', 'react-dom', 'framer-motion'], // React зависимости как внешние
        output: {
          format: 'esm', // Формат 'esm' для модульной поддержки
        },
      },
    },
    ssr: {
      noExternal: ['socket.io'], // Включаем socket.io как внутренний для SSR
    },
  });
