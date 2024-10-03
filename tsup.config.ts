import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],       // Entry file
  format: ['cjs', 'esm'],        // Output formats: CommonJS and ESM
  dts: true,                     // Generate type declarations
  sourcemap: true,               // Generate source maps for debugging
  clean: true,                   // Clean the output directory before each build
  splitting: false,              // Disable code splitting (for libraries, enable if needed)
  minify: false,                 // Minify the output (set to true if needed)
  target: 'es2016',              // Target JavaScript version
  outDir: 'dist/src/'
});
