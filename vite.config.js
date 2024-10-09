import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        brandingProjects: resolve(__dirname, 'src/pages/branding-projects/branding-projects.html'),
        contact: resolve(__dirname, 'src/pages/contact/contact.html'),
        digitalProjects: resolve(__dirname, 'src/pages/digital-projects/digital-projects.html'),
        digitalSignage: resolve(__dirname, 'src/pages/digital-signage/digital-signage.html'),
        dna: resolve(__dirname, 'src/pages/dna/dna.html'),
        project: resolve(__dirname, 'src/pages/project/project.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'public/assets'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@services': resolve(__dirname, 'src/api/services'),
    },
  },
  publicDir: resolve(__dirname, 'public'),
});
