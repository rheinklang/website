import { useQuery } from '@apollo/client';
import { BuildingOffice2Icon, EnvelopeIcon, ShieldCheckIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { FC, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm, SubmitErrorHandler } from 'react-hook-form';
import { sendDiscordReportSubmission } from '../../api/discord';
import { useGetRegistrationFormVerificationCodeForIdQuery } from '../../graphql';
import { useFormSubmissionState } from '../../hooks/useFormSubmissionState';
import { useTranslation } from '../../hooks/useTranslation';
import { VALIDATE_EMAIL } from '../../utils/validation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Dropdown, DropdownOption } from '../Dropdown';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { SubmissionNotification } from './SubmissionNotification';

interface InvitationFormState {
	authority: string;
	email: string;
	name: string;
	message: string;
	contactAgreement: boolean;
	gotcha: string;
	verificationCode?: string;
	attendees: Array<{ name: string }>;
}

export interface InvitationFormProps {
	id: string;
	areCompanionsAllowed?: boolean;
	companionCount?: number | null | undefined;
	formId: string;
	title: string;
}

export const InvitationForm: FC<InvitationFormProps> = ({
	id,
	companionCount,
	areCompanionsAllowed,
	formId,
	title,
}) => {
	const translate = useTranslation();
	const [attendeeCount, setAttendeeCount] = useState('');
	const { submit, error, isSubmitted, isSubmitting } = useFormSubmissionState();
	const { control, handleSubmit } = useForm<InvitationFormState>({
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			authority: '',
			name: '',
			message: '',
			gotcha: '',
			verificationCode: '',
			attendees: [],
		},
	});

	const { data, loading } = useGetRegistrationFormVerificationCodeForIdQuery({
		variables: {
			filter: {
				_id: id,
			},
		},
	});

	const { fields, replace } = useFieldArray({
		control,
		name: 'attendees',
	});

	const dropdownOptions: DropdownOption[] = useMemo(
		() =>
			areCompanionsAllowed && companionCount
				? new Array(companionCount)
						.fill(null)
						.map((_, i) => ({ id: `${i + 1}`, label: `${i + 1}x Begleitpersonen` }))
						.concat({ id: `none`, label: 'Keine Begleitpersonen' })
				: [],
		[areCompanionsAllowed, companionCount]
	);

	const onSubmit = (formData: InvitationFormState) => {
		const submittableFlatData = {
			...formData,
			attendees: formData.attendees.map((entry) => entry.name).join(', '),
		};

		if (
			!loading &&
			data?.registrationFormsCollection &&
			data.registrationFormsCollection[0] &&
			data.registrationFormsCollection[0].verificationCode &&
			data.registrationFormsCollection[0].verificationCode !== formData.verificationCode
		) {
			// wrong verification code! this should be caught by the useForm hook itself, but better be safe than sorry ;)
			alert(`Verifizierungscode ungültig, bitte versuchen Sie es erneut`);
		} else {
			submit(formId as `registrationForm${string}`, submittableFlatData, title);
		}
	};

	const handleSelectionChange = (count: string | undefined) => {
		if (count && count === 'none') {
			setAttendeeCount('none');
			replace([]);
		} else if (count && count !== 'none') {
			setAttendeeCount(count);
			replace(new Array(Number.parseInt(count, 10)).fill(null).map((_, i) => ({ name: '' })));
		} else {
			setAttendeeCount('');
			replace([]);
		}
	};

	const onError: SubmitErrorHandler<InvitationFormState> = (_errors) => {
		// sendDiscordReportSubmission(JSON.stringify(errors, null, 2), 'InvitationForm');
	};

	return (
		<div className="grid grid-cols-1 gap-6 py-4">
			<Controller
				control={control}
				rules={{ required: true }}
				name="authority"
				render={({ field, fieldState }) => (
					<Input
						placeholder="Firmen- oder Vereinsname *"
						icon={BuildingOffice2Icon}
						{...field}
						hookState={fieldState}
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{ required: true }}
				name="name"
				render={({ field, fieldState }) => <Input placeholder="Ihr Name *" {...field} hookState={fieldState} />}
			/>
			<Controller
				control={control}
				rules={{
					required: true,
					pattern: {
						value: VALIDATE_EMAIL,
						message: 'Invalides Format',
					},
				}}
				name="email"
				render={({ field, fieldState }) => (
					<Input type="email" placeholder="E-Mail *" icon={EnvelopeIcon} {...field} hookState={fieldState} />
				)}
			/>
			{areCompanionsAllowed && companionCount && (
				<Dropdown
					placeholder="Anzahl Begleitpersonen"
					value={attendeeCount}
					onChange={handleSelectionChange}
					options={dropdownOptions}
				/>
			)}
			{fields.map((field, index) => (
				<Controller
					control={control}
					name={`attendees.${index}.name`}
					key={field.id}
					render={({ field, fieldState }) => (
						<Input
							type="text"
							placeholder={`Name der Begleitperson #${index + 1}`}
							icon={UserPlusIcon}
							{...field}
							hookState={fieldState}
						/>
					)}
				/>
			))}
			{!loading &&
				data?.registrationFormsCollection &&
				data.registrationFormsCollection[0] &&
				data.registrationFormsCollection[0].verificationCode && (
					<Controller
						control={control}
						rules={{
							required: true,
							validate: (formData) => formData === data?.registrationFormsCollection[0]?.verificationCode,
						}}
						name="verificationCode"
						render={({ field, fieldState }) => (
							<Input
								placeholder="Verifizierungscode *"
								icon={ShieldCheckIcon}
								{...field}
								value={`${field.value || ''}`}
								hookState={fieldState}
							/>
						)}
					/>
				)}
			<Controller
				control={control}
				name="message"
				render={({ field, fieldState }) => (
					<Textarea
						rows={8}
						placeholder="Optionaler Kommentar"
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
						title={translate('forms.common.formalContactAgreementText')}
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
					title="Danke für Ihre Anmeldung"
					text="Wir werden uns in kürze bei dir melden"
				/>
			)}
		</div>
	);
};

InvitationForm.displayName = 'InvitationForm';
