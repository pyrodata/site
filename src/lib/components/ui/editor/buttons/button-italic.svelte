<script lang="ts">
	import ItalicIcon from 'phosphor-svelte/lib/TextItalic';
	import { editor } from '$lib/core/app/context';
	import Button from './button.svelte';

	const tiptap = editor.get();
</script>

<Button
	onclick={() => tiptap.editor?.chain().focus().toggleItalic().run()}
	active={() => tiptap.editor?.isActive('italic') ?? false}
>
	<ItalicIcon />
</Button>
