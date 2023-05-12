import { LinkIcon, EnvelopeIcon, MapPinIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useFormSubmissionState } from '../../hooks/useFormSubmissionState';
import { useTranslation } from '../../hooks/useTranslation';
import { VALIDATE_EMAIL, VALIDATE_WEB_URL } from '../../utils/validation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Heading } from '../Heading';
import { Input } from '../Input';
import { SubmissionNotification } from './SubmissionNotification';

export interface GuestAppearanceFormState {
	email: string;
	name: string;
	event: string;
	location: string;
	mixtapeLink: string;
	genre: string;
	gotcha: string;
	contactAgreement: boolean;
	pickAvailabilityGuarantee: boolean;
}

export interface GuestAppearanceFormProps {
	options?: Array<{ id: string; label: string }> | null;
}

export const GuestAppearanceForm: FC<GuestAppearanceFormProps> = ({ options = [] }) => {
	const translate = useTranslation();
	const { submit, error, isSubmitted, isSubmitting } = useFormSubmissionState();
	const { control, handleSubmit } = useForm<GuestAppearanceFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			mixtapeLink: '',
			email: '',
			location: '',
			name: '',
			genre: '',
			gotcha: '',
			event: '',
			contactAgreement: true,
			pickAvailabilityGuarantee: true,
		},
	});

	const onSubmit = (data: GuestAppearanceFormState) => {
		submit('guestAppearanceInquiry', data, 'DJ Bewerbung');
	};

	const onError = (errors: any) => console.log('submit error', errors);

	if (!options || options.length === 0) {
		return (
			<div className="my-8 p-16 bg-gray-50 rounded-xl text-center">
				<div className="mb-2 flex justify-center">
					<ExclamationCircleIcon className="text-gray-500 h-8" />
				</div>
				<Heading level="3" className="text-gray-500">
					{translate('forms.guestAppearanceSubmission.notAvailableTitle')}
				</Heading>
				<p className="mt-2 text-gray-300 text-lg">
					{translate('forms.guestAppearanceSubmission.notAvailableText')}
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 py-4">
			<Controller
				control={control}
				rules={{ required: true }}
				name="event"
				render={({ field, fieldState }) => (
					<Dropdown options={options} placeholder="Welcher Event?" {...field} hookState={fieldState} />
				)}
			/>
			<Controller
				control={control}
				rules={{
					required: true,
					pattern: {
						message: 'Invalid format',
						value: VALIDATE_EMAIL,
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
				name="location"
				render={({ field, fieldState }) => (
					<Input placeholder="Von wo bist du?" icon={MapPinIcon} {...field} hookState={fieldState} />
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="genre"
				render={({ field, fieldState }) => (
					<Dropdown
						placeholder="Genre"
						{...field}
						hookState={fieldState}
						options={[
							{ id: 'techno', label: 'Techno' },
							{ id: 'dub-house', label: 'Dub House' },
							{ id: 'tech-house', label: 'Tech House' },
							{ id: 'deep-house', label: 'Deep House' },
							{ id: 'house', label: 'House' },
							{ id: 'melodic-house-techno', label: 'Melodic House & Techno' },
							{ id: 'indie-dance', label: 'Indie Dance' },
							{ id: 'others', label: 'Anderes Genre ...' },
						]}
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{
					required: true,
					pattern: {
						message: 'Invalid format',
						value: VALIDATE_WEB_URL,
					},
				}}
				name="mixtapeLink"
				render={({ field, fieldState }) => (
					<Input
						type="url"
						placeholder="SoundCloud oder MixCloud Link"
						{...field}
						icon={LinkIcon}
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
			<Controller
				control={control}
				rules={{ required: true }}
				name="pickAvailabilityGuarantee"
				render={({ field, fieldState }) => (
					<Checkbox
						{...field}
						isRequired
						hookState={fieldState}
						id="pickAvailabilityGuarantee"
						title="Du bist am Datum des Rheinklang Festivals verfügbar"
					/>
				)}
			/>
			<p className="text-sm text-gray-400 mb-2 lg:w-3/4">
				* Mit deiner Einsendung garantierst du uns dass du am Datum des gewählten Events frei bist und deinen
				Slot bei gewinn antreten kannst. Dies ist ein verbindlicher Vertrag.
			</p>
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
		</div>
	);
};

GuestAppearanceForm.displayName = 'GuestAppearanceForm';
