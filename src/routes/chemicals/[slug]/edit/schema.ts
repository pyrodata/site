import { z } from 'zod';

export const schema = z.object({
	title: z.string().min(1),
	description: z.string().min(100),
	formula: z.string().min(1)
});
