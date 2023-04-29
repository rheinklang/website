import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps } from 'react';

export type IconComponentLike = ForwardRefExoticComponent<
	PropsWithoutRef<SVGProps<SVGSVGElement>> & {
		title?: string;
		titleId?: string;
	} & RefAttributes<SVGSVGElement>
>;
