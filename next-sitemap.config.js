/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://rheinklang.events',
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	changefreq: 'weekly',
	exclude: [
		// meta pages which don't have sufficient content
		'/services/livestream',
		'/services/settings',
		// error pages
		'/403',
		'/404',
		'/500',
		// private content
		'/private/*',
		'/private/registration-form/*',
		// transition to new festival page
		'/events/category/festival',
	],
};
