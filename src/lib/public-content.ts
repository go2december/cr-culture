import type { GalleryItemLike, MediaLike } from './media'

export type PublicNewsType = 'general' | 'video' | 'document'
export type PublicActivityLevel = 'province' | 'district'
export type PublicHeritageCategory = 'all' | 'intangible-heritage' | 'learning-resources' | 'local-wisdom'
export type PublicAwardMainPillar = 'cultural-contributor' | 'outstanding-cultural-achievement'
export interface PublicWisdomCategory {
    id: string | number
    title: string
    slug: string
    description?: string | null
}

export interface PublicYouthAwardCategory {
    id: string | number
    title: string
    slug: string
    description?: string | null
}

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

export interface PublicAwardYear {
    id: string | number
    buddhistYear: number
    announcementDate?: string | null
    ceremonyDate?: string | null
    location?: string | null
    presidentName?: string | null
}

export interface PublicAwardCategory {
    id: string | number
    mainPillar: PublicAwardMainPillar
    subType: string
}

export interface PublicKhonDeeAward {
    id: string | number
    prefix?: string | null
    fullName: string
    currentPosition?: string | null
    profileImage?: MediaLike
    contributionTitle: string
    contributionDetailHtml?: string | null
    impactArea?: string | null
    year?: PublicAwardYear | null
    category?: PublicAwardCategory | null
}

export interface PublicInstitution {
    id: string | number
    institutionName: string
    district?: string | null
    profileImage?: MediaLike
}

export interface PublicAwardee {
    id: string | number
    prefix?: string | null
    fullName: string
    gradeLevel?: string | null
    avatarImage?: MediaLike
    institution?: PublicInstitution | null
}

export interface PublicAwardGallery {
    id: string | number
    image?: MediaLike
    caption?: string | null
    isHighlight?: boolean | null
    year?: PublicAwardYear | null
}

export interface PublicYouthAwardHistory {
    id: string | number
    projectTitle: string
    projectSummary?: string | null
    videoUrl?: string | null
    coverImage?: MediaLike
    institution?: PublicInstitution | null
    year?: PublicAwardYear | null
    category?: PublicYouthAwardCategory | null
    awardees: PublicAwardee[]
}

export interface PublicWisdomAward {
    id: string | number
    prefix?: string | null
    fullName: string
    avatarImage?: MediaLike
    year?: PublicAwardYear | null
    wisdomCategory?: PublicWisdomCategory | null
    contributionDetailHtml?: string | null
}
