import { isBrowser } from './ssr';
import StackTrace from 'stacktrace-js';
import { submitForm } from '../api/forms';
import { sendReport } from '../api/slack';
import { sendDiscordReportSubmission } from '../api/discord';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export interface LogOptions {
	context?: string;
	report?: boolean;
	stacktrace?: string[];
	level?: LogLevel;
	route?: string;
	data?: Record<string, any>;
}

export interface LogPayload {
	message: string;
	context: string;
	type: string;
	env: 'browser' | 'server';
	buildId: string;
	route?: string;
	stacktrace?: string[];
}

export class Logger {
	private caughtErrors: string[] = [];

	constructor(private context = 'global') {}

	public info(message: string): void {
		console.log(`[${this.context}:${this.env}] ${message} [${process.env.CONFIG_BUILD_ID}]`);
	}

	public warn(message: string): void {
		console.warn(`[${this.context}:${this.env}] ${message} [${process.env.CONFIG_BUILD_ID}]`);
	}

	public error(error: Error, opts: LogOptions = {}): void {
		const errorSignature = `${error.message}#${error.stack}`;
		if (this.caughtErrors.includes(errorSignature)) {
			return;
		}

		this.caughtErrors.push(errorSignature);

		StackTrace.fromError(error, { offline: false }).then((stackFrames) => {
			const payload = this.getPayload(error.message, error.name, {
				...opts,
				level: 'error',
				stacktrace: stackFrames.map((frame) => frame.toString()),
			});

			this.report(payload);
		});
	}

	private get env() {
		return isBrowser ? 'browser' : 'server';
	}

	private getPayload(message: string, type: string, opts: LogOptions = {}): LogPayload {
		return {
			message,
			type,
			env: this.env,
			context: opts.context || this.context,
			buildId: `${process.env.CONFIG_BUILD_ID}`,
		};
	}

	private report(payload: LogPayload) {
		if (process.env.NODE_ENV !== 'production') {
			console.log(`[${payload.context}:${payload.env}] ${payload.message} [${payload.buildId}]`);
		} else {
			submitForm('logs', payload);
			sendReport(payload.message, payload.context);
			sendDiscordReportSubmission(payload.message, payload.context);
		}
	}
}
