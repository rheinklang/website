import { createContext, useCallback, useContext, useMemo } from 'react';

export const TranslationContext = createContext<Record<string, string>>({});
TranslationContext.displayName = 'TranslationContext';

export const useTranslation = (translationFactory?: Record<string, string>) => {
	const translationContext = useContext(TranslationContext);
	const factory = useMemo(() => translationFactory || translationContext, [translationContext, translationFactory]);

	return useCallback(
		(key: string) => {
			if (!factory[key]) {
				console.warn(`Translation key "${key}" not found.`);
				return key;
			}

			return factory[key];
		},
		[factory]
	);
};
