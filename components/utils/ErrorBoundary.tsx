import { Component, ErrorInfo } from 'react';
import { Logger } from '../../utils/logger';
import { tagManagerPush } from '../../utils/matomo';

export interface ErrorBoundaryProps {
	route?: string;
}

export interface ErrorBoundaryState {
	error?: Error;
	hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	public state: ErrorBoundaryState = {
		hasError: false,
	};

	private logger = new Logger('ErrorBoundary');

	static getDerivedStateFromError(error: Error) {
		return { error, hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.logger.error(error, {
			context: errorInfo.componentStack || 'ErrorBoundary',
			route: this.props.route,
		});

		tagManagerPush({
			event: 'errorBoundaryCaught',
			error: error.message,
			errorStack: errorInfo.componentStack || '',
			route: this.props.route,
		});
	}

	render() {
		// if (this.state.hasError) {
		// TODO: Proper error handling with nofication!
		// 	{this.props.children}
		// }

		return this.props.children;
	}
}
