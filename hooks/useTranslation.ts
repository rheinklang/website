import { createContext, useContext } from 'react';

export const TranslationContext = createContext<Record<string, string>>({});
TranslationContext.displayName = 'TranslationContext';

export const useTranslation = () => {
	const translationContext = useContext(TranslationContext);

	return (key: string) => {
		if (!translationContext[key]) {
			console.warn(`Translation key "${key}" not found.`);
			return key;
		}

		return translationContext[key];
	};
};
