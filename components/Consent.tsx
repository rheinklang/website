import { CogIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import { FC, useCallback, useState } from 'react';
import { useCookie } from '../hooks/useCookie';
import { useTranslation } from '../hooks/useTranslation';
import { CookieConsents, CookieValues } from '../utils/cookies';
import { Button } from './Button';
import { ConsentConfigurationDialog } from './ConsentConfigurationDialog';
import { Heading } from './Heading';

const quickAcceptConsents = () => {
	for (const consentKey of Object.values(CookieConsents)) {
		if (consentKey) {
			Cookies.set(consentKey, CookieValues.TRUE, { expires: 365 });
		}
	}
};

export const Consent: FC = () => {
	const translate = useTranslation();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { value, setCookie } = useCookie<boolean>(CookieConsents.CONSENTED, undefined, {
		expires: 365,
	});

	const handleConsented = useCallback(() => {
		setCookie(CookieValues.TRUE);
	}, [setCookie]);

	if (value === CookieValues.TRUE) {
		return null;
	}

	return (
		<section>
			<article className="bg-black text-white p-4 rounded-xl shadow-xl fixed right-4 left-4 bottom-4 md:p-8 md:w-96 md:left-auto">
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
						onClick={() => setIsOpen(true)}
					>
						{translate('consents.action.configure')}
					</Button>
					<div className="flex flex-row flex-nowrap gap-2 mt-2">
						<Button
							className="flex-grow"
							onClick={() => {
								quickAcceptConsents();
								handleConsented();
							}}
						>
							{translate('consents.action.accept')}
						</Button>
						<Button type="danger" className="flex-grow" onClick={handleConsented}>
							{translate('consents.action.reject')}
						</Button>
					</div>
				</div>
			</article>
			<ConsentConfigurationDialog state={[isOpen, setIsOpen]} handleConsented={handleConsented} />
		</section>
	);
};

Consent.displayName = 'Consent';
