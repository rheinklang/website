import { LinkIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';

export interface FestivalGuestSubmissionFormState {
	email: string;
	name: string;
	location: string;
	mixtapeLink: string;
	genre: string;
	contactAgreement: boolean;
	pickAvailabilityGuarantee: boolean;
}

export const FestivalGuestSubmissionForm: FC = () => {
	const { control, register, getValues } = useForm<FestivalGuestSubmissionFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			mixtapeLink: '',
			email: '',
			location: '',
			name: '',
			genre: '',
			contactAgreement: true,
			pickAvailabilityGuarantee: true,
		},
	});

	return (
		<div className="grid grid-cols-1 gap-6 py-4">
			<Controller
				control={control}
				rules={{ required: true }}
				name="name"
				render={({ field }) => <Input placeholder="Dein Name" {...field} />}
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
			<Checkbox
				register={register}
				id="contactAgreement"
				title="Bist du damit einverstanden von uns zu kontaktiert werden?"
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
					Bewerbung einsenden
				</Button>
			</ButtonGroup>
		</div>
	);
};

FestivalGuestSubmissionForm.displayName = 'FestivalGuestSubmissionForm';
