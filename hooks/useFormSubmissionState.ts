import { useState } from 'react';
import { FormId, submitForm } from '../api/forms';
import { tagManagerPush } from '../utils/matomo';

export const useFormSubmissionState = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const reset = () => {
		setIsSubmitting(false);
		setIsSubmitted(false);
		setError(null);
	};

	const submit = async (formId: FormId, data: Record<string, any>, label?: string) => {
		setIsSubmitting(true);
		try {
			await submitForm(formId, data, label);
			tagManagerPush({
				event: 'mtm.SubmitForm',
			});
			setIsSubmitted(true);
		} catch (error) {
			setError(error as Error);
			setIsSubmitted(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		isSubmitting,
		isSubmitted,
		error,
		reset,
		submit,
	};
};
