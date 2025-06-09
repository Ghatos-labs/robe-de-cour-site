import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/robe-de-cour-site/',
  build: {
    outDir: './build'
  }
})

// export default defineConfig(({ command }) => {
//     const config = {
//         plugins: [react()],
//         base: '/',
//         build: {
//           outDir: './build'
//         }
//     };

//     if (command !== 'serve') {
//         config.base = '/robe-de-cour-site/';
//     }

//     return config;
// });