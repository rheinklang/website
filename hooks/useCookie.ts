import Cookie, { CookieAttributes } from 'js-cookie';
import { useCallback, useState } from 'react';

export const useCookie = <T extends any | undefined = any>(
	selector: string,
	defaultValue: T = undefined as T,
	defaultAttributes: CookieAttributes = { expires: 180, sameSite: 'strict' }
) => {
	const [value, setValue] = useState(Cookie.get(selector) || defaultValue);
	const [attributes, setAttributes] = useState<CookieAttributes>(defaultAttributes);

	const setCookie = useCallback(
		(value?: string, attrs?: CookieAttributes) => {
			if (attrs) {
				setAttributes(attrs);
			}

			if (value) {
				setValue(value);
				Cookie.set(selector, value, attributes);
			} else {
				Cookie.remove(selector, attributes);
			}
		},
		[selector, attributes]
	);

	const setCookieAttributes = useCallback(
		(attributes: CookieAttributes) => {
			if (value) {
				setAttributes(attributes);
				Cookie.set(selector, value as any, attributes);
			}
		},
		[selector, value]
	);

	return {
		// state
		value,
		attributes,
		// setters
		setCookie,
		setCookieAttributes,
	};
};
