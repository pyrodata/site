<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>, M = any">
	import type { FormPath } from 'sveltekit-superforms';
	import {
		Field,
		Control,
		Description,
		FieldErrors,
		type FsSuperForm,
		type FieldProps,
		type ControlAttrs,
		type DescriptionProps,
		Label
	} from 'formsnap';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type FormFieldProps = {
		form: FsSuperForm<T, U>;
		child: Snippet<
			[
				{
					props: ControlAttrs;
				}
			]
		>;
		description?: Snippet;
		label: string;
	} & FieldProps<T, U, M>;

	let { form, child, description, label, ...restProps }: FormFieldProps = $props();
</script>

<Field {form} {...restProps}>
	<Control>
		{#snippet children({ props })}
			<div
				class={cn(
					'rounded bg-slate-100 p-4 transition-colors',
					'has-[input:focus]:bg-slate-200 has-[input:focus]:[&_label]:text-black'
				)}
			>
				<Label class="font-sans font-medium text-slate-500 transition-colors">{label}</Label>
				{@render child({ props })}
			</div>
		{/snippet}
	</Control>
	{#if description}
		<Description>{@render description()}</Description>
	{/if}
	<FieldErrors />
</Field>
