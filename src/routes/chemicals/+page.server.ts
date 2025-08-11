export const load = async ({ locals, url }) => {
	// Get query parameters for filtering
	const search = url.searchParams.get('search') || undefined;
	const hazardIds = url.searchParams.getAll('hazard') || undefined;
	const sortBy = (url.searchParams.get('sort') as any) || 'title';
	const sortOrder = (url.searchParams.get('order') as any) || 'asc';

	const filters = {
		search,
		hazardIds,
		sortBy,
		sortOrder,
		limit: 50
	};

	const chemicals = await locals.services.chemicals().getAllChemicals(filters);

	if (chemicals.isErr()) {
		throw new Error(chemicals.error.message);
	}

	return {
		chemicals: chemicals.value.items,
		totalCount: chemicals.value.totalItems,
		page: chemicals.value.page,
		filters: { search, hazardIds, sortBy, sortOrder }
	};
};
