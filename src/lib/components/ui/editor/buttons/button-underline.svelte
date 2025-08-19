<script lang="ts">
	import UnderlineIcon from 'phosphor-svelte/lib/TextUnderline';
	import { editor } from '$lib/core/app/context';
	import Button from './button.svelte';

	const tiptap = editor.get();
</script>

<Button
	onclick={() => tiptap.editor?.chain().focus().toggleUnderline().run()}
	active={() => tiptap.editor?.isActive('underline') ?? false}
>
	<UnderlineIcon />
</Button>
