import type { GalleryItemLike, MediaLike } from './media'
import { resolveMediaUrl } from './media'
import { richTextToHtml } from './richtext'
import type {
    PublicActivity,
    PublicAwardCategory,
    PublicAwardYear,
    PublicAwardee,
    PublicHeritage,
    PublicInstitution,
    PublicKhonDeeAward,
    PublicNews,
    PublicTag,
    PublicYouthAwardHistory,
    PublicYouthAwardCategory,
    PublicWisdomAward,
    PublicWisdomCategory,
    PublicDistrictRef,
} from './public-content'
import type { PublicBoardMember, PublicDistrictChairman, PublicDistrictMember, PublicDistrictSummary } from './public-organization'

const mapPrefix = (prefix: unknown): string | null => {
    if (prefix && typeof prefix === 'object' && 'title' in prefix) {
        return (prefix as { title: string }).title
    }
    return null
}

export interface RawPrefix {
    id: string | number
    title: string
}

export type RawPayloadRef = {
    id?: string | number | null
    name?: string | null
    slug?: string | null
    code?: string | null
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
    sourceType?: 'manual' | 'district' | null
    district?: RawPayloadRef
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
    content?: unknown
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
    content?: unknown
    coverImage?: MediaLike
    gallery?: GalleryItemLike[] | null
}

export interface RawHeritage {
    id: string | number
    slug?: string | null
    title: string
    category: PublicHeritage['category']
    excerpt?: string | null
    content?: unknown
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

export interface RawAwardYear {
    id: string | number
    buddhistYear: number
    announcementDate?: string | null
    ceremonyDate?: string | null
    location?: string | null
    presidentName?: string | null
}

export interface RawAwardCategory {
    id: string | number
    mainPillar: PublicAwardCategory['mainPillar']
    subType: string
}

export interface RawYouthAwardCategory {
    id: string | number
    title: string
    slug: string
    description?: string | null
}

export interface RawWisdomCategory {
    id: string | number
    title: string
    slug: string
    description?: string | null
}

export interface RawKhonDeeAward {
    id: string | number
    prefix?: string | number | RawPrefix | null
    fullName: string
    currentPosition?: string | null
    profileImage?: MediaLike
    contributionTitle?: string | Array<{ title?: string | null } | null> | null
    contributionDetail?: unknown
    impactArea?: string | null
    year?: RawAwardYear | string | number | null
    category?: RawAwardCategory | string | number | null
    isPublished?: boolean | null
}

export interface RawInstitution {
    id: string | number
    institutionName: string
    district?: string | null
    profileImage?: MediaLike
}

export interface RawAwardee {
    id: string | number
    prefix?: string | number | RawPrefix | null
    fullName: string
    gradeLevel?: string | null
    avatarImage?: MediaLike
    institution?: RawInstitution | string | number | null
    isPublished?: boolean | null
}


export interface RawYouthAwardHistory {
    id: string | number
    projectTitle: string
    projectSummary?: string | null
    videoUrl?: string | null
    coverImage?: MediaLike
    institution?: RawInstitution | string | number | null
    year?: RawAwardYear | string | number | null
    category?: RawYouthAwardCategory | string | number | null
    awardees?: Array<RawAwardee | string | number> | null
    isPublished?: boolean | null
}

export interface RawWisdomAward {
    id: string | number
    prefix?: string | number | RawPrefix | null
    fullName: string
    avatarImage?: MediaLike
    year?: RawAwardYear | string | number | null
    wisdomCategory?: RawWisdomCategory | string | number | null
    contributionDetail?: unknown
    isPublished?: boolean | null
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
        code: typeof value === 'object' && value && 'code' in value && typeof value.code === 'string' ? value.code : undefined,
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

const normalizeGallery = (gallery?: unknown[] | null): GalleryItemLike[] => {
    if (!gallery) return []
    return gallery.filter(Boolean).map((item) => {
        if (typeof item === 'string' || typeof item === 'number') {
            return {
                image: { url: null } as unknown as MediaLike,
                caption: null,
            }
        }
        if (typeof item === 'object' && item !== null) {
            if (!('image' in item)) {
                return {
                    image: item as MediaLike,
                    caption: null,
                }
            }
            const typedItem = item as { image: MediaLike | string | number | null; caption?: string | null }
            return {
                image: (typeof typedItem.image === 'string' || typeof typedItem.image === 'number') 
                    ? ({ url: null } as unknown as MediaLike) 
                    : typedItem.image,
                caption: typedItem.caption ?? null,
            }
        }
        return {
            image: null,
            caption: null,
        }
    })
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
    sourceType: doc.sourceType || 'manual',
    district: normalizeRelationRef(doc.district),
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
        position: `ประธานสภาวัฒนธรรมประจำอำเภอ${districtName}`,
        districtName: district?.name || '-',
        districtSlug: district?.slug || '#',
        districtCode: district?.code || null,
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
    content_html: richTextToHtml(doc.content) ?? null,
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
    content_html: richTextToHtml(doc.content) ?? null,
    coverImage: doc.coverImage,
    gallery: normalizeGallery(doc.gallery),
})

export const mapHeritage = (doc: RawHeritage): PublicHeritage => ({
    id: doc.id,
    slug: doc.slug ?? null,
    title: doc.title,
    category: doc.category,
    excerpt: doc.excerpt ?? null,
    content_html: richTextToHtml(doc.content) ?? null,
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

export const mapAwardYear = (doc: RawAwardYear): PublicAwardYear => ({
    id: doc.id,
    buddhistYear: doc.buddhistYear,
    announcementDate: doc.announcementDate ?? null,
    ceremonyDate: doc.ceremonyDate ?? null,
    location: doc.location ?? null,
    presidentName: doc.presidentName ?? null,
})

export const mapAwardCategory = (doc: RawAwardCategory): PublicAwardCategory => ({
    id: doc.id,
    mainPillar: doc.mainPillar,
    subType: doc.subType,
})

export const mapYouthAwardCategory = (doc: RawYouthAwardCategory): PublicYouthAwardCategory => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description ?? null,
})

export const mapWisdomCategory = (doc: RawWisdomCategory): PublicWisdomCategory => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description ?? null,
})

export const mapKhonDeeAward = (doc: RawKhonDeeAward): PublicKhonDeeAward => {
    let titles: string[] = []
    if (Array.isArray(doc.contributionTitle)) {
        titles = doc.contributionTitle
            .map((item) => (item && typeof item === 'object' && 'title' in item) ? String(item.title) : '')
            .filter(Boolean)
    } else if (typeof doc.contributionTitle === 'string' && doc.contributionTitle) {
        titles = [doc.contributionTitle]
    }

    const mainTitle = titles[0] || ''

    return {
        id: doc.id,
        prefix: mapPrefix(doc.prefix),
        fullName: doc.fullName,
        currentPosition: doc.currentPosition ?? null,
        profileImage: doc.profileImage,
        contributionTitle: mainTitle,
        contributionTitles: titles,
        contributionDetailHtml: richTextToHtml(doc.contributionDetail),
        impactArea: doc.impactArea ?? null,
        year: doc.year && typeof doc.year === 'object' && 'buddhistYear' in doc.year ? mapAwardYear(doc.year as RawAwardYear) : null,
        category: doc.category && typeof doc.category === 'object' && 'subType' in doc.category ? mapAwardCategory(doc.category as RawAwardCategory) : null,
    }
}

export const mapInstitution = (doc: RawInstitution): PublicInstitution => ({
    id: doc.id,
    institutionName: doc.institutionName,
    district: doc.district ?? null,
    profileImage: doc.profileImage,
})

export const mapAwardee = (doc: RawAwardee): PublicAwardee => ({
    id: doc.id,
    prefix: mapPrefix(doc.prefix),
    fullName: doc.fullName,
    gradeLevel: doc.gradeLevel ?? null,
    avatarImage: doc.avatarImage,
    institution: doc.institution && typeof doc.institution === 'object' && 'institutionName' in doc.institution
        ? mapInstitution(doc.institution as RawInstitution)
        : null,
})


export const mapYouthAwardHistory = (doc: RawYouthAwardHistory): PublicYouthAwardHistory => ({
    id: doc.id,
    projectTitle: doc.projectTitle,
    projectSummary: doc.projectSummary ?? null,
    videoUrl: doc.videoUrl ?? null,
    coverImage: doc.coverImage,
    institution: doc.institution && typeof doc.institution === 'object' && 'institutionName' in doc.institution
        ? mapInstitution(doc.institution as RawInstitution)
        : null,
    year: doc.year && typeof doc.year === 'object' && 'buddhistYear' in doc.year ? mapAwardYear(doc.year as RawAwardYear) : null,
    category: doc.category && typeof doc.category === 'object' && 'title' in doc.category ? mapYouthAwardCategory(doc.category as RawYouthAwardCategory) : null,
    awardees: (doc.awardees || [])
        .filter((awardee): awardee is RawAwardee => Boolean(awardee) && typeof awardee === 'object' && 'fullName' in awardee)
        .map(mapAwardee),
})

export const mapWisdomAward = (doc: RawWisdomAward): PublicWisdomAward => ({
    id: doc.id,
    prefix: mapPrefix(doc.prefix),
    fullName: doc.fullName,
    avatarImage: doc.avatarImage,
    year: doc.year && typeof doc.year === 'object' && 'buddhistYear' in doc.year ? mapAwardYear(doc.year as RawAwardYear) : null,
    wisdomCategory: doc.wisdomCategory && typeof doc.wisdomCategory === 'object' && 'title' in doc.wisdomCategory
        ? mapWisdomCategory(doc.wisdomCategory as RawWisdomCategory)
        : null,
    contributionDetailHtml: richTextToHtml(doc.contributionDetail),
})
