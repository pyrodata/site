import { pocketbase } from '$lib/middlewares/pocketbase';
import { services } from '$lib/middlewares/services';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(pocketbase, services);
