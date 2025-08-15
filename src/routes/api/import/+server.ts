import { json } from '@sveltejs/kit';
import slugify from 'slugify';
import chemicals from '$lib/assets/chemicals-ai-generated.json';

export const GET = async ({ locals }) => {
	for await (const chemical of chemicals) {
		const response = await locals.services.chemicals().createChemical({
			author: 'oywm0k8brqjfl9h',
			formula: chemical.formula,
			title: chemical.title,
			slug: slugify(chemical.title, { lower: true }),
			description: chemical.description,
			casNumber: chemical.casNumber,
			properties: {
				synonyms: chemical.synonyms,
				...chemical.properties
			}
		});

		if (response.isErr()) {
			console.error('Error inserting:', chemical.title, response);
		} else {
			console.log('Inserted:', chemical.title);
		}
	}

	return json(chemicals);
};
