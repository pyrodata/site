<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect';
	import { getAssetUrlWithFallback } from '$lib/utils';

	let { data } = $props();

	console.log(data);
</script>

<div>
	<div class="border-b border-muted bg-gray-50/50 p-12">
		<h1 class="text-4xl font-bold">Chemicals</h1>
	</div>
	<div class="grid grid-cols-5 gap-2 p-12">
		{#each data.chemicals as chemical}
			<a
				class="overflow-hidden rounded-lg border border-muted p-[4px]"
				href={`/chemicals/${chemical.slug}`}
			>
				<div class="flex flex-col gap-4 rounded-md bg-gray-100">
					<div class="p-[4px]">
						<AspectRatio
							ratio={16 / 9}
							src={getAssetUrlWithFallback(chemical.collectionId, chemical.id, chemical.thumbnail)}
							alt={chemical.title}
						/>
					</div>
					<div class="px-4">
						<h4 class="truncate font-semibold">{chemical.title}</h4>
						<span class="flex items-center gap-1">
							<small class="w-16 truncate font-medium text-gray-400">{chemical.formula}</small>
							<small class="w-16 truncate font-medium text-gray-400">{chemical.casNumber}</small>
						</span>
					</div>
					<div class="flex gap-1 px-4 pb-4">
						{#each chemical.hazards as hazard}
							<img
								class="h-7 w-7"
								src={getAssetUrlWithFallback(hazard.collectionId, hazard.id, hazard.image)}
								alt={hazard.title}
							/>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
