import type { GalleryItemLike, MediaLike } from './media'

export interface PublicDistrictSummary {
    id: string | number
    name: string
    slug: string
    code?: string | null
    description?: string | null
    latitude?: number | null
    longitude?: number | null
    address?: string | null
    phoneNumber?: string | null
    email?: string | null
    facebook?: string | null
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
    districtSlug?: string | null
    sourceType?: 'manual' | 'district' | null
    district?: {
        id?: string | number | null
        slug?: string | null
        name?: string | null
    } | null
}

export interface PublicDistrictChairman {
    name: string
    position: string
    districtName: string
    districtSlug: string
    districtCode?: string | null
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