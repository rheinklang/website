import { parse, format, formatRelative } from 'date-fns';
import { de } from 'date-fns/locale';

export const CURRENT_YEAR = new Date().getFullYear();

export const FORMAT_OPTIONS = {
	locale: de,
	weekStartsOn: 1,
} as const;

export function formatCreationDate(date: number): string {
	// we multiply by 1000 to get the timestamp in milliseconds (from unix epoch)
	return formatRelative(date * 1000, Date.now(), FORMAT_OPTIONS);
}

export function formatRelativeDate(date: string): string {
	return formatRelative(parseCockpitDate(date), new Date(), FORMAT_OPTIONS);
}

export function formatDate(date: string, targetFormat: string = 'dd. MMMM yyyy'): string {
	return format(parseCockpitDate(date), targetFormat, FORMAT_OPTIONS);
}

export function formatDateRange(startDate: string, endDate: string): string {
	const start = parseCockpitDate(startDate);
	const end = parseCockpitDate(endDate);

	if (start.getMonth() === end.getMonth()) {
		return `Vom ${formatDate(startDate, 'dd.')} bis ${formatDate(endDate, 'dd. MMMM yyyy')}`;
	}

	return `Vom ${formatDate(startDate, 'dd. MMMM')} bis ${formatDate(endDate, 'dd. MMMM yyyy')}`;
}

export function parseCockpitDate(date?: null): undefined;
export function parseCockpitDate(date: string): Date;
export function parseCockpitDate(date?: string | null) {
	if (!date) {
		return undefined;
	}

	return parse(date, 'yyyy-MM-dd', new Date(0));
}
