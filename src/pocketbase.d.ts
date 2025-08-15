/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	ChemicalCategories = "chemical_categories",
	Chemicals = "chemicals",
	CompositionCategories = "composition_categories",
	Hazards = "hazards",
	UserRanks = "user_ranks",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type ChemicalCategoriesRecord = {
	colorCode?: string
	created?: IsoDateString
	description?: string
	id: string
	name: string
	slug: string
	updated?: IsoDateString
}

export type ChemicalsRecord<Tproperties = unknown> = {
	author: RecordIdString
	casNumber?: string
	categories?: RecordIdString[]
	created?: IsoDateString
	description?: HTMLString
	formula: string
	hazards?: RecordIdString[]
	id: string
	properties?: null | Tproperties
	slug: string
	thumbnail?: string
	title: string
	updated?: IsoDateString
}

export type CompositionCategoriesRecord = {
	created?: IsoDateString
	description?: string
	examples?: string
	id: string
	label: string
	name: string
	updated?: IsoDateString
}

export type HazardsRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	image: string
	slug: string
	title: string
	updated?: IsoDateString
}

export type UserRanksRecord<Tscopes = unknown> = {
	color?: string
	created?: IsoDateString
	description: HTMLString
	elo: number
	id: string
	name: string
	scopes?: null | Tscopes
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	elo?: number
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	rank?: RecordIdString
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ChemicalCategoriesResponse<Texpand = unknown> = Required<ChemicalCategoriesRecord> & BaseSystemFields<Texpand>
export type ChemicalsResponse<Tproperties = unknown, Texpand = unknown> = Required<ChemicalsRecord<Tproperties>> & BaseSystemFields<Texpand>
export type CompositionCategoriesResponse<Texpand = unknown> = Required<CompositionCategoriesRecord> & BaseSystemFields<Texpand>
export type HazardsResponse<Texpand = unknown> = Required<HazardsRecord> & BaseSystemFields<Texpand>
export type UserRanksResponse<Tscopes = unknown, Texpand = unknown> = Required<UserRanksRecord<Tscopes>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	chemical_categories: ChemicalCategoriesRecord
	chemicals: ChemicalsRecord
	composition_categories: CompositionCategoriesRecord
	hazards: HazardsRecord
	user_ranks: UserRanksRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	chemical_categories: ChemicalCategoriesResponse
	chemicals: ChemicalsResponse
	composition_categories: CompositionCategoriesResponse
	hazards: HazardsResponse
	user_ranks: UserRanksResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'chemical_categories'): RecordService<ChemicalCategoriesResponse>
	collection(idOrName: 'chemicals'): RecordService<ChemicalsResponse>
	collection(idOrName: 'composition_categories'): RecordService<CompositionCategoriesResponse>
	collection(idOrName: 'hazards'): RecordService<HazardsResponse>
	collection(idOrName: 'user_ranks'): RecordService<UserRanksResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
