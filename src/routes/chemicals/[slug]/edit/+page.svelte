<script lang="ts">
	import { AuthorCard } from '$lib/components/ui/cards';
	import { Editor } from '$lib/components/ui/editor/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import RichText from '$lib/components/ui/input/richText.svelte';
	import { TagList, TagListItem } from '$lib/components/ui/list';
	import TagListDivider from '$lib/components/ui/list/tag-list-divider.svelte';
	import { getAssetUrlWithFallback, toFormula } from '$lib/utils';
	import { format } from 'date-fns';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';
	import { FormField } from '$lib/components/ui/form';
	import { Label } from 'formsnap';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<div class="grid flex-1 grid-cols-[1fr_300px]">
	<form class="container mx-auto p-12" method="POST" use:enhance>
		<FormField {form} name="title" label="Title">
			{#snippet child({ props })}
				<Input {...props} bind:value={$formData.title} />
			{/snippet}
		</FormField>
	</form>
	<article>
		<header class="border-b border-muted bg-gray-50 px-12 py-8">
			<h1 class="text-3xl font-bold">{data.chemical.title}</h1>
			<div class="mt-2 flex items-center gap-1">
				<TagList>
					<TagListItem>{@html toFormula(data.chemical.formula)}</TagListItem>
					<TagListItem>{data.chemical.casNumber}</TagListItem>
					{#each data.chemical.categories as category, index}
						<TagListItem variant="primary">{category.name}</TagListItem>
					{/each}
				</TagList>
			</div>
			<div class="mt-6 flex items-center gap-6">
				<span class="text-xs text-muted">
					Created, {format(new Date(data.chemical.created), 'MMMM dd, yyyy')}
				</span>
				<span class="text-xs text-muted">
					Last updated, {format(new Date(data.chemical.updated), 'MMMM dd, yyyy')}
				</span>
				<span class="text-xs text-muted"> Viewed, 30 times</span>
			</div>
		</header>
		<div class="p-4">
			<Editor value={data.chemical.description} />
		</div>
		<footer class="flex items-start border-t border-muted bg-gray-50 px-12 py-8">
			<span class="flex items-center gap-4 text-sm [&>a]:text-gray-500">
				<a href="#">Share</a>
				<a href={`/chemicals/${data.chemical.slug}/edit`}>Edit</a>
				<a href="#">Flag</a>
			</span>
			<AuthorCard author={data.chemical.author} class="ms-auto" />
		</footer>
	</article>
	<aside class="flex flex-col gap-4 border-l border-muted">
		<section class="p-2">
			<img
				src={getAssetUrlWithFallback(
					data.chemical.collectionId,
					data.chemical.id,
					data.chemical.thumbnail
				)}
				alt={data.chemical.title}
				class="h-auto w-full rounded-lg"
			/>
		</section>
		<section class="m-2">
			<h4 class="mb-2 px-4 text-lg font-bold">Properties</h4>
		</section>
	</aside>
</div>
