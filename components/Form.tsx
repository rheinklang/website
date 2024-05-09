import type { FC, PropsWithChildren } from 'react';

export interface FormProps extends PropsWithChildren {
	trackingId: string;
	label?: string;
}

export const Form: FC<FormProps> = ({ trackingId, children, label }) => (
	<div
		data-ph-capture-attribute-form-tracking-id={trackingId}
		role="form"
		aria-label={label}
		id={`${trackingId}-form`}
		className="grid grid-cols-1 gap-6 py-4"
	>
		{children}
	</div>
);

Form.displayName = 'Form';
