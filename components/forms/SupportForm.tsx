import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useFormSubmissionState } from '../../hooks/useFormSubmissionState';
import { useTranslation } from '../../hooks/useTranslation';
import { VALIDATE_EMAIL } from '../../utils/validation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { SubmissionNotification } from './SubmissionNotification';

export interface SupportFormState {
	email: string;
	name: string;
	message: string;
	contactAgreement: boolean;
	gotcha: string;
}

export const SupportForm: FC = () => {
	const translate = useTranslation();
	const { submit, error, isSubmitted, isSubmitting } = useFormSubmissionState();
	const { control, handleSubmit } = useForm<SupportFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			name: '',
			message: '',
			gotcha: '',
			contactAgreement: true,
		},
	});

	const onSubmit = (data: SupportFormState) => {
		submit('supportInquiry', data, 'Support Anfrage');
	};

	const onError = (errors: any) => console.log('submit error', errors);

	return (
		<div className="grid grid-cols-1 gap-6 py-4">
			<Controller
				control={control}
				rules={{ required: true }}
				name="name"
				render={({ field, fieldState }) => <Input placeholder="Ihr Name" {...field} hookState={fieldState} />}
			/>
			<Controller
				control={control}
				rules={{
					required: true,
					pattern: {
						value: VALIDATE_EMAIL,
						message: 'Invalid format',
					},
				}}
				name="email"
				render={({ field, fieldState }) => (
					<Input type="email" placeholder="E-Mail" icon={EnvelopeIcon} {...field} hookState={fieldState} />
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="message"
				render={({ field, fieldState }) => (
					<Textarea
						rows={14}
						placeholder="Ihre Nachricht"
						{...field}
						value={`${field.value || ''}`}
						hookState={fieldState}
					/>
				)}
			/>
			<Controller
				control={control}
				name="gotcha"
				render={({ field }) => <Input type="hidden" placeholder="Message" {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="contactAgreement"
				render={({ field, fieldState }) => (
					<Checkbox
						{...field}
						isRequired
						hookState={fieldState}
						id="contactAgreement"
						title={translate('forms.common.contactAgreementText')}
					/>
				)}
			/>
			<ButtonGroup>
				<Button isDisabled={!!error} isLoading={isSubmitting} onClick={handleSubmit(onSubmit, onError)}>
					{isSubmitted ? translate('common.action.formSubmitted') : translate('common.action.submitForm')}
				</Button>
			</ButtonGroup>
			{error && <SubmissionNotification title="Ein unerwarteter Fehler ist aufgetreten" text={error.message} />}
			{!error && isSubmitted && (
				<SubmissionNotification
					type="success"
					title="Danke für deine Anfrage"
					text="Wir werden uns in kürze bei dir melden"
				/>
			)}
		</div>
	);
};

SupportForm.displayName = 'SupportForm';
