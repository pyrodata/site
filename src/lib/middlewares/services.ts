import { Services } from '$lib/services';
import type { Handle } from '@sveltejs/kit';

export const services: Handle = async ({ event, resolve }) => {
	event.locals.services = new Services(event.locals.pb);

	return resolve(event);
};
