import { ShieldCheckIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../hooks/useTranslation';
import { CookieConsents, CookieValues } from '../utils/cookies';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Dialog, DialogProps } from './Dialog';

export type ConsentConfigurationForm = Record<CookieConsents, boolean>;

export const REQUIRED_COOKIES = [
	CookieConsents.REQUIRED,
	CookieConsents.SECURITY,
	CookieConsents.CONTENT_DELIVERY,
	CookieConsents.DEVICE_INFORMATION,
];

export const CONFIGURABLE_COOKIES = [
	CookieConsents.REQUIRED,
	CookieConsents.SECURITY,
	CookieConsents.CONTENT_DELIVERY,
	CookieConsents.DEVICE_INFORMATION,
	CookieConsents.FUNCTIONAL,
	CookieConsents.MARKETING,
	CookieConsents.DEVICE_STORAGE,
	CookieConsents.PERSONALIZATION,
	CookieConsents.ANLAYTICS,
	CookieConsents.EXTERNAL_CONTENT,
];

export interface ConsentConfigurationDialogProps extends DialogProps {
	handleConsented: () => void;
}

export const ConsentConfigurationDialog: FC<ConsentConfigurationDialogProps> = ({ state, handleConsented }) => {
	const translate = useTranslation();
	const { register, handleSubmit, getValues } = useForm<ConsentConfigurationForm>({
		mode: 'onSubmit',
		defaultValues: {
			// required
			[CookieConsents.REQUIRED]: true,
			[CookieConsents.SECURITY]: true,
			[CookieConsents.CONTENT_DELIVERY]: true,
			[CookieConsents.DEVICE_INFORMATION]: true,
			// not required
			[CookieConsents.FUNCTIONAL]: false,
			[CookieConsents.MARKETING]: false,
			[CookieConsents.DEVICE_STORAGE]: false,
			[CookieConsents.PERSONALIZATION]: false,
			[CookieConsents.ANLAYTICS]: false,
			[CookieConsents.EXTERNAL_CONTENT]: false,
		},
	});

	return (
		<Dialog state={state} title={translate('consents.configure.title')}>
			<p className="text-xs">{translate('consents.configure.text')}</p>
			<div className="my-4">
				{CONFIGURABLE_COOKIES.map((key) => (
					<Checkbox
						key={key}
						id={key}
						title={translate(`cookies.${key}`)}
						register={register}
						options={{
							disabled: REQUIRED_COOKIES.includes(key),
							required: REQUIRED_COOKIES.includes(key),
						}}
					/>
				))}
			</div>
			<p className="text-xs">
				<span className="text-slightly-rose-500">*</span> Benötigt um die Website zu nutzen.
			</p>
			<div className="mt-8">
				<Button
					iconPosition="post"
					icon={<ShieldCheckIcon className="inline-block align-top h-6 ml-2" />}
					onClick={() => {
						handleSubmit(() => {
							Object.keys(getValues()).forEach((cookieKey) => {
								Cookies.set(cookieKey, CookieValues.TRUE, {
									expires: 365,
								});
							});

							Cookies.set(CookieConsents.CONSENTED, CookieValues.TRUE, {
								expires: 365,
							});

							handleConsented();
						});
					}}
				>
					Speichern
				</Button>
			</div>
		</Dialog>
	);
};

ConsentConfigurationDialog.displayName = 'ConsentConfigurationDialog';
