import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';

export interface EventBookingFormState {
	email: string;
	name: string;
	location: string;
	guestCount: number;
	averageEntryFee: number;
	contactAgreement: boolean;
}

export const EventBookingForm: FC = () => {
	const { control, register, getValues } = useForm<EventBookingFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			contactAgreement: true,
			email: '',
			location: '',
			name: '',
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
				render={({ field }) => <Input type="email" placeholder="E-Mail" {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="location"
				render={({ field }) => <Input placeholder="Ort der Veranstaltung" {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="guestCount"
				render={({ field }) => (
					<Input
						type="number"
						placeholder="Anzahl der Gäste"
						{...field}
						value={`${field.value || ''}`}
						onChange={(value) => field.onChange(Number.parseInt(value))}
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="averageEntryFee"
				render={({ field }) => (
					<Input
						type="number"
						placeholder="Durchschnittlicher Eintrittspreis in CHF"
						{...field}
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
			<ButtonGroup>
				<Button
					onClick={() => {
						console.log('send it!', getValues());
					}}
				>
					Anfrage senden
				</Button>
			</ButtonGroup>
		</div>
	);
};

EventBookingForm.displayName = 'EventBookingForm';
