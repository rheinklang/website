import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { createRef, Dispatch, FC, SetStateAction, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Heading } from './Heading';
import { createFocusTrap } from 'focus-trap';

export interface DialogProps {
	title?: string | JSX.Element;
	description?: string | JSX.Element;
	state: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const Dialog: FC<DialogProps> = ({ state, title, children }) => {
	const [isOpen, setIsOpen] = state;
	const dialogRootRef = createRef<HTMLDivElement>();
	const dialogContentRef = createRef<HTMLElement>();

	useEffect(() => {
		if (dialogContentRef && dialogContentRef.current) {
			const trap = createFocusTrap(dialogContentRef.current, {
				onDeactivate: () => setIsOpen(false),
			});

			if (isOpen) {
				trap.activate();
			} else {
				trap.deactivate();
			}
		}
	}, [isOpen, dialogContentRef, setIsOpen]);

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
						<XIcon className="h-6 absolute right-4 top-4 cursor-pointer" onClick={() => setIsOpen(false)} />
						{title && (
							<header className="px-4 mb-2 mr-10 lg:px-8">
								<Heading level="5">{title}</Heading>
							</header>
						)}
						<div className="px-4 lg:px-8">{children}</div>
					</article>
				</div>
			</CSSTransition>
		</section>
	);
};

Dialog.displayName = 'Dialog';
