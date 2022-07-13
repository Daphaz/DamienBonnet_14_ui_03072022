import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

const customResolver = resolve({
  extensions: ['.scss'],
});

const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: 'lib/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // Preferably set as first plugin.
      peerDepsExternal(),
      alias({
        entries: [
          {
            find: 'lib',
            replacement: path.resolve(projectRootDir, 'lib'),
            customResolver,
          },
        ],
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: [
          '**/__tests__',
          '**/*.test.ts',
          '**/*.test.tsx',
          'lib/setupTests.ts',
        ],
      }),
      postcss({
        modules: true,
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
