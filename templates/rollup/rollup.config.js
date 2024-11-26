import {resolve} from 'path';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

export default [{
	input: 'assets/js/enhanced.js',
	output: {
		file: 'public/js/enhanced.js',
		format: 'iife'
	},
	plugins: [nodeResolve(), babel({
		babelHelpers: 'bundled',
		configFile: resolve(__dirname, 'babel.config.json')
	}), copy({
		targets: [
			{ src: ['assets/fonts/*.woff', 'assets/fonts/*.woff2'], dest: 'public/fonts' },
			{ src: 'assets/img', dest: 'public' }
		]
	})]
},{
	input: 'assets/js/nature-enhanced.js',
	output: {
		file: 'public/js/nature-enhanced.js',
		format: 'iife'
	},
	plugins: [nodeResolve(), babel({
		babelHelpers: 'bundled',
		configFile: resolve(__dirname, 'babel.config.json')
	})]
},{
	input: 'assets/js/npm-enhanced.js',
	output: {
		file: 'public/js/npm-enhanced.js',
		format: 'iife'
	},
	plugins: [nodeResolve(), babel({
		babelHelpers: 'bundled',
		configFile: resolve(__dirname, 'babel.config.json')
	})]
},{
	input: 'assets/js/npm-nature-enhanced.js',
	output: {
		file: 'public/js/npm-nature-enhanced.js',
		format: 'iife'
	},
	plugins: [nodeResolve(), babel({
		babelHelpers: 'bundled',
		configFile: resolve(__dirname, 'babel.config.json')
	})]
}];