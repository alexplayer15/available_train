import { build } from 'esbuild';
import { rmSync, readFileSync, createWriteStream } from 'fs';
import JSZip from 'jszip';

const outputDir = 'dist';
rmSync(outputDir, { recursive: true, force: true });

await build({
  entryPoints: [
    'src/handler/index.ts'
  ],
  bundle: true, 
  minify: true,
  outdir: outputDir,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  sourcemap: 'linked',
  outbase: 'src/handler',
  outExtension: { '.js': '.mjs' },
  banner: {
    js: 'import { createRequire } from \'module\'; ' +
        'const require = createRequire(import.meta.url); ' +
        'import path from \'path\'; ' +
        'import { fileURLToPath } from \'url\'; ' +
        'const __filename = fileURLToPath(import.meta.url); ' +
        'const __dirname = path.dirname(__filename);'
  },
});

const outputFiles = [
  `${outputDir}/index.mjs`
];

for (const outputFile of outputFiles) {
  const compressing = new JSZip();
  const lambdaData = readFileSync(outputFile);
  compressing.file('index.mjs', lambdaData);

  let compressingName;
  if (process.env.CI === 'true' ?? false) {
    compressingName = outputFile.replace('/index.mjs', '.zip');
  } else {
    compressingName = outputFile.replace('.mjs', '.zip');
  }

  compressing
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(createWriteStream(compressingName))
    .on('finish', function () {
      console.log(`${compressingName} written`);
    });
}
