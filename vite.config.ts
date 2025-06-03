import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [react(), viteSingleFile()],
//   build: {
//     target: 'esnext',
//     assetsInlineLimit: Infinity,
//     cssCodeSplit: false,
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//       },
//     },
//   },
// });