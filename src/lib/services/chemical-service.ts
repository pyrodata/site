import type {
	ChemicalsResponse,
	HazardsResponse,
	ChemicalsRecord,
	ChemicalCategoriesResponse,
	UsersResponse,
	UserRanksResponse
} from '$pocketbase';
import { ServiceBase } from './service-base';
import { fromPromise, ResultAsync } from 'neverthrow';

export type ChemicalExpand = {
	hazards: HazardsResponse[];
	categories: ChemicalCategoriesResponse[];
	author: UsersResponse<{ rank: UserRanksResponse }>;
};

export type ChemicalFilters = {
	search?: string;
	hazardIds?: string[];
	limit?: number;
	page?: number;
	sortBy?: 'title' | 'casNumber' | 'created' | 'updated';
	sortOrder?: 'asc' | 'desc';
};

export type CreateChemicalData = Omit<ChemicalsRecord, 'id' | 'created' | 'updated'>;
export type UpdateChemicalData = Partial<Omit<ChemicalsRecord, 'id' | 'created' | 'updated'>>;

// Error constants
export const CHEMICAL_ERRORS = {
	GET_ALL_FAILED: {
		type: 'GET_ALL_CHEMICALS_ERROR' as const,
		message: 'Failed to fetch chemicals'
	},
	GET_BY_ID_FAILED: {
		type: 'GET_CHEMICAL_BY_ID_ERROR' as const,
		message: 'Failed to fetch chemical by ID'
	},
	GET_BY_SLUG_FAILED: {
		type: 'GET_CHEMICAL_BY_SLUG_ERROR' as const,
		message: 'Failed to fetch chemical by slug'
	},
	CREATE_FAILED: {
		type: 'CREATE_CHEMICAL_ERROR' as const,
		message: 'Failed to create chemical'
	},
	UPDATE_FAILED: {
		type: 'UPDATE_CHEMICAL_ERROR' as const,
		message: 'Failed to update chemical'
	},
	DELETE_FAILED: {
		type: 'DELETE_CHEMICAL_ERROR' as const,
		message: 'Failed to delete chemical'
	}
} as const;

export class ChemicalsService extends ServiceBase {
	private readonly COLLECTION_NAME = 'chemicals';
	private readonly DEFAULT_EXPAND = 'hazards,categories,author,author.rank';

	/**
	 * Get all chemicals with optional filtering and pagination
	 */
	getAllChemicals(filters: ChemicalFilters = {}) {
		const queryParams = this.buildQueryParams(filters);

		return fromPromise(
			this.services.pb
				.collection<ChemicalsResponse<Record<string, any>, ChemicalExpand>>(this.COLLECTION_NAME)
				.getList(filters.page || 1, filters.limit || 50, {
					expand: this.DEFAULT_EXPAND,
					...queryParams
				}),
			() => CHEMICAL_ERRORS.GET_ALL_FAILED
		).map((result) => ({
			...result,
			items: result.items.map(this.transformChemicalResponse)
		}));
	}

	/**
	 * Get all chemicals without pagination (for exports, etc.)
	 */
	getAllChemicalsComplete(filters: Omit<ChemicalFilters, 'limit' | 'page'> = {}) {
		const queryParams = this.buildQueryParams(filters);

		return fromPromise(
			this.services.pb
				.collection<ChemicalsResponse<Record<string, any>, ChemicalExpand>>(this.COLLECTION_NAME)
				.getFullList({
					expand: this.DEFAULT_EXPAND,
					...queryParams
				}),
			() => CHEMICAL_ERRORS.GET_ALL_FAILED
		).map((chemicals) => chemicals.map(this.transformChemicalResponse));
	}

	/**
	 * Get a chemical by ID
	 */
	getChemicalById(id: string) {
		return fromPromise(
			this.services.pb
				.collection<ChemicalsResponse<Record<string, any>, ChemicalExpand>>(this.COLLECTION_NAME)
				.getOne(id, {
					expand: this.DEFAULT_EXPAND
				}),
			() => CHEMICAL_ERRORS.GET_BY_ID_FAILED
		).map(this.transformChemicalResponse);
	}

	/**
	 * Get a chemical by slug
	 */
	getChemicalBySlug(slug: string) {
		return fromPromise(
			this.services.pb
				.collection<ChemicalsResponse<Record<string, any>, ChemicalExpand>>(this.COLLECTION_NAME)
				.getFirstListItem(`slug="${slug}"`, {
					expand: this.DEFAULT_EXPAND
				}),
			() => CHEMICAL_ERRORS.GET_BY_SLUG_FAILED
		).map(this.transformChemicalResponse);
	}

	/**
	 * Create a new chemical
	 */
	createChemical(data: CreateChemicalData) {
		return fromPromise(this.services.pb.collection(this.COLLECTION_NAME).create(data), (e) => {
			console.error('Error creating chemical:', e);
			return CHEMICAL_ERRORS.CREATE_FAILED;
		});
	}

	/**
	 * Update an existing chemical
	 */
	updateChemical(id: string, data: UpdateChemicalData) {
		return fromPromise(
			this.services.pb.collection(this.COLLECTION_NAME).update(id, data),
			() => CHEMICAL_ERRORS.UPDATE_FAILED
		);
	}

	/**
	 * Delete a chemical
	 */
	deleteChemical(id: string) {
		return fromPromise(
			this.services.pb.collection(this.COLLECTION_NAME).delete(id),
			() => CHEMICAL_ERRORS.DELETE_FAILED
		);
	}

	/**
	 * Search chemicals by title, formula, or CAS number
	 */
	searchChemicals(query: string, limit = 20) {
		const searchFilter = `title ~ "${query}" || formula ~ "${query}" || casNumber ~ "${query}"`;

		return fromPromise(
			this.services.pb
				.collection<ChemicalsResponse<Record<string, any>, ChemicalExpand>>(this.COLLECTION_NAME)
				.getList(1, limit, {
					filter: searchFilter,
					expand: this.DEFAULT_EXPAND,
					sort: 'title'
				}),
			() => CHEMICAL_ERRORS.GET_ALL_FAILED
		).map((result) => ({
			...result,
			items: result.items.map(this.transformChemicalResponse)
		}));
	}

	/**
	 * Get chemicals by hazard IDs
	 */
	getChemicalsByHazards(hazardIds: string[], limit = 50) {
		const hazardFilter = hazardIds.map((id) => `hazards ~ "${id}"`).join(' || ');

		return fromPromise(
			this.services.pb
				.collection<ChemicalsResponse<Record<string, any>, ChemicalExpand>>(this.COLLECTION_NAME)
				.getList(1, limit, {
					filter: hazardFilter,
					expand: this.DEFAULT_EXPAND,
					sort: 'title'
				}),
			() => CHEMICAL_ERRORS.GET_ALL_FAILED
		).map((result) => ({
			...result,
			items: result.items.map(this.transformChemicalResponse)
		}));
	}

	/**
	 * Transform chemical response to include hazards at top level
	 */
	private transformChemicalResponse = (
		chemical: ChemicalsResponse<Record<string, any>, ChemicalExpand>
	) => ({
		...chemical,
		hazards: chemical.expand?.hazards || [],
		categories: chemical.expand?.categories || [],
		author: chemical.expand?.author || null
	});

	/**
	 * Build query parameters for filtering and sorting
	 */
	private buildQueryParams(filters: ChemicalFilters) {
		const params: Record<string, any> = {};

		// Build filter string
		const filterParts: string[] = [];

		if (filters.search) {
			filterParts.push(
				`title ~ "${filters.search}" || formula ~ "${filters.search}" || casNumber ~ "${filters.search}"`
			);
		}

		if (filters.hazardIds && filters.hazardIds.length > 0) {
			const hazardFilter = filters.hazardIds.map((id) => `hazards ~ "${id}"`).join(' || ');
			filterParts.push(`(${hazardFilter})`);
		}

		if (filterParts.length > 0) {
			params.filter = filterParts.join(' && ');
		}

		// Build sort string
		if (filters.sortBy) {
			const sortOrder = filters.sortOrder === 'desc' ? '-' : '';
			params.sort = `${sortOrder}${filters.sortBy}`;
		}

		return params;
	}
}
