import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
	input: 'assets/js/main.js',
	output: {
		file: 'public/js/bundle.js',
		format: 'iife',
		sourcemap: true
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-env']
		})
	]
};