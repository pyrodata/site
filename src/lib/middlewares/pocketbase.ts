import type { Handle } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import Pocketbase from 'pocketbase';
import { POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD } from '$env/static/private';

export const pocketbase: Handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
	event.locals.pb.autoCancellation(false);
	await event.locals.pb
		.collection('_superusers')
		.authWithPassword(POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD);

	return resolve(event);
};
