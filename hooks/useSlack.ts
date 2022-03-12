import { sendContactSubmission, sendReport } from '../api/slack';

export const useSlack = () => {
	return {
		sendReport,
		sendContactSubmission,
	};
};
