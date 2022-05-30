import { createContext, useCallback, useContext, useMemo } from 'react';
import { compileStringTemplate } from '../utils/templating';

export const TranslationContext = createContext<Record<string, string>>({});
TranslationContext.displayName = 'TranslationContext';

export const useTranslation = (translationFactory?: Record<string, string>) => {
	const translationContext = useContext(TranslationContext);
	const factory = useMemo(() => translationFactory || translationContext, [translationContext, translationFactory]);

	return useCallback(
		(key: string, templateData?: Record<string, string | number | boolean>) => {
			if (!factory[key]) {
				console.warn(`Translation key "${key}" not found.`);
				return key;
			}

			if (templateData) {
				return compileStringTemplate<typeof templateData>(factory[key], templateData);
			}

			return factory[key];
		},
		[factory]
	);
};
