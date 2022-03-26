import type { FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ConsentConfiguration } from './ConsentConfiguration';
import { Dialog, DialogProps } from './Dialog';

export interface ConsentConfigurationDialogProps extends DialogProps {
	handleConsented: () => void;
}

export const ConsentConfigurationDialog: FC<ConsentConfigurationDialogProps> = ({ state, handleConsented }) => {
	const translate = useTranslation();

	return (
		<Dialog state={state} title={translate('consents.configure.title')}>
			<ConsentConfiguration handleConsented={handleConsented} />
		</Dialog>
	);
};

ConsentConfigurationDialog.displayName = 'ConsentConfigurationDialog';
