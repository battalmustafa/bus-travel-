import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://v2-api.obilet.com',
        changeOrigin: true,
        secure: true,
       
      },
    },
    port: 3000, 
    open: true, 
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    },
  },

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

 
  define: {
    'process.env': {},
  },
});
