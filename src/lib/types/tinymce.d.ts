// Type declarations for TinyMCE
export interface TinyMCEEditor {
	on: (event: string, callback: (e?: any) => void) => void;
	setContent: (content: string) => void;
	getContent: (options?: { format?: string }) => string;
	mode?: {
		set: (mode: string) => void;
	};
	setMode?: (mode: string) => void;
	dom?: {
		unbind: (target: any) => void;
	};
	isDirty: () => boolean;
	execCommand: (command: string, ui?: boolean, value?: any) => boolean;
	dispatch: (event: string, data?: any) => void;
	formElement?: HTMLFormElement;
	ui: {
		registry: {
			addMenuButton: (name: string, config: any) => void;
		};
	};
	editorUpload?: {
		blobCache: {
			create: (id: string, file: File, base64: string) => any;
			add: (blobInfo: any) => void;
		};
	};
}

export interface TinyMCE {
	init: (config: any) => void;
	remove: (editor: TinyMCEEditor) => void;
	activeEditor?: TinyMCEEditor;
}

export interface TinyMCEConfig {
	inline?: boolean;
	setup?: (editor: TinyMCEEditor) => void;
	[key: string]: any;
}

// Extend the global Window interface
declare global {
	interface Window {
		tinymce?: TinyMCE;
	}
}

// This is needed to make the file a module
export {};
