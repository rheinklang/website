export enum CookieConsents {
	// state
	CONSENTED = 'rheinklang.consents.consented',
	// required
	REQUIRED = 'rheinklang.consents.required',
	SECURITY = 'rheinklang.consents.security',
	CONTENT_DELIVERY = 'rheinklang.consents.content-delivery',
	DEVICE_INFORMATION = 'rheinklang.consents.device-information',
	// not required
	FUNCTIONAL = 'rheinklang.consents.functional',
	MARKETING = 'rheinklang.consents.marketing',
	DEVICE_STORAGE = 'rheinklang.consents.device-storage',
	PERSONALIZATION = 'rheinklang.consents.personalization',
	ANLAYTICS = 'rheinklang.consents.analytics',
	EXTERNAL_CONTENT = 'rheinklang.consents.external-content',
}

export enum CookieValues {
	TRUE = 'yes',
	FALSE = 'no',
}
