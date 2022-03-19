import type { FC } from 'react';
import { Button, ButtonProps } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Heading } from './Heading';
import { Image } from './Image';

export interface HeroProps {
	title: string | JSX.Element;
	text: (string | JSX.Element)[];
	image?: string;
	primaryCta: ButtonProps;
	secondaryCta?: ButtonProps;
}

export const Hero: FC<HeroProps> = ({ title, text, image, primaryCta, secondaryCta }) => {
	return (
		<section className="text-sea-green-900">
			<div className="container mx-auto flex px-4 py-16 md:py-24 flex-col-reverse md:flex-row items-center">
				<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
					<Heading level="1" className="mb-4">
						{title}
					</Heading>
					{text.map((line, i) => (
						<p key={i} className="mb-8 leading-relaxed w-3/4">
							{line}
						</p>
					))}
					<ButtonGroup>
						<Button {...primaryCta} />
						{secondaryCta && <Button {...secondaryCta} type="secondary" />}
					</ButtonGroup>
				</div>
				<div className="lg:max-w-lg lg:w-full md:pb-0 md:w-1/2 w-5/6 pb-8">
					{image && <Image isObjectFitCover className="rounded-xl" src={image} alt={`${title}`} />}
					{/* <img
						className="object-cover object-center rounded-xl"
						alt="hero"
						src="https://dummyimage.com/1920x1080"
					/> */}
				</div>
			</div>
		</section>
	);
};

Hero.displayName = 'Hero';
