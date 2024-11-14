// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // Устанавливаем корень на уровень выше, чтобы Vite искал зависимости в общем node_modules
  build: {
    outDir: '../dist/client',     // Указываем, чтобы Vite создал dist/client относительно корня проекта
    ssrManifest: true,           // Для использования в SSR
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',  // Точный путь к `index.html` внутри папки client
    }
  },
  resolve: {
    alias: {
      '@': '/client/src',  // Создаем алиас для удобства работы с src в клиенте
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'socket.io-client'],
  },
});