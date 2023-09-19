import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import image from '@rollup/plugin-image'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './src/index.js',
    external: ['react', 'react-dom'],
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named'
      }
    ],
    plugins: [
      commonjs({
        include: 'node_modules/**',
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-react', { "runtime": "automatic" }]
        ]
      }),
      external({}),
      resolve(),
      json(),
      nodePolyfills(),
      image(),
      terser()
    ]
  }
];
