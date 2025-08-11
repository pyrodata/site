import type { Handle } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import Pocketbase from 'pocketbase';

export const pocketbase: Handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
	event.locals.pb.autoCancellation(false);

	return resolve(event);
};
