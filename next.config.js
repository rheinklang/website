const { v5, validate } = require('uuid');

const BUILD_ID_NAMESPACE = process.env.BUILD_ID_NAMESPACE;

if (!BUILD_ID_NAMESPACE) {
	throw new Error('BUILD_ID_NAMESPACE environment variable is not defined');
}

if (!validate(BUILD_ID_NAMESPACE)) {
	throw new Error('BUILD_ID_NAMESPACE is not a valid UUID');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export',
	// server related settings
	poweredByHeader: false,
	trailingSlash: false,
	// module settings
	images: {
		loader: 'custom',
	},
	// build settings
	compress: true,
	distDir: 'build',
	experimental: {
		largePageDataBytes: 256 * 100000, // 256kb
	},
	generateBuildId: async () => {
		return v5(`${Date.now()}`, BUILD_ID_NAMESPACE);
	},
	// customizations on build level
	webpack: (config, { webpack, buildId }) => {
		// inject build-id to render inside the app
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId),
			})
		);

		// pass back modified config
		return config;
	},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
