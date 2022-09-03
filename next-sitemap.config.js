/** @type {import('next-sitemap').IConfig} */

module.exports = {
	sourceDir: 'build',
	siteUrl: process.env.SITE_URL || 'https://www.rheinklang.events',
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	changefreq: 'weekly',
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
