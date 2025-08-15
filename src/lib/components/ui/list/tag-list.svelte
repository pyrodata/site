<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import TagListDivider from './tag-list-divider.svelte';

	type TagListProps = {
		children: Snippet;
		divider?: boolean;
	} & HTMLAttributes<HTMLSpanElement>;

	let { children, divider = true, ...restProps }: TagListProps = $props();
</script>

{#if divider}
	<span
		{...restProps}
		class={cn(
			'flex flex-wrap items-center [&>*:not(:last-child)]:after:mx-2 [&>*:not(:last-child)]:after:text-muted [&>*:not(:last-child)]:after:content-["•"]',
			restProps.class
		)}
	>
		{@render children()}
	</span>
{:else}
	<span {...restProps} class={cn('flex flex-wrap items-center', restProps.class)}>
		{@render children()}
	</span>
{/if}
