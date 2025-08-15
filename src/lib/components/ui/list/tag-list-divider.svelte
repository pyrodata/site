<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import DotIcon from 'phosphor-svelte/lib/Dot';

	type TagListItemProps = {
		children?: Snippet;
	} & HTMLAttributes<HTMLSpanElement>;

	let { children, ...restProps }: TagListItemProps = $props();
</script>

<span {...restProps} class={cn(`text-sm font-medium`, restProps.class)}>
	{@render children?.()}
	{#if children}
		{@render children?.()}
	{:else}
		<span class="relative top-[.5px] mx-2 block h-1 w-1 rounded-full bg-gray-300"></span>
	{/if}
</span>
