import type { GalleryItemLike, MediaLike } from './media'
import { resolveMediaUrl } from './media'
import type { PublicActivity, PublicHeritage, PublicNews, PublicTag, PublicDistrictRef } from './public-content'
import type { PublicBoardMember, PublicDistrictChairman, PublicDistrictMember, PublicDistrictSummary } from './public-organization'

export type RawPayloadRef = {
    id?: string | number | null
    name?: string | null
    slug?: string | null
} | string | number | null | undefined

export type RawBoardPosition = {
    title?: string | null
    level?: number | null
} | RawPayloadRef

export interface RawDistrictSummary extends PublicDistrictSummary {
    image?: MediaLike
    coverImage?: MediaLike
}

export interface RawBoardMember {
    id: string | number
    name: string
    position?: RawBoardPosition
    positionOrder?: number | null
    image?: MediaLike
    bio?: string | null
    phone?: string | null
    email?: string | null
    isActive?: boolean | null
}

export interface RawDistrictMember {
    id: string | number
    name: string
    position?: RawBoardPosition
    positionOrder?: number | null
    district?: RawPayloadRef
    image?: MediaLike
    phone?: string | null
    isActive?: boolean | null
}

export interface RawActivity {
    id: string | number
    slug?: string | null
    title: string
    date: string
    endDate?: string | null
    level: PublicActivity['level']
    location?: string | null
    district?: RawPayloadRef
    districtName?: string | null
    excerpt?: string | null
    summary?: string | null
    content_html?: string | null
    coverImage?: MediaLike
    gallery?: GalleryItemLike[] | null
}

export interface RawNews {
    id: string | number
    slug?: string | null
    title: string
    type: PublicNews['type']
    date?: string | null
    publishedAt?: string | null
    createdAt?: string | null
    summary?: string | null
    excerpt?: string | null
    content_html?: string | null
    coverImage?: MediaLike
    gallery?: GalleryItemLike[] | null
}

export interface RawHeritage {
    id: string | number
    slug?: string | null
    title: string
    category: PublicHeritage['category']
    excerpt?: string | null
    content_html?: string | null
    author?: string | null
    createdAt?: string | null
    coverImage?: MediaLike
    gallery?: GalleryItemLike[] | null
    tags?: Array<string | PublicTag> | null
    relatedDistrict?: RawPayloadRef
    district?: RawPayloadRef
}

export interface RawTag {
    id: string | number
    name: string
    slug: string
}

const toStringId = (value: unknown): string | undefined => {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value)
    }

    return undefined
}

const normalizeRelationRef = (value: RawPayloadRef): PublicDistrictRef | null => {
    if (!value) {
        return null
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return { id: String(value) }
    }

    return {
        id: toStringId(value.id),
        name: typeof value.name === 'string' ? value.name : undefined,
        slug: typeof value.slug === 'string' ? value.slug : undefined,
    }
}

const normalizeTitle = (value: RawBoardPosition): string | null => {
    if (!value) {
        return null
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return String(value)
    }

    if ('title' in value && typeof value.title === 'string') {
        return value.title
    }

    if ('name' in value && typeof value.name === 'string') {
        return value.name
    }

    return null
}

const normalizeLevel = (value: RawBoardPosition): number | null => {
    if (!value || typeof value === 'string' || typeof value === 'number') {
        return null
    }

    if ('level' in value && typeof value.level === 'number') {
        return value.level
    }

    return null
}

const normalizeGallery = (gallery?: GalleryItemLike[] | null): GalleryItemLike[] => {
    return (gallery || []).filter(Boolean)
}

const normalizeTags = (tags?: Array<string | PublicTag> | null): Array<string | PublicTag> => {
    return (tags || []).filter(Boolean)
}

const normalizeDistrictName = (name?: string | null) => {
    return name?.replace(/^อำเภอ/, '') || '-'
}

export const mapDistrictSummary = (doc: RawDistrictSummary): PublicDistrictSummary => ({
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    code: doc.code ?? null,
    description: doc.description ?? null,
    latitude: doc.latitude ?? null,
    longitude: doc.longitude ?? null,
    address: doc.address ?? null,
    phoneNumber: doc.phoneNumber ?? null,
    email: doc.email ?? null,
    facebook: doc.facebook ?? null,
})

export const mapBoardMember = (doc: RawBoardMember): PublicBoardMember => ({
    name: doc.name,
    position: normalizeTitle(doc.position) || 'กรรมการ',
    positionLevel: normalizeLevel(doc.position) || 99,
    order: doc.positionOrder || 99,
    image: resolveMediaUrl(doc.image),
})

export const mapDistrictMember = (doc: RawDistrictMember): PublicDistrictMember => ({
    name: doc.name,
    position: normalizeTitle(doc.position) || 'กรรมการ',
    order: doc.positionOrder || 99,
    image: doc.image,
    phone: doc.phone ?? null,
    isActive: doc.isActive ?? null,
})

export const mapDistrictChairman = (doc: RawDistrictMember): PublicDistrictChairman => {
    const district = normalizeRelationRef(doc.district)
    const districtName = normalizeDistrictName(district?.name)

    return {
        name: doc.name,
        position: `ประธานสภาวัฒนธรรมอำเภอ${districtName}`,
        districtName: district?.name || '-',
        districtSlug: district?.slug || '#',
        image: resolveMediaUrl(doc.image),
    }
}

export const mapActivity = (doc: RawActivity): PublicActivity => ({
    id: doc.id,
    slug: doc.slug ?? null,
    title: doc.title,
    date: doc.date,
    endDate: doc.endDate ?? null,
    level: doc.level,
    location: doc.location ?? null,
    district: normalizeRelationRef(doc.district),
    districtName: doc.districtName ?? normalizeRelationRef(doc.district)?.name ?? null,
    excerpt: doc.excerpt ?? null,
    summary: doc.summary ?? null,
    content_html: doc.content_html ?? null,
    coverImage: doc.coverImage,
    gallery: normalizeGallery(doc.gallery),
})

export const mapNews = (doc: RawNews): PublicNews => ({
    id: doc.id,
    slug: doc.slug ?? null,
    title: doc.title,
    type: doc.type,
    date: doc.date ?? doc.publishedAt ?? null,
    createdAt: doc.createdAt ?? null,
    summary: doc.summary ?? null,
    excerpt: doc.excerpt ?? null,
    content_html: doc.content_html ?? null,
    coverImage: doc.coverImage,
    gallery: normalizeGallery(doc.gallery),
})

export const mapHeritage = (doc: RawHeritage): PublicHeritage => ({
    id: doc.id,
    slug: doc.slug ?? null,
    title: doc.title,
    category: doc.category,
    excerpt: doc.excerpt ?? null,
    content_html: doc.content_html ?? null,
    author: doc.author ?? null,
    createdAt: doc.createdAt || new Date().toISOString(),
    coverImage: doc.coverImage,
    gallery: normalizeGallery(doc.gallery),
    tags: normalizeTags(doc.tags),
    district: normalizeRelationRef(doc.relatedDistrict || doc.district),
})

export const mapTag = (doc: RawTag): PublicTag => ({
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
})
