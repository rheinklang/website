import axios from 'axios';
import { client, EventsForGuestSubmissionDocument, EventsForGuestSubmissionQuery } from '../graphql';
import { nonNullish } from '../utils/filter';

export type FormId =
	| 'logs'
	| 'pressInquiry'
	| 'supportInquiry'
	| 'partnerInquiry'
	| 'eventBookingInquiry'
	| 'artistBookingInquiry'
	| 'festivalGuestAppearanceInquiry';

export const submitForm = async (formId: FormId, data: Record<string, any>) => {
	const payload = {
		form: data,
	};

	const response = await axios.post(
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

	// TODO: Send slack notification
};

export const getAvailableEventsForSubmission = async () => {
	const response = await client.query<EventsForGuestSubmissionQuery>({
		query: EventsForGuestSubmissionDocument,
	});

	return response.data.guestAppearanceEventsCollection.filter(nonNullish);
};
