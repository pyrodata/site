<script lang="ts">
	import { getAssetUrl } from '$lib/utils';

	const { data } = $props();
</script>

<div class="grid flex-1 grid-cols-[1fr_260px]">
	<div class="mx-auto max-w-3xl p-12">
		<h1 class="text-3xl font-bold">{data.chemical.title}</h1>
		<div class="mt-2 flex items-center gap-1">
			<span class="rounded bg-accent px-3 py-1 text-xs font-medium text-gray-600">
				{data.chemical.formula}
			</span>
			<span class="rounded bg-accent px-3 py-1 text-xs font-medium text-gray-600">
				{data.chemical.casNumber}
			</span>
			{#each data.chemical.categories as category}
				<span class="rounded bg-primary-500 px-3 py-1 text-xs font-medium text-white">
					{category.name}
				</span>
			{/each}
		</div>
		<div class="prose mt-6 max-w-full">
			{@html data.chemical.description}
		</div>
	</div>
	<div class="border-l border-muted bg-gray-50">
		<div class="p-2">
			<img
				src={getAssetUrl(data.chemical.collectionId, data.chemical.id, data.chemical.thumbnail)}
				alt={data.chemical.title}
				class="h-auto w-full rounded-lg"
			/>
		</div>
	</div>
</div>
