<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import EditorToolbar from './editor-toolbar.svelte';
	import { editor, type EditorContext } from '$lib/core/app/context';

	type EditorProps = {
		editor?: Editor;
		value?: string;
	};

	const _state = $state<EditorContext>({
		element: undefined,
		editor: undefined,
		value: undefined
	});

	let { value = $bindable('') }: EditorProps = $props();

	onMount(() => {
		_state.editor = new Editor({
			element: _state.element,
			extensions: [StarterKit],
			content: value,
			onTransaction: (props) => {
				// force re-render so `editor.isActive` works as expected
				_state.editor = _state.editor;
				_state.value = props.editor.getHTML();
				value = _state.value;
			}
		});

		return () => {
			_state.editor?.destroy();
		};
	});

	editor.set(_state);
</script>

<div class="rounded-md border border-muted">
	<EditorToolbar />
	<div
		bind:this={_state.element}
		class="prose max-w-full p-4 [&_.ProseMirror-focused]:outline-none"
	></div>
</div>
