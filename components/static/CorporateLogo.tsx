import { FC } from 'react';

export interface CorporateLogoProps {
	className?: string;
}

export const CorporateLogo: FC<CorporateLogoProps> = ({ className }) => (
	// eslint-disable-next-line @next/next/no-img-element
	<img src="/assets/logos/rheinklang-corporate-logo.svg" alt="Logo" className={className} />
);

CorporateLogo.displayName = 'CorporateLogo';
