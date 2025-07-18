import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3012,
    proxy: {
      '/api': {
        target: 'https://api.apptica.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Origin': 'https://api.apptica.com',
          'Referer': 'https://api.apptica.com/'
        },
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const url = proxyReq.path;
            const separator = url.includes('?') ? '&' : '?';
            const newPath = `${url}${separator}B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`;
            proxyReq.path = newPath;
            console.log("Proxying to:", newPath);
          });
        }
      }
    }
  }
})