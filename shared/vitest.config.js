const { resolve } = require('node:path');

const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src/platform'),
      src: resolve(__dirname, './src'),
    },
  },
  test: {
    cache: false,
    environment: 'node',
    exclude: ['node_modules'],
    globals: true,
    include: ['**/*.spec.ts'],
    root: './src',
  },
});
