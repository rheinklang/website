import type { Block, KnownBlock, MrkdwnElement, PlainTextElement } from '@slack/types';
// import { IncomingWebhook } from '@slack/webhook';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { CookieConsents } from '../utils/cookies';
import { getReadableTimestamp } from '../utils/date';

if (!process.env.NEXT_PUBLIC_SLACK_REPORTING_WEBHOOK_URL || !process.env.NEXT_PUBLIC_SLACK_CONTACT_WEBHOOK_URL) {
	throw new Error('Missing Slack webhook URLs for contact and reporting');
}

const SLACK_REPORTING_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_REPORTING_WEBHOOK_URL;

const SLACK_CONTACT_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_CONTACT_WEBHOOK_URL;

/**
 * @see https://github.com/slackapi/node-slack-sdk/issues/982
 */
const slackClientConfig: AxiosRequestConfig = {
	withCredentials: false,
	transformRequest: [
		(data, headers) => {
			if (headers) {
				delete headers['Content-Type'];
			}

			return data;
		},
	],
};

/**
 * IncomingWebhook to send reports to Slack
 */
// const reportHook = new IncomingWebhook(process.env.NEXT_PUBLIC_SLACK_REPORTING_WEBHOOK_URL);

/**
 * IncomingWebhook to send contact submissions
 */
// const contactHook = new IncomingWebhook(process.env.NEXT_PUBLIC_SLACK_CONTACT_WEBHOOK_URL);

const transformFieldValueType = <T>(value: T): string => {
	if (typeof value === 'string') {
		return value;
	}

	if (typeof value === 'boolean') {
		return value ? 'Yes' : 'No';
	}

	if (Array.isArray(value)) {
		return value.join(', ');
	}

	return JSON.stringify(value);
};

const getMessageBlock = (message: string): KnownBlock => ({
	type: 'section',
	text: {
		type: 'mrkdwn',
		text: message,
	},
});

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
					type: 'mrkdwn',
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
					type: 'mrkdwn',
					text: `\`${process.env.CONFIG_BUILD_ID}\``,
				},
			],
		},
		// Too many fields for Slack (10)
		// {
		// 	type: 'section',
		// 	fields: [
		// 		{
		// 			type: 'mrkdwn',
		// 			text: '*Cookies*',
		// 		},
		// 		...Object.values(CookieConsents).map(
		// 			(consent): MrkdwnElement => ({
		// 				type: 'mrkdwn',
		// 				text: `*${consent}* ${Cookies.get(consent) ? '✅' : '❌'}`,
		// 			})
		// 		),
		// 	],
		// },
	];
};

export async function sendReport(err?: any, scope = 'unknown') {
	const report = err instanceof Error ? err.message : `${err}`;

	await axios.post(
		SLACK_REPORTING_WEBHOOK_URL,
		JSON.stringify({
			blocks: [
				getMessageBlock(`:warning: *Received new error report*\n${report}`),
				{
					type: 'section',
					fields: [
						{
							type: 'plain_text',
							text: `${scope}`,
						},
					],
				},
				...getMetaBlocks(),
			],
		}),
		slackClientConfig
	);
}

export async function sendContactSubmission(formIdentifier: string, fields: Record<string, number | string | boolean>) {
	const readableFields = Object.entries(fields).map(([key, value]): [string, string] => [
		key,
		transformFieldValueType(value),
	]);

	const fieldSubmissions = readableFields
		.filter(([key]) => key !== 'gotcha')
		.reduce(
			(prev, [key, value]) => [
				...prev,
				{
					type: 'mrkdwn' as const,
					text: `*${key}*`,
				},
				{
					type: 'plain_text' as const,
					text: `${value || '–'}`,
				},
			],
			[] as Array<MrkdwnElement | PlainTextElement>
		);

	await axios.post(
		SLACK_CONTACT_WEBHOOK_URL,
		JSON.stringify({
			blocks: [
				getMessageBlock(`:mailbox: New form submission from ${formIdentifier}`),
				{
					type: 'section',
					fields: fieldSubmissions,
				},
				...getMetaBlocks(),
			],
		}),
		slackClientConfig
	);
}
