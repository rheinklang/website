import axios from 'axios';
import { client, EventsForGuestSubmissionDocument, EventsForGuestSubmissionQuery } from '../graphql';
import { nonNullish } from '../utils/filter';
import { tagManagerPush } from '../utils/matomo';
import { sendDiscordContactSubmission, sendDiscordReportSubmission } from './discord';

export type FormId =
	| 'logs'
	| 'pressInquiry'
	| 'supportInquiry'
	| 'partnerInquiry'
	| 'eventBookingInquiry'
	| 'artistBookingInquiry'
	| 'consultingInquiry'
	| `registrationForm${string}`
	| 'guestAppearanceInquiry';

export const submitForm = async (formId: FormId, data: Record<string, any>, label?: string) => {
	try {
		// post to the CMS
		await axios.post(
			`${process.env.NEXT_PUBLIC_CMS_REST_API_URL}/forms/submit/${formId}?token=${process.env.NEXT_PUBLIC_CMS_API_TOKEN}`,
			{
				form: data,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		tagManagerPush({
			event: 'formSubmission',
			formId,
			formData: data,
		});

		// send notification to discord
		try {
			if (formId === 'logs') {
				// we don't want log notifications
				return;
			}

			await sendDiscordContactSubmission(formId, data, label);
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.error(error);
			} else {
				await sendDiscordReportSubmission(error, `${formId}`);
			}
		}
	} catch (error) {
		// send error report to discord as we can't send the log entry to the CMS
		await sendDiscordReportSubmission(error, `${formId} submission`);
	}
};

export const getAvailableEventsForSubmission = async () => {
	const response = await client.query<EventsForGuestSubmissionQuery>({
		query: EventsForGuestSubmissionDocument,
	});

	return response.data.guestAppearanceEventsCollection.filter(nonNullish);
};
