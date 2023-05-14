import { EnvelopeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useFormSubmissionState } from '../../hooks/useFormSubmissionState';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Form } from '../Form';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { SubmissionNotification } from './SubmissionNotification';

export interface PressInquiryFormState {
	email: string;
	name: string;
	publisher: string;
	requestType: string;
	message: string;
	gotcha: string;
	contactAgreement: boolean;
}

export const PressInquiryForm: FC = () => {
	const translate = useTranslation();
	const { submit, error, isSubmitted, isSubmitting } = useFormSubmissionState();
	const { control, handleSubmit } = useForm<PressInquiryFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			contactAgreement: true,
			requestType: '',
			publisher: '',
			email: '',
			name: '',
			message: '',
			gotcha: '',
		},
	});

	const onSubmit = (data: PressInquiryFormState) => {
		submit('pressInquiry', data, 'Presse-Anfrage');
	};

	const onError = (errors: any) => console.log('submit error', errors);

	return (
		<Form trackingId="press-inquiry" label="Presse-Anfrage">
			<Controller
				control={control}
				rules={{ required: true }}
				name="name"
				render={({ field, fieldState }) => <Input placeholder="Ihr Name" {...field} hookState={fieldState} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="email"
				render={({ field, fieldState }) => (
					<Input type="email" placeholder="E-Mail" icon={EnvelopeIcon} {...field} hookState={fieldState} />
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="publisher"
				render={({ field, fieldState }) => (
					<Input placeholder="Verlag" icon={BuildingStorefrontIcon} {...field} hookState={fieldState} />
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="requestType"
				render={({ field, fieldState }) => (
					<Dropdown
						{...field}
						hookState={fieldState}
						placeholder="Art der Anfrage"
						options={[
							{ id: 'portrait', label: 'Portrait' },
							{ id: 'press-release', label: 'Pressemeldung' },
							{ id: 'other', label: 'Sonstiges' },
						]}
					/>
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
					title="Danke für deine Bewerbung"
					text="Wir werden uns nach Ablauf der jeweiligen Frist bei dir melden"
				/>
			)}
		</Form>
	);
};

PressInquiryForm.displayName = 'PressInquiryForm';
