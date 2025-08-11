import { error } from '@sveltejs/kit';

export const load = async ({ locals, params, url }) => {
	const chemical = await locals.services.chemicals().getChemicalBySlug(params.slug);

	if (chemical.isErr()) {
		return error(404, chemical.error);
	}

	return {
		chemical: chemical.value
	};
};
