import { LinkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { Controller, FormState, useForm } from 'react-hook-form';
import { useTranslation } from '../hooks/useTranslation';
import { CookieConsents, CookieValues } from '../utils/cookies';
import { StaticRoutes } from '../utils/routes';
import { keys } from '../utils/structs';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Link } from './Link';
import posthog from 'posthog-js';

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

export interface ConsentConfigurationProps {
	handleConsented: (
		values: Readonly<Record<CookieConsents, boolean>>,
		state: FormState<ConsentConfigurationForm>
	) => void;
}

export const ConsentConfiguration: FC<ConsentConfigurationProps> = ({ handleConsented }) => {
	const translate = useTranslation();
	const initialCookies = Cookies.get();

	const { handleSubmit, control, getValues, formState } = useForm<ConsentConfigurationForm>({
		mode: 'onSubmit',
		defaultValues: {
			// required
			[CookieConsents.REQUIRED]: true,
			[CookieConsents.SECURITY]: true,
			[CookieConsents.CONTENT_DELIVERY]: true,
			[CookieConsents.DEVICE_INFORMATION]: true,
			// not required
			[CookieConsents.FUNCTIONAL]: Cookies.get(CookieConsents.FUNCTIONAL) === CookieValues.TRUE,
			[CookieConsents.MARKETING]: Cookies.get(CookieConsents.MARKETING) === CookieValues.TRUE,
			[CookieConsents.DEVICE_STORAGE]: Cookies.get(CookieConsents.DEVICE_STORAGE) === CookieValues.TRUE,
			[CookieConsents.PERSONALIZATION]: Cookies.get(CookieConsents.PERSONALIZATION) === CookieValues.TRUE,
			[CookieConsents.ANLAYTICS]: Cookies.get(CookieConsents.ANLAYTICS) === CookieValues.TRUE,
			[CookieConsents.EXTERNAL_CONTENT]: Cookies.get(CookieConsents.EXTERNAL_CONTENT) === CookieValues.TRUE,
		},
	});

	const onSubmit = (values: ConsentConfigurationForm) => {
		keys(values).forEach((cookieKey) => {
			const value = values[cookieKey] ? CookieValues.TRUE : CookieValues.FALSE;

			Cookies.set(cookieKey, value, {
				expires: 365,
				sameSite: 'strict',
			});
		});

		Cookies.set(CookieConsents.CONSENTED, CookieValues.TRUE, {
			expires: 365,
			sameSite: 'strict',
		});

		posthog.capture('Consented', {
			mode: 'selection',
			values,
		});

		handleConsented(getValues(), formState);
	};

	return (
		<div>
			<p className="text-xs">{translate('consents.configure.text')}</p>
			<p className="text-xs mt-2">
				<span className="text-slightly-rose-500">*</span>&nbsp;
				{translate('consents.configure.requiredDescription')}
			</p>
			<div className="my-4">
				{CONFIGURABLE_COOKIES.map((key) => (
					<Controller
						control={control}
						key={key}
						name={key}
						render={({ field, fieldState }) => (
							<Checkbox
								{...field}
								hookState={fieldState}
								isDisabled={REQUIRED_COOKIES.includes(key)}
								isRequired={REQUIRED_COOKIES.includes(key)}
								id={`consentConfigurationField-${key}`}
								title={translate(`cookies.${key}`)}
							/>
						)}
					/>
				))}
			</div>

			<div className="mt-4 text-xs">
				<Link
					isStandalone
					className="text-sea-green-400"
					iconPositon="pre"
					icon={<LinkIcon className="inline-block align-top h-3 mr-1" />}
					href={StaticRoutes.DATA_PROTECTION}
				>
					Details zur Datenschutzerklärung
				</Link>
			</div>
			<div className="mt-8">
				<Button
					iconPosition="post"
					icon={<ShieldCheckIcon className="inline-block align-top h-6 ml-2" />}
					onClick={handleSubmit(onSubmit)}
				>
					Speichern
				</Button>
			</div>
		</div>
	);
};

ConsentConfiguration.displayName = 'ConsentConfiguration';
