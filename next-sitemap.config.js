/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://rheinklang.events',
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	changefreq: 'weekly',
	exclude: [
		'/private/*',
		'/private/registration-form/*',
		'/services/livestream',
		'/services/settings',
		'/403',
		'/404',
		'/500',
		// TODO: Remove once implemented
		'/about-us/portrait/*',
	],
};
