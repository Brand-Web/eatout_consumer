import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@views': '/src/views',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@types': '/src/types',
      '@apis': '/src/apis',
      '@store': '/src/store',
      '@locales': '/src/locales',
      '@constants': '/src/constants',
      '@data': '/src/data',
      "@icons": "/src/components/icons"


    }
  }
})

