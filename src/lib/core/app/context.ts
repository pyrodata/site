import type { Editor } from '@tiptap/core';
import { Context } from 'runed';

export type EditorContext = {
	element: HTMLDivElement | undefined;
	editor: Editor | undefined;
	value: string | undefined;
};
export const editor = new Context<EditorContext>('editor');
