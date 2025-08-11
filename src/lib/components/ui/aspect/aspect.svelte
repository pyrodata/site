<script lang="ts">
	import { AspectRatio, type WithoutChildrenOrChild } from 'bits-ui';

	let {
		src,
		alt,
		ref = $bindable(null),
		imageRef = $bindable(null),
		...restProps
	}: WithoutChildrenOrChild<AspectRatio.RootProps> & {
		src: string;
		alt: string;
		imageRef?: HTMLImageElement | null;
	} = $props();
</script>

<AspectRatio.Root {...restProps} bind:ref>
	<img {src} {alt} bind:this={imageRef} class="h-full w-full rounded object-cover" />
</AspectRatio.Root>
