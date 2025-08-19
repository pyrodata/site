<script lang="ts">
	import BoldIcon from 'phosphor-svelte/lib/TextB';
	import { editor } from '$lib/core/app/context';
	import Button from './button.svelte';

	const tiptap = editor.get();
</script>

<Button
	onclick={() => tiptap.editor?.chain().focus().toggleBold().run()}
	active={() => tiptap.editor?.isActive('bold') ?? false}
>
	<BoldIcon />
</Button>
