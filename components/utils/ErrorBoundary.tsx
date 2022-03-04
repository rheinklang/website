import { Component, ErrorInfo } from 'react';
import { Logger } from '../../utils/logger';

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
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="bg-black text-white">
					<h1>Error Caught, should be handled later - see console for details</h1>
				</div>
			);
		}

		return this.props.children;
	}
}
