<script lang="ts">
	import { cn } from '$lib/utils';
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRight';
	import Input from '$lib/components/ui/input/input.svelte';

	import '$lib/assets/fonts/bitcount/style.css';
	import '$lib/assets/fonts/georgia/style.css';
	import '$lib/assets/fonts/cheltenham/style.css';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex h-screen flex-col">
	<header class="border-b border-muted bg-gray-900" id="header">
		<div class="container mx-auto grid grid-cols-[240px_1fr]">
			<a
				href="/"
				class="flex h-15 items-center border-r border-gray-700 font-bitcount text-2xl font-semibold text-white hover:text-primary-300"
			>
				Pyrodata
			</a>
		</div>
	</header>
	<div class="flex flex-1 flex-col">
		<div class="container mx-auto grid flex-1 grid-cols-[240px_1fr]">
			<aside class="border-r border-muted">
				<nav
					class={cn('my-4 flex flex-col gap-2 [&_li]:list-none', '[&_ul]:ml-4 [&_ul]:list-disc')}
				>
					<li>
						<a href="/chemicals">Chemicals</a>
						<ul>
							<li><a href="/chemicals/binders">Binders</a></li>
							<li><a href="/chemicals/fuels">Fuels</a></li>
							<li><a href="/chemicals/metals">Metals</a></li>
						</ul>
					</li>
					<li>
						<a href="/compositions">Compositions</a>
					</li>
					<li>
						<a href="/definitions">Definitions</a>
					</li>
					<li>
						<a href="/tutorials">Tutorials</a>
					</li>
				</nav>
			</aside>
			<main class="flex flex-1 flex-col">
				{@render children?.()}
			</main>
		</div>
	</div>
</div>

<!-- <div class="container mx-auto">
	<div class="grid h-screen grid-cols-[300px_1fr]">
		<aside class="flex flex-col gap-4 border-r border-muted">
			<div class="border-b border-muted">
				<a
					href="/"
					class="block bg-gray-50 text-center font-bitcount text-5xl transition-colors hover:bg-gray-800"
				>
					Pyrodata
				</a>
			</div>
			<nav
				class={cn(
					'flex flex-col gap-1 [&_li]:list-none [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-2 [&_li_a]:px-3 [&_li_a]:py-2',
					'[&_li_a]:hover:bg-gray-100 [&_li_a]:hover:text-blue-500'
				)}
			>
				<li>
					<a href="/chemicals"> <CaretRightIcon /> Chemicals</a>
				</li>
				<li>
					<a href="/compositions"> <CaretRightIcon /> Compositions</a>
				</li>
				<li>
					<a href="/definitions"> <CaretRightIcon /> Definitions</a>
				</li>
				<li>
					<a href="/tutorials"> <CaretRightIcon /> Tutorials</a>
				</li>
			</nav>
		</aside>
		<main>
			<header class="border-b border-muted bg-gray-50 p-4">
				<Input placeholder="Search something ..." />
			</header>
			{@render children?.()}
		</main>
	</div>
</div> -->
