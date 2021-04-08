import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'router': path.resolve(__dirname,'src/router'),
      'views': path.resolve(__dirname,'src/views'),
      'assets': path.resolve(__dirname,'assets'),
      'components': path.resolve(__dirname,'src/components')
    }
  }
})
