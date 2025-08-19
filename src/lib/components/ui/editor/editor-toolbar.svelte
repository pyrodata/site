<script lang="ts">
	import { editor } from '$lib/core/app/context';
	import { EditorToolbarButtonGroup } from '.';
	import ButtonBold from './buttons/button-bold.svelte';
	import ButtonItalic from './buttons/button-italic.svelte';
	import ButtonUnderline from './buttons/button-underline.svelte';

	let tiptap = editor.get();
</script>

<div class="flex border-b border-muted [&_button]:rounded [&_button]:p-2">
	<EditorToolbarButtonGroup>
		<ButtonBold />
		<ButtonItalic />
		<ButtonUnderline />
	</EditorToolbarButtonGroup>
</div>
