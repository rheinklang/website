import type { FC } from 'react';
import { Button, ButtonProps } from './Button';
import { Heading } from './Heading';

export interface HeroProps {
	title: string | JSX.Element;
	text: (string | JSX.Element)[];
	primaryCta: ButtonProps;
	secondaryCta?: ButtonProps;
}

export const Hero: FC<HeroProps> = ({ title, text, primaryCta, secondaryCta }) => {
	return (
		<section className="text-sea-green-900">
			<div className="container mx-auto flex px-5 py-24 flex-col md:flex-row items-center">
				<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
					<Heading level="1" className="mb-4">
						{title}
					</Heading>
					{text.map((line, i) => (
						<p key={i} className="mb-8 leading-relaxed w-3/4">
							{line}
						</p>
					))}
					<div className="flex justify-center">
						<Button {...primaryCta} />
						{secondaryCta && <Button {...secondaryCta} className="ml-2" type="secondary" />}
					</div>
				</div>
				<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
					<img
						className="object-cover object-center rounded-xl"
						alt="hero"
						src="https://dummyimage.com/720x600"
					/>
				</div>
			</div>
		</section>
	);
};

Hero.displayName = 'Hero';
