import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load = async ({ parent }) => {
	const { chemical } = await parent();

	return {
		form: await superValidate(
			zod(schema, {
				defaults: {
					title: chemical.title,
					description: chemical.description,
					formula: chemical.formula
				}
			})
		)
	};
};
