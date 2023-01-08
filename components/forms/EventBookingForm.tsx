import { CashIcon, LocationMarkerIcon, MailIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EventType } from '../../graphql';
import { useFormSubmissionState } from '../../hooks/useFormSubmissionState';
import { useTranslation } from '../../hooks/useTranslation';
import { keys } from '../../utils/structs';
import { VALIDATE_EMAIL } from '../../utils/validation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { SubmissionNotification } from './SubmissionNotification';

export interface EventBookingFormState {
	email: string;
	name: string;
	location: string;
	eventType: string;
	guestCount: number;
	averageEntryFee: number;
	contactAgreement: boolean;
}

export const EventBookingForm: FC = () => {
	const translate = useTranslation();
	const { submit, error, isSubmitted, isSubmitting } = useFormSubmissionState();
	const { control, handleSubmit } = useForm<EventBookingFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			contactAgreement: true,
			email: '',
			location: '',
			name: '',
			eventType: '',
		},
	});

	const onSubmit = (data: EventBookingFormState) => {
		submit('eventBookingInquiry', data);
	};

	const onError = (errors: any) => console.log('submit error', errors);

	return (
		<div className="grid grid-cols-1 gap-6 py-4">
			<Controller
				control={control}
				rules={{ required: true }}
				name="name"
				render={({ field, fieldState }) => <Input placeholder="Dein Name" {...field} hookState={fieldState} />}
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
				name="eventType"
				render={({ field, fieldState }) => (
					<Dropdown
						{...field}
						placeholder="Art des Events"
						hookState={fieldState}
						options={keys(EventType)
							.map((item) => EventType[item])
							.map((key) => ({
								id: key,
								label: translate(`event.type.${key}`),
							}))}
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="location"
				render={({ field, fieldState }) => (
					<Input
						icon={LocationMarkerIcon}
						placeholder="Ort der Veranstaltung"
						{...field}
						hookState={fieldState}
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="guestCount"
				render={({ field, fieldState }) => (
					<Input
						{...field}
						type="number"
						placeholder="Anzahl der Gäste"
						className="appearance-none"
						icon={UserGroupIcon}
						value={`${field.value || ''}`}
						onChange={(value) => field.onChange(Number.parseInt(value))}
						hookState={fieldState}
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="averageEntryFee"
				render={({ field, fieldState }) => (
					<Input
						type="number"
						placeholder="Durchschnittlicher Eintrittspreis in CHF"
						icon={CashIcon}
						{...field}
						value={`${field.value || ''}`}
						hookState={fieldState}
						onChange={(value) => field.onChange(Number.parseInt(value))}
					/>
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

EventBookingForm.displayName = 'EventBookingForm';
