import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      babelrc: true,
    }
  })],
  server: {
    host: "0.0.0.0"
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  }
})
