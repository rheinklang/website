import axios from 'axios';

if (!process.env.NEXT_PUBLIC_DISCORD_CONTACT_WEBHOOK_URL || !process.env.NEXT_PUBLIC_DISCORD_REPORTING_WEBHOOK_URL) {
	throw new Error('Missing Discord webhook URLs for contact or reporting');
}

interface DiscordWebhookAuthor {
	name: string;
	url?: string;
	icon_url?: string;
}

interface DiscordWebhookField {
	name: string;
	value: string;
	inline?: true;
}

interface DiscordWebhookEmbed {
	title: string;
	color?: number;
	description?: string;
	author?: DiscordWebhookAuthor;
	url?: string;
	fields?: DiscordWebhookField[];
	image?: {
		url: string;
	};
	thumbnail?: {
		url: string;
	};
	footer?: {
		text: string;
		icon_url?: string;
	};
	timestamp?: string; // ISO format
}

interface DiscordWebhookPayload {
	username?: string;
	content?: string;
	avatar_url?: string;
	tts?: true;
	allowed_mentions?: {
		parse?: string[];
		users?: string[];
		roles?: string[];
	};
	embeds?: DiscordWebhookEmbed[];
}

const FIELD_BLACKLIST = ['gotcha'];

const getReadableFieldName = (fieldName: string): string => {
	switch (fieldName) {
		case 'email':
			return 'E-Mail';
		case 'name':
			return 'Name';
		case 'fullName':
			return 'Full Name';
		case 'message':
			return 'Message';
		case 'comment':
			return 'Comment';
		case 'attendees':
			return 'Companions';
		case 'contactAgreement':
			return 'Contact Agreement';
		default:
			return fieldName;
	}
};

const transformDataFieldsToDiscordFields = (
	fields: Record<string, number | string | boolean | string[]>
): DiscordWebhookField[] => {
	const processedFields: DiscordWebhookField[] = [];

	for (const field in fields) {
		if (FIELD_BLACKLIST.includes(field)) {
			continue;
		}

		let fieldValue = fields[field];

		if (typeof fieldValue === 'number') {
			fieldValue = String(fieldValue);
		}

		if (typeof fieldValue === 'boolean') {
			fieldValue = fieldValue ? 'Yes' : 'No';
		}

		if (Array.isArray(fieldValue)) {
			fieldValue = fieldValue.join(', ');
		}

		processedFields.push({
			name: getReadableFieldName(field),
			value: fieldValue,
		});
	}

	return processedFields;
};

const getStaticMetaEmbed = (): DiscordWebhookEmbed => ({
	title: 'Metadata',
	description: 'Additional auto-aggregated environment information',
	fields: [
		{
			name: 'Page URL',
			value: `${document.location.href}`,
		},
		{
			name: 'User Agent',
			value: `${navigator.userAgent}`,
		},
		{
			name: 'Build ID',
			value: '`' + process.env.CONFIG_BUILD_ID + '`',
		},
	],
});

export const sendDiscordContactSubmission = async (
	formIdentifier: string,
	fields: Record<string, number | string | boolean>,
	label?: string
) => {
	const now = new Date();
	const payload: DiscordWebhookPayload = {
		username: 'Website Service',
		content: `Neue Formular-Einreichung via "${label || formIdentifier}" :envelope:!`,
		allowed_mentions: {},
		embeds: [
			{
				title: 'Information',
				fields: transformDataFieldsToDiscordFields(fields),
				footer: {
					text: `Eingegangen am ${now.toLocaleDateString('de-DE')} um ${now.toLocaleTimeString('de-DE')}`,
				},
			},
			getStaticMetaEmbed(),
		],
	};

	await axios.post(`${process.env.NEXT_PUBLIC_DISCORD_CONTACT_WEBHOOK_URL}`, payload, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const sendDiscordReportSubmission = async (err?: any, scope = 'unknown') => {
	const report = err instanceof Error ? err.message : `${err}`;
	const now = new Date();
	const payload: DiscordWebhookPayload = {
		username: 'Website Reporting Service',
		content: `Received new error report :warning:`,
		embeds: [
			{
				title: 'Error',
				fields: [
					{
						name: 'Scope',
						value: '`' + scope + '`',
					},
					{
						name: 'Message',
						value: `${report}`,
					},
				],
				footer: {
					text: `Received on ${now.toLocaleDateString('de-DE')} at ${now.toLocaleTimeString('de-DE')}`,
				},
			},
			getStaticMetaEmbed(),
		],
	};

	await axios.post(`${process.env.NEXT_PUBLIC_DISCORD_REPORTING_WEBHOOK_URL}`, payload, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
