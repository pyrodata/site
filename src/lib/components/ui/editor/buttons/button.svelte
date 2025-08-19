<script lang="ts">
	import { editor } from '$lib/core/app/context';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		children: Snippet;
		active?: () => boolean;
	} & HTMLButtonAttributes;

	let { children, active, ...restProps }: ButtonProps = $props();
	let isActive = $state(false);

	const tiptap = editor.get();

	tiptap.editor?.on('transaction', () => {
		if (active?.()) {
			isActive = true;
		} else {
			isActive = false;
		}
	});
</script>

<button
	{...restProps}
	class={cn(
		'cursor-pointer rounded-md transition-colors hover:bg-neutral-200',
		isActive && 'bg-neutral-200',
		restProps.class
	)}
>
	{@render children()}
</button>
