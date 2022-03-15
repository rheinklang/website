import {
	LinkIcon,
	MailIcon,
	LocationMarkerIcon,
	ExclamationCircleIcon,
	ExclamationIcon,
} from '@heroicons/react/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Heading } from '../Heading';
import { Input } from '../Input';

export interface FestivalGuestSubmissionFormState {
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

export interface FestivalGuestSubmissionFormProps {
	options?: Array<{ id: string; label: string }> | null;
}

export const FestivalGuestSubmissionForm: FC<FestivalGuestSubmissionFormProps> = ({ options = [] }) => {
	const translate = useTranslation();
	const { control, register, getValues } = useForm<FestivalGuestSubmissionFormState>({
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

	if (!options || options.length === 0) {
		return (
			<div className="my-8 p-16 bg-gray-50 rounded-xl text-center">
				<div className="mb-2 flex justify-center">
					<ExclamationIcon className="text-gray-500 h-8" />
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
				render={({ field }) => <Dropdown options={options} placeholder="Welcher Event?" {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="email"
				render={({ field }) => <Input type="email" placeholder="E-Mail" icon={MailIcon} {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="location"
				render={({ field }) => <Input placeholder="Von wo bist du?" icon={LocationMarkerIcon} {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="genre"
				render={({ field }) => (
					<Dropdown
						placeholder="Genre"
						{...field}
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
				rules={{ required: true }}
				name="mixtapeLink"
				render={({ field }) => (
					<Input
						type="url"
						placeholder="SoundCloud oder MixCloud Link"
						{...field}
						icon={LinkIcon}
						value={`${field.value || ''}`}
						onChange={(value) => field.onChange(Number.parseInt(value))}
					/>
				)}
			/>
			<Controller
				control={control}
				name="gotcha"
				render={({ field }) => <Input type="hidden" placeholder="Message" {...field} />}
			/>
			<Checkbox
				register={register}
				id="contactAgreement"
				title={translate('forms.common.contactAgreementText')}
			/>
			<Checkbox
				register={register}
				id="pickAvailabilityGuarantee"
				title="Du bist am Datum des Rheinklang Festivals verfügbar *"
			/>
			<p className="text-sm text-gray-400 mb-2 lg:w-3/4">
				* Mit deiner Einsendung garantierst du uns dass du am Datum des diesjährigen Rheinklang Festivals frei
				bist und deinen Slot bei gewinn antreten kannst. Dies ist ein verbindlicher Vertrag.
			</p>
			<ButtonGroup>
				<Button
					onClick={() => {
						console.log('send it!', getValues());
					}}
				>
					{translate('common.action.submitForm')}
				</Button>
			</ButtonGroup>
		</div>
	);
};

FestivalGuestSubmissionForm.displayName = 'FestivalGuestSubmissionForm';
