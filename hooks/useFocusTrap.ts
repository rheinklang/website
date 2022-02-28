import { createFocusTrap } from 'focus-trap';
import { RefObject, useDebugValue, useEffect, useMemo, useState } from 'react';

export const useFocusTrap = <T extends HTMLElement>(ref: RefObject<T>) => {
	const [isActive, setIsActive] = useState(false);
	const [focusTrapInstance, setFocusTrapInstance] = useState<ReturnType<typeof createFocusTrap>>();

	useDebugValue(isActive, (state) => (state ? 'active' : 'inactive'));
	useDebugValue(focusTrapInstance, (state) => (!!state ? 'focusTrapInstance' : 'undefined'));

	useEffect(() => {
		if (!ref || !ref.current) {
			return;
		}

		if (!focusTrapInstance) {
			setFocusTrapInstance(
				createFocusTrap(ref.current, {
					onDeactivate: () => setIsActive(false),
				})
			);
		} else {
			focusTrapInstance.updateContainerElements(ref.current);
		}
	}, [focusTrapInstance, isActive, ref]);

	useEffect(() => {
		if (!focusTrapInstance) {
			return;
		}

		if (isActive) {
			focusTrapInstance.activate();
		} else {
			focusTrapInstance.deactivate();
		}

		return () => {
			focusTrapInstance.deactivate();
		};
	}, [isActive, focusTrapInstance]);

	return {
		activate: () => setIsActive(true),
		deactivate: () => setIsActive(false),
	};
};
