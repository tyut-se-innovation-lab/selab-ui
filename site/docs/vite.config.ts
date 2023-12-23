import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path' // 导入 path

export default defineConfig({
    plugins: [VueJsx()],
    resolve: {
        alias: {
            '@packages': path.resolve(__dirname, '../packages')
        }
    },
    server: {
        port: 3100
    }
})