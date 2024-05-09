import { CogIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { FC, useCallback, useEffect, useState } from 'react';
import { useCookie } from '../hooks/useCookie';
import { useTranslation } from '../hooks/useTranslation';
import { CookieConsents, CookieValues } from '../utils/cookies';
import { Button } from './Button';
import { ConsentConfigurationDialog } from './ConsentConfigurationDialog';
import { Heading } from './Heading';
import posthog from 'posthog-js';

const quickAcceptConsents = () => {
	for (const consentKey of Object.values(CookieConsents)) {
		if (consentKey) {
			Cookies.set(consentKey, CookieValues.TRUE, { expires: 365, sameSite: 'strict' });
		}
	}
};

export interface ConsentProps {
	variant?: 'dark' | 'light';
}

export const Consent: FC<ConsentProps> = ({ variant }) => {
	const translate = useTranslation();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { value, setCookie } = useCookie<boolean>(CookieConsents.CONSENTED, undefined, {
		expires: 365,
	});

	const handleConsented = useCallback(() => {
		setCookie(CookieValues.TRUE);
		setIsVisible(false);
	}, [setCookie]);

	const handleSetIsOpen = useCallback((nextOpenState: boolean) => {
		setIsOpen(nextOpenState);
	}, []);

	useEffect(() => {
		if (value === undefined) {
			setIsVisible(true);
		}
	}, [value]);

	if (!isVisible) {
		return null;
	}

	return (
		<section>
			<article
				className={classNames(
					'p-4 rounded-xl shadow-xl fixed right-4 left-4 bottom-4 md:p-8 md:w-96 md:left-auto',
					{
						'bg-black text-white': variant === 'dark',
						'bg-white text-black': variant === 'light',
					}
				)}
			>
				<Heading tag="p" level="5" className="pb-2">
					{translate('consents.request.title')}
				</Heading>
				<p className="text-sm">{translate('consents.request.text')}</p>
				<div className="pt-4">
					<Button
						type="secondary"
						className="block sm:w-full"
						iconPosition="post"
						icon={<CogIcon className="inline-block align-top h-6 ml-2" />}
						onClick={() => {
							handleSetIsOpen(true);
						}}
					>
						{translate('consents.action.configure')}
					</Button>
					<div className="flex flex-row flex-nowrap gap-2 mt-2">
						<Button
							className="flex-grow"
							onClick={() => {
								quickAcceptConsents();
								handleConsented();
								posthog.capture('Consented', {
									mode: 'all',
								});
							}}
						>
							{translate('consents.action.accept')}
						</Button>
						<Button
							type="danger"
							className="flex-grow"
							onClick={() => {
								handleConsented();
								posthog.capture('Consent Rejected');
							}}
						>
							{translate('consents.action.reject')}
						</Button>
					</div>
				</div>
			</article>
			<ConsentConfigurationDialog state={[isOpen, handleSetIsOpen]} handleConsented={handleConsented} />
		</section>
	);
};

Consent.displayName = 'Consent';
