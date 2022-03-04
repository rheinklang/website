import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class RheinklangDocument extends Document {
	render() {
		const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
		return (
			<Html>
				<Head />
				<body className="min-h-screen">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
