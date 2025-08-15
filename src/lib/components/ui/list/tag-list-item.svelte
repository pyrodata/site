<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type TagListItemProps = {
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'default';
	} & HTMLAttributes<HTMLSpanElement>;

	let { children, variant = 'default', ...restProps }: TagListItemProps = $props();
</script>

<span
	{...restProps}
	class={cn(
		`text-xs font-medium`,
		variant === 'primary' && 'text-primary',
		variant === 'secondary' && 'text-gray-400',
		restProps.class
	)}
>
	{@render children()}
</span>
