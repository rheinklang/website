import { createRef, FC, PropsWithChildren, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Heading } from './Heading';
import { useFocusTrap } from '../hooks/useFocusTrap';

export interface DialogProps extends PropsWithChildren {
	title?: string | JSX.Element;
	description?: string | JSX.Element;
	state: [boolean, (isOpen: boolean) => void];
}

export const Dialog: FC<DialogProps> = ({ state, title, children }) => {
	const [isOpen, setIsOpen] = state;
	const dialogRootRef = createRef<HTMLDivElement>();
	const dialogContentRef = createRef<HTMLElement>();
	const dialogFocusTrap = useFocusTrap(dialogContentRef);

	useEffect(() => {
		if (isOpen) {
			dialogFocusTrap.activate();
		} else {
			dialogFocusTrap.deactivate();
		}
	}, [isOpen, dialogFocusTrap]);

	return (
		<section className="z-50">
			<CSSTransition
				mountOnEnter
				unmountOnExit
				timeout={300}
				in={isOpen}
				nodeRef={dialogRootRef}
				onExited={() => setIsOpen(false)}
				classNames={{
					exit: 'opacity-0 invisible',
					appear: 'opacity-100 visible',
				}}
			>
				<div
					ref={dialogRootRef}
					aria-hidden={!isOpen}
					className={classNames(
						'z-50 p-4 transition-all fixed flex top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden justify-center items-center',
						'backdrop-blur-sm inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
					)}
				>
					<article
						ref={dialogContentRef}
						className="relative flex flex-col w-auto lg:max-w-2xl py-4 rounded-lg bg-white lg:py-8"
					>
						<button
							className="absolute right-4 top-4 cursor-pointer outline-none ring-slightly-rose-700 rounded-xl focus:ring-2"
							onClick={() => setIsOpen(false)}
						>
							<XMarkIcon className="text-slightly-rose-700 h-6" />
						</button>
						{title && (
							<div className="px-4 mb-2 mr-10 lg:px-8">
								<Heading level="5">{title}</Heading>
							</div>
						)}
						<div className="px-4 lg:px-8">{children}</div>
					</article>
				</div>
			</CSSTransition>
		</section>
	);
};

Dialog.displayName = 'Dialog';
