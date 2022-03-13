import { MailIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

export interface SupportFormState {
	email: string;
	name: string;
	message: string;
	contactAgreement: boolean;
}

export const SupportForm: FC = () => {
	const { control, register, getValues } = useForm<SupportFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			name: '',
			message: '',
			contactAgreement: true,
		},
	});

	return (
		<div className="grid grid-cols-1 gap-6 py-4">
			<Controller
				control={control}
				rules={{ required: true }}
				name="name"
				render={({ field }) => <Input placeholder="Ihr Name" {...field} />}
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
				name="message"
				render={({ field }) => (
					<Textarea rows={14} placeholder="Ihre Nachricht" {...field} value={`${field.value || ''}`} />
				)}
			/>
			<Checkbox
				register={register}
				id="contactAgreement"
				title="Sind Sie damit einverstanden von uns kontaktiert zu werden?"
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

SupportForm.displayName = 'SupportForm';
