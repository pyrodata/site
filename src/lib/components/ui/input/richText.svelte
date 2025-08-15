<script lang="ts">
	import hugerte, { type Editor } from 'hugerte';
	import { onMount } from 'svelte';

	type Props = {
		ref: HTMLDivElement;
		editor?: Editor;
	};

	let { ref = $bindable(), editor = $bindable() }: Props = $props();

	onMount(async () => {
		if (!ref) {
			return;
		}

		editor = await hugerte.init({
			selector: '#editor'
		});
	});
</script>

<div id="editor"></div>
