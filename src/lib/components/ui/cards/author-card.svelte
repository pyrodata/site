<script lang="ts">
	import type { UserRanksResponse, UsersResponse } from '$pocketbase';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, getAssetUrl, getInitials, toFormula } from '$lib/utils';
	import { Avatar } from '$lib/components/ui/avatar';

	type AuthorCardProps = {
		author: UsersResponse<{ rank: UserRanksResponse }>;
	} & HTMLAttributes<HTMLDivElement>;

	const { author, ...restProps }: AuthorCardProps = $props();
</script>

<div
	{...restProps}
	class={cn(
		'flex items-center gap-2 rounded-md bg-primary-100/50 p-2 pe-4 text-sm',
		restProps.class
	)}
>
	<span>
		<Avatar
			src={getAssetUrl(author.collectionId, author.id, author.avatar, '100x100')}
			fallback={getInitials(author.name)}
			alt={author.name}
			class="h-12 w-12"
		/>
	</span>
	<span class="flex flex-col gap-1">
		<a href="/users/{author.id}">{author.name}</a>
		<span class="flex items-center gap-3">
			<span class="flex items-center gap-1">
				{#if author.elo > 1}
					<span class="h-2 w-2 rounded-full bg-yellow-700"></span>
				{/if}
				{#if author.elo >= 1200}
					<span class="h-2 w-2 rounded-full bg-gray-200"></span>
				{/if}
				{#if author.elo >= 1800}
					<span class="h-2 w-2 rounded-full bg-yellow-400"></span>
				{/if}
				<span class="text-xs text-gray-400">{author.expand.rank.elo}</span>
			</span>
			<span class="text-xs text-gray-400" style="color: {author.expand.rank.color}">
				{author.expand.rank.name}
			</span>
		</span>
	</span>
</div>
