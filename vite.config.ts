import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/ws-stomp': {
        target: 'https://modong-backend.site/', // 백엔드 서버 URL
        ws: true, // WebSocket을 사용할 경우 true
        changeOrigin: true, // 원본 요청의 호스트 헤더를 타겟 URL로 변경
      },
    },
  },
  define: {
    global: {},
  },
});
