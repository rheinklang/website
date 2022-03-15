import { MailIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

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
	const { control, register, getValues } = useForm<PressInquiryFormState>({
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
				name="publisher"
				render={({ field }) => <Input placeholder="Verlag" {...field} />}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="requestType"
				render={({ field }) => (
					<Dropdown
						{...field}
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
				render={({ field }) => (
					<Textarea rows={14} placeholder="Ihre Nachricht" {...field} value={`${field.value || ''}`} />
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

PressInquiryForm.displayName = 'PressInquiryForm';
