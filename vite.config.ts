import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
  }
});
