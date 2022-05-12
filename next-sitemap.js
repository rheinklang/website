/** @type {import('next-sitemap').IConfig} */

module.exports = {
	sourceDir: 'build',
	siteUrl: process.env.SITE_URL || 'https://rheinklang.events',
	generateRobotsTxt: true,
	exclude: [
		'/services/livestream',
		'/services/settings',
		'/403',
		'/404',
		'/500',
		// TODO: Remove once implemented
		'/about-us/portrait/*',
	],
};
