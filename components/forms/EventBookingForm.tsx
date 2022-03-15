import { CashIcon, LocationMarkerIcon, MailIcon, UserGroupIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';
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
	const translate = useTranslation();
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
				render={({ field }) => <Input type="email" icon={MailIcon} placeholder="E-Mail" {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="location"
				render={({ field }) => (
					<Input icon={LocationMarkerIcon} placeholder="Ort der Veranstaltung" {...field} />
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="guestCount"
				render={({ field }) => (
					<Input
						{...field}
						type="number"
						placeholder="Anzahl der Gäste"
						className="appearance-none"
						icon={UserGroupIcon}
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
						icon={CashIcon}
						{...field}
						value={`${field.value || ''}`}
						onChange={(value) => field.onChange(Number.parseInt(value))}
					/>
				)}
			/>
			<Checkbox
				register={register}
				id="contactAgreement"
				title={translate('forms.common.contactAgreementText')}
			/>
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

EventBookingForm.displayName = 'EventBookingForm';
