import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
// const { BUNDLE_ALL } = require('@brainglitch/utilities-build-tools').flags;

BUNDLE_ALL = false;
export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'esm'
  },
  plugins: [
    resolve(), // so Rollup can node_modules pacakges
    commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    BUNDLE_ALL ? () => {} : autoExternal(), //
    typescript()
  ],
  external: id => /ramda|rxjs/.test(id)
};

//    "**/any-observable"
