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
	class={cn(
		'border border-gray-200 bg-white px-4 py-1.5 transition-colors focus:outline-none',
		restProps.class
	)}
	{type}
	{placeholder}
	aria-invalid={invalid ? 'true' : undefined}
	bind:value
	{...restProps}
/>
