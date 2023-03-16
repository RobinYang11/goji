
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
// import sucrase from '@rollup/plugin-sucrase';

// To handle css files
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json'
import del from 'rollup-plugin-delete'

// import image from '@rollup/plugin-image';

console.log(packageJson.main)

export default [
	{
		input: "src/index.ts",
		output: [
			{
				// file: packageJson.main, #[!] RollupError: You must specify "output.file" or "output.dir" for the build.
				file: "dist/cjs/index.js",
				format: "cjs",
				sourcemap: true,
			},
			{
				// file: packageJson.module,
				file: "dist/esm/index.js",
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve({
				extensions: ['js', 'ts'],
			}),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			babel({
				babelHelpers: "bundled",
				exclude: "node_modules/**",
			}),
			postcss({
				minimize: true,
				modules: true,
				use: {
					sass: null,
					stylus: null,
					less: { javascriptEnabled: true }
				},
				// extract: true
			}),
			terser(),
			del({ targets: 'dist/*' })
			// image()
		],
		external: ['react', 'framer-motion'],
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts.default()],
		external: [/\.less$/], // telling rollup anything that is .css aren't part of type exports 
	},
]