<script lang="ts">
	import type { Snippet } from 'svelte';

	type EditorToolbarButtonGroupProps = {
		children: Snippet;
	};

	let { children }: EditorToolbarButtonGroupProps = $props();
</script>

<div class="flex gap-[3px] border-r border-neutral-200 p-[3px]">
	{@render children()}
</div>
