import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        strictPort: true,
        port: 8080,
    },
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
        sourcemap: true
    }
});
