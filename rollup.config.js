import resolveCjsModules from '@rollup/plugin-commonjs';
import resolveNodeModule from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const isProduction = process.env.NODE_ENV === 'production';

/** @type {Array<import('rollup').RollupOptions>} */
const config = [
	{
		input: 'workbox/sw.js',
		external: [],
		output: {
			file: 'public/sw.js',
			format: 'cjs',
			minifyInternalExports: true,
			compact: true,
		},
		plugins: [
			resolveCjsModules({
				extensions: ['.js', '.ts'],
				include: ['./workbox/sw.js', 'node_modules/**'],
				ignoreGlobal: true,
				sourceMap: true,
			}),
			resolveNodeModule(),
			typescript({
				tsconfig: './tsconfig.sw.json',
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
				'process.env.WORKBOX_APP_ID': JSON.stringify(
					isProduction ? process.env.WORKBOX_APP_ID : 'rheinklang-dev'
				),
				'process.env.WORKBOX_APP_VERSION': JSON.stringify(
					isProduction ? process.env.WORKBOX_APP_VERSION : Date.now().toString()
				),
				preventAssignment: true,
			}),
		],
	},
];

export default config;
