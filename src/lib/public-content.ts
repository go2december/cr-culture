import type { GalleryItemLike, MediaLike } from './media'

export type PublicNewsType = 'general' | 'video' | 'document'
export type PublicActivityLevel = 'province' | 'district'
export type PublicHeritageCategory = 'all' | 'intangible-heritage' | 'learning-resources' | 'local-wisdom'

export interface PublicDistrict {
    id: string | number
    name: string
    slug?: string | null
}

export interface PublicDistrictRef {
    id?: string | null
    name?: string | null
    slug?: string | null
}

export interface PublicTag {
    id: string | number
    name: string
    slug: string
}

export interface PublicActivity {
    id: string | number
    slug?: string | null
    title: string
    date: string
    endDate?: string | null
    level: PublicActivityLevel
    location?: string | null
    district?: PublicDistrictRef | null
    districtName?: string | null
    excerpt?: string | null
    summary?: string | null
    content_html?: string | null
    coverImage?: MediaLike
    gallery?: GalleryItemLike[]
}

export interface PublicNews {
    id: string | number
    slug?: string | null
    title: string
    type: PublicNewsType
    date?: string | null
    createdAt?: string | null
    summary?: string | null
    excerpt?: string | null
    content_html?: string | null
    coverImage?: MediaLike
    gallery?: GalleryItemLike[]
}

export interface PublicHeritage {
    id: string | number
    slug?: string | null
    title: string
    category: Exclude<PublicHeritageCategory, 'all'>
    excerpt?: string | null
    content_html?: string | null
    author?: string | null
    createdAt: string
    coverImage?: MediaLike
    gallery?: GalleryItemLike[]
    tags?: Array<string | PublicTag>
    district?: PublicDistrictRef | null
}