import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  root: './src',

  build: {
    outDir: '../dist',
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/posters',
          dest: 'assets'
        }
      ],
    }),
  ],
};
