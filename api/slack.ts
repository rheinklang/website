import type { Block, KnownBlock, MrkdwnElement } from '@slack/types';
import { IncomingWebhook } from '@slack/webhook';
import Cookies from 'js-cookie';
import { CookieConsents } from '../utils/cookies';

if (!process.env.NEXT_PUBLIC_SLACK_REPORTING_WEBHOOK_URL || !process.env.NEXT_PUBLIC_SLACK_CONTACT_WEBHOOK_URL) {
	throw new Error('Missing Slack webhook URLs for contact and reporting');
}

/**
 * IncomingWebhook to send reports to Slack
 */
const reportHook = new IncomingWebhook(process.env.NEXT_PUBLIC_SLACK_REPORTING_WEBHOOK_URL);

/**
 * IncomingWebhook to send contact submissions
 */
const contactHook = new IncomingWebhook(process.env.NEXT_PUBLIC_SLACK_CONTACT_WEBHOOK_URL);

const getMetaBlocks = (): (Block | KnownBlock)[] => {
	const now = new Date();

	return [
		{
			type: 'section',
			fields: [
				{
					type: 'mrkdwn',
					text: `*Timestamp*`,
				},
				{
					type: 'plain_text',
					text: `${now.toLocaleDateString('de-DE')}, ${now.toLocaleTimeString('de-DE')}`,
				},
				{
					type: 'mrkdwn',
					text: `*Location*`,
				},
				{
					type: 'plain_text',
					text: `${document.location.href}`,
				},
				{
					type: 'mrkdwn',
					text: '*User-Agent*',
				},
				{
					type: 'plain_text',
					text: `${navigator.userAgent},`,
				},
				{
					type: 'mrkdwn',
					text: '*Build ID*',
				},
				{
					type: 'plain_text',
					text: `${process.env.BUILD_ID},`,
				},
			],
		},
		{
			type: 'section',
			fields: [
				{
					type: 'mrkdwn',
					text: '*Cookies*',
				},
				...Object.values(CookieConsents).map(
					(consent): MrkdwnElement => ({
						type: 'mrkdwn',
						text: `*${consent}* ${Cookies.get(consent) ? '✅' : '❌'}`,
					})
				),
			],
		},
	];
};

export async function sendReport(err?: any, scope = 'unknown') {
	const report = err instanceof Error ? err.message : `${err}`;

	await reportHook.send({
		text: report,
		blocks: [
			{
				type: 'section',
				fields: [
					{
						type: 'plain_text',
						text: `${scope},`,
					},
				],
			},
			...getMetaBlocks(),
		],
	});
}

export async function sendContactSubmission(fields: any) {}
