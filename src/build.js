const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/server.ts'], // Arquivo de entrada
  bundle: true,
  outfile: 'build/server.js',
  platform: 'node',
  format: 'esm',
  target: 'es2022',
}).catch(() => process.exit(1));