import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import FallbackImageUrl from '$lib/assets/istockphoto-1180410208-612x612.jpg?url';
import type { TinyMCEEditor } from '$lib/types/tinymce';

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

/**
 * Generates a URL for accessing an asset file in PocketBase
 *
 * @param collection - The name of the collection
 * @param recordId - The ID of the record
 * @param field - The field name containing the asset
 * @param thumb - Optional thumbnail size (e.g., "100x100")
 * @returns The URL for the asset file
 */
export function getAssetUrl(
	collection: string,
	recordId: string,
	field: string,
	thumb?: string
): string {
	if (!collection || !recordId || !field) {
		throw new Error('Invalid parameters for asset URL');
	}

	return `${PUBLIC_POCKETBASE_URL}/api/files/${collection}/${recordId}/${field}?thumb=${thumb}`;
}

export function getAssetUrlWithFallback(
	collection: string,
	recordId: string,
	field: string,
	thumb?: string
): string {
	try {
		return getAssetUrl(collection, recordId, field, thumb);
	} catch (_) {
		return FallbackImageUrl;
	}
}

export function toFormula(value: string): string {
	return value.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>');
}

/**
 * Converts a name or email into two-letter initials
 *
 * @param input - Name (e.g., "Richard Mauritz") or email (e.g., "richardmauritz@proton.me")
 * @returns Two uppercase letters representing initials
 *
 * @example
 * getInitials("Richard Mauritz") // "RM"
 * getInitials("richardmauritz@proton.me") // "RI"
 * getInitials("John") // "JO"
 * getInitials("a@b.com") // "AB"
 */
export function getInitials(input: string): string {
	if (!input || typeof input !== 'string') {
		return 'XX';
	}

	const trimmed = input.trim();

	// Check if it's an email
	if (trimmed.includes('@')) {
		const emailPart = trimmed.split('@')[0];
		// Take first letter of email and first letter after @
		const firstLetter = emailPart.charAt(0);
		const domain = trimmed.split('@')[1];
		const secondLetter = domain ? domain.charAt(0) : emailPart.charAt(1) || emailPart.charAt(0);

		return (firstLetter + secondLetter).toUpperCase();
	}

	// Handle as name
	const words = trimmed.split(/\s+/).filter((word) => word.length > 0);

	if (words.length >= 2) {
		// Take first letter of first and second word
		return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
	} else if (words.length === 1) {
		// Single word: take first and second letter (or first twice if only one letter)
		const word = words[0];
		const firstLetter = word.charAt(0);
		const secondLetter = word.charAt(1) || word.charAt(0);
		return (firstLetter + secondLetter).toUpperCase();
	}

	return 'XX';
}

export function defaultEditorOptions() {
	const allowedPasteNodes = [
		'DIV',
		'P',
		'A',
		'EM',
		'B',
		'STRONG',
		'H1',
		'H2',
		'H3',
		'H4',
		'H5',
		'H6',
		'TABLE',
		'TR',
		'TD',
		'TH',
		'TBODY',
		'THEAD',
		'TFOOT',
		'BR',
		'HR',
		'Q',
		'SUP',
		'SUB',
		'DEL',
		'IMG',
		'OL',
		'UL',
		'LI',
		'CODE'
	];

	function unwrap(node: Element): void {
		let parent = node.parentNode;

		// move children outside of the parent node
		while (node.firstChild) {
			parent?.insertBefore(node.firstChild, node);
		}

		// remove the now empty parent element
		parent?.removeChild(node);
	}

	function cleanupPastedNode(node: Element): void {
		if (!node) {
			return; // nothing to cleanup
		}

		for (const child of node.children) {
			cleanupPastedNode(child);
		}

		if (!allowedPasteNodes.includes(node.tagName)) {
			unwrap(node);
		} else {
			node.removeAttribute('style');
			node.removeAttribute('class');
		}
	}

	return {
		branding: false,
		promotion: false,
		menubar: false,
		min_height: 270,
		height: 270,
		max_height: 700,
		autoresize_bottom_margin: 30,
		convert_unsafe_embeds: true, // GHSA-5359
		skin: 'pocketbase',
		content_style: 'body { font-size: 14px }',
		plugins: [
			'autoresize',
			'autolink',
			'lists',
			'link',
			'image',
			'searchreplace',
			'fullscreen',
			'media',
			'table',
			'code',
			'codesample',
			'directionality'
		],
		codesample_global_prismjs: true,
		codesample_languages: [
			{ text: 'HTML/XML', value: 'markup' },
			{ text: 'CSS', value: 'css' },
			{ text: 'SQL', value: 'sql' },
			{ text: 'JavaScript', value: 'javascript' },
			{ text: 'Go', value: 'go' },
			{ text: 'Dart', value: 'dart' },
			{ text: 'Zig', value: 'zig' },
			{ text: 'Rust', value: 'rust' },
			{ text: 'Lua', value: 'lua' },
			{ text: 'PHP', value: 'php' },
			{ text: 'Ruby', value: 'ruby' },
			{ text: 'Python', value: 'python' },
			{ text: 'Java', value: 'java' },
			{ text: 'C', value: 'c' },
			{ text: 'C#', value: 'csharp' },
			{ text: 'C++', value: 'cpp' },
			// other non-highlighted languages
			{ text: 'Markdown', value: 'markdown' },
			{ text: 'Swift', value: 'swift' },
			{ text: 'Kotlin', value: 'kotlin' },
			{ text: 'Elixir', value: 'elixir' },
			{ text: 'Scala', value: 'scala' },
			{ text: 'Julia', value: 'julia' },
			{ text: 'Haskell', value: 'haskell' }
		],
		toolbar:
			'styles | alignleft aligncenter alignright | bold italic forecolor backcolor | bullist numlist | link image_picker table codesample direction | code fullscreen',
		paste_postprocess: (editor: TinyMCEEditor, args: { node: Element }) => {
			cleanupPastedNode(args.node);
		},
		file_picker_types: 'image',
		// @see https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#interactive-example
		file_picker_callback: (cb: (url: string, meta?: any) => void, value: string, meta: any) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');

			input.addEventListener('change', (e: Event) => {
				const target = e.target as HTMLInputElement;
				if (!target?.files || target.files.length === 0) {
					return;
				}

				const file = target.files[0];
				const reader = new FileReader();

				reader.addEventListener('load', () => {
					if (!window.tinymce) {
						return;
					}

					// We need to register the blob in TinyMCEs image blob registry.
					// In future TinyMCE version this part will be handled internally.
					const id = 'blobid' + new Date().getTime();
					const blobCache = window.tinymce.activeEditor?.editorUpload?.blobCache;
					if (!blobCache || typeof reader.result !== 'string') {
						return;
					}

					const base64 = reader.result.split(',')[1];
					const blobInfo = blobCache.create(id, file, base64);
					blobCache.add(blobInfo);

					// call the callback and populate the Title field with the file name
					cb(blobInfo.blobUri(), { title: file.name });
				});

				reader.readAsDataURL(file);
			});

			input.click();
		},
		setup: (editor: TinyMCEEditor) => {
			editor.on('keydown', (e: KeyboardEvent) => {
				// propagate save shortcut to the parent
				if ((e.ctrlKey || e.metaKey) && e.code == 'KeyS' && editor.formElement) {
					e.preventDefault();
					e.stopPropagation();
					editor.formElement.dispatchEvent(new KeyboardEvent('keydown', e));
				}
			});

			const lastDirectionKey = 'tinymce_last_direction';

			// load last used text direction for blank editors
			editor.on('init', () => {
				const lastDirection = window?.localStorage?.getItem(lastDirectionKey);
				if (!editor.isDirty() && editor.getContent() == '' && lastDirection == 'rtl') {
					editor.execCommand('mceDirectionRTL');
				}
			});

			// text direction dropdown
			editor.ui.registry.addMenuButton('direction', {
				icon: 'visualchars',
				fetch: (callback: (items: any[]) => void) => {
					const items = [
						{
							type: 'menuitem',
							text: 'LTR content',
							icon: 'ltr',
							onAction: () => {
								window?.localStorage?.setItem(lastDirectionKey, 'ltr');
								editor.execCommand('mceDirectionLTR');
							}
						},
						{
							type: 'menuitem',
							text: 'RTL content',
							icon: 'rtl',
							onAction: () => {
								window?.localStorage?.setItem(lastDirectionKey, 'rtl');
								editor.execCommand('mceDirectionRTL');
							}
						}
					];

					callback(items);
				}
			});

			editor.ui.registry.addMenuButton('image_picker', {
				icon: 'image',
				fetch: (callback: (items: any[]) => void) => {
					const items = [
						{
							type: 'menuitem',
							text: 'From collection',
							icon: 'gallery',
							onAction: () => {
								editor.dispatch('collections_file_picker', {});
							}
						},
						{
							type: 'menuitem',
							text: 'Inline',
							icon: 'browse',
							onAction: () => {
								editor.execCommand('mceImage');
							}
						}
					];

					callback(items);
				}
			});
		}
	};
}
