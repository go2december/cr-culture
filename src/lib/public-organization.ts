import type { GalleryItemLike, MediaLike } from './media'

export interface PublicDistrictSummary {
    id: string | number
    name: string
    slug: string
    description?: string | null
}

export interface PublicDistrictContact {
    address: string
    phone: string
    email: string
}

export interface PublicDistrictMember {
    name: string
    position: string
    order: number
    image: MediaLike
    phone?: string | null
    isActive?: boolean | null
}

export interface PublicBoardMember {
    name: string
    position: string
    positionLevel: number
    order: number
    image: string | null
}

export interface PublicDistrictChairman {
    name: string
    position: string
    districtName: string
    districtSlug: string
    image: string | null
}

export interface PublicCalendarActivity {
    id: string | number
    title: string
    slug?: string | null
    date: string
    level: 'province' | 'district'
    location?: string | null
    coverImage?: MediaLike
    gallery?: GalleryItemLike[]
    district?: { name?: string | null } | null
}