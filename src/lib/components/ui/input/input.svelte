<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		value = $bindable(''),
		type = 'text',
		placeholder = '',
		invalid = false,
		...restProps
	} = $props();
</script>

<input
	class={cn('w-full focus:outline-none', restProps.class)}
	{type}
	{placeholder}
	aria-invalid={invalid ? 'true' : undefined}
	bind:value
	{...restProps}
/>
