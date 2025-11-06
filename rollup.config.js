// Minimal rollup config for Vercel compatibility
// This project primarily uses Vite, but this config ensures rollup is available
export default {
  input: 'client/src/main.tsx',
  output: {
    file: 'dist/public/main.js',
    format: 'es',
    sourcemap: true
  },
  external: ['react', 'react-dom'],
  plugins: []
};
