import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging CSS classes using clsx and tailwind-merge
 * Combines multiple class values and resolves Tailwind CSS conflicts
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns Merged and optimized class string
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function getAssetUrl(collection: string, recordId: string, field: string): string {
	if (!collection || !recordId || !field) {
		throw new Error('Invalid parameters for asset URL');
	}

	return `${PUBLIC_POCKETBASE_URL}/api/files/${collection}/${recordId}/${field}`;
}
