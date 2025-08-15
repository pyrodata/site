<script lang="ts">
	import { cn } from '$lib/utils';
	import { Avatar, type WithoutChildrenOrChild } from 'bits-ui';

	let {
		src,
		alt,
		fallback,
		ref = $bindable(null),
		imageRef = $bindable(null),
		fallbackRef = $bindable(null),
		...restProps
	}: WithoutChildrenOrChild<Avatar.RootProps> & {
		src: string;
		alt: string;
		fallback: string;
		imageRef?: HTMLImageElement | null;
		fallbackRef?: HTMLElement | null;
	} = $props();
</script>

<Avatar.Root {...restProps} class={cn('overflow-clip rounded', restProps.class)} bind:ref>
	<Avatar.Image {src} {alt} bind:ref={imageRef} />
	<Avatar.Fallback bind:ref={fallbackRef}>
		{fallback}
	</Avatar.Fallback>
</Avatar.Root>
