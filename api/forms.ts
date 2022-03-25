import axios from 'axios';
import { client, EventsForGuestSubmissionDocument, EventsForGuestSubmissionQuery } from '../graphql';
import { nonNullish } from '../utils/filter';
import { sendContactSubmission, sendReport } from './slack';

export type FormId =
	| 'logs'
	| 'pressInquiry'
	| 'supportInquiry'
	| 'partnerInquiry'
	| 'eventBookingInquiry'
	| 'artistBookingInquiry'
	| 'guestAppearanceInquiry';

export const submitForm = async (formId: FormId, data: Record<string, any>) => {
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

		// send notification to slack
		try {
			await sendContactSubmission(formId, data);
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.error(error);
			} else {
				sendReport(error, `submitForm->${formId}->slack(localhost)`);
			}
		}
	} catch (error) {
		// send error report to slack
		await sendReport(error, `submitForm->${formId}`);
	}
};

export const getAvailableEventsForSubmission = async () => {
	const response = await client.query<EventsForGuestSubmissionQuery>({
		query: EventsForGuestSubmissionDocument,
	});

	return response.data.guestAppearanceEventsCollection.filter(nonNullish);
};
