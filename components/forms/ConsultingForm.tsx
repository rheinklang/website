import { LocationMarkerIcon, MailIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useFormSubmissionState } from '../../hooks/useFormSubmissionState';
import { useTranslation } from '../../hooks/useTranslation';
import { VALIDATE_EMAIL } from '../../utils/validation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { SubmissionNotification } from './SubmissionNotification';

export interface ConsultingFormState {
	email: string;
	name: string;
	message: string;
	requestType: string;
	customRequestType: string;
	contactAgreement: boolean;
}

export const ConsultingForm: FC = () => {
	const translate = useTranslation();
	const { submit, error, isSubmitted, isSubmitting } = useFormSubmissionState();
	const { control, handleSubmit, watch } = useForm<ConsultingFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			contactAgreement: true,
			email: '',
			message: '',
			name: '',
			requestType: '',
			customRequestType: '',
		},
	});
	const watchRequestType = watch('requestType', '');

	const onSubmit = (data: ConsultingFormState) => {
		submit('consultingInquiry', data);
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
						message: 'Ungültiges Format der E-Mail Adresse',
					},
				}}
				name="email"
				render={({ field, fieldState }) => (
					<Input type="email" icon={MailIcon} placeholder="E-Mail" {...field} hookState={fieldState} />
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="requestType"
				render={({ field, fieldState }) => (
					<Dropdown
						{...field}
						placeholder="Art der Anfrage"
						hookState={fieldState}
						options={[
							{
								id: 'event-support',
								label: 'Unterstützung für einen Event',
							},
							{
								id: 'event-planning',
								label: 'Planung eines Events',
							},
							{
								id: 'strategy-support',
								label: 'Strategie- und Marketingunterstützung',
							},
							{
								id: 'other',
								label: 'Sonstiges',
							},
						]}
					/>
				)}
			/>
			{watchRequestType === 'other' && (
				<Controller
					control={control}
					name="customRequestType"
					render={({ field, fieldState }) => (
						<Input placeholder="Um was handelt es sich genau?" {...field} hookState={fieldState} />
					)}
				/>
			)}
			<Controller
				control={control}
				rules={{ required: true }}
				name="message"
				render={({ field, fieldState }) => (
					<Textarea rows={8} placeholder="Ihre Nachricht" {...field} hookState={fieldState} />
				)}
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
					text="Wir melden uns in kürze bei dir"
				/>
			)}
		</div>
	);
};

ConsultingForm.displayName = 'ConsultingForm';
