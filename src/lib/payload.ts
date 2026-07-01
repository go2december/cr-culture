import { getPayload } from 'payload'
import config from '@/payload.config'
import { cache } from 'react'
import type { MediaLike } from './media'
import type { PublicActivity, PublicAwardCategory, PublicAwardGallery, PublicAwardYear, PublicAwardee, PublicHeritage, PublicInstitution, PublicKhonDeeAward, PublicNews, PublicTag, PublicYouthAwardHistory, PublicYouthAwardCategory, PublicWisdomAward, PublicWisdomCategory } from './public-content'
import type { PublicBoardMember, PublicDistrictChairman, PublicDistrictMember, PublicDistrictSummary } from './public-organization'
import {
  mapActivity,
  mapAwardCategory,
  mapAwardGallery,
  mapAwardee,
  mapAwardYear,
  mapBoardMember,
  mapDistrictChairman,
  mapDistrictMember,
  mapDistrictSummary,
  mapHeritage,
  mapInstitution,
  mapKhonDeeAward,
  mapNews,
  mapTag,
  mapYouthAwardHistory,
  mapYouthAwardCategory,
  mapWisdomCategory,
  mapWisdomAward,
  type RawActivity,
  type RawAwardCategory,
  type RawAwardGallery,
  type RawAwardee,
  type RawAwardYear,
  type RawBoardMember,
  type RawDistrictMember,
  type RawDistrictSummary,
  type RawHeritage,
  type RawInstitution,
  type RawKhonDeeAward,
  type RawNews,
  type RawTag,
  type RawYouthAwardHistory,
  type RawYouthAwardCategory,
  type RawWisdomCategory,
  type RawWisdomAward,
} from './payload-mappers'

// ดึงอินสแตนซ์ของ Payload API (Singleton Pattern สำหรับเรียกใช้หลายที่)
export const getPayloadClient = cache(async () => {
  return await getPayload({ config })
})

type FindResponse<T> = {
  docs: T[]
  totalDocs?: number
  totalPages?: number
  page?: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number | null
  prevPage?: number | null
}

type QueryWhere = Record<string, unknown>

type CollectionSlug = 'provincial-board' | 'districts' | 'district-members' | 'activities' | 'heritage-blog' | 'tags' | 'news' | 'award-years' | 'award-categories' | 'khon-dee-awards' | 'institutions' | 'awardees' | 'youth-award-histories' | 'award-galleries' | 'wisdom-categories' | 'wisdom-awards' | 'youth-award-categories'

type GlobalSlug = 'about-page' | 'page-heroes'

export interface PublicAboutPage {
  vision?: string | null
  missions?: Array<{ text?: string | null }>
  historyPlain?: string | null
}

export interface PageHeroContent {
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  heroImage?: MediaLike
}

export interface PageHeroesGlobal {
  home?: PageHeroContent
  activities?: PageHeroContent
  activitiesCalendar?: PageHeroContent
  about?: PageHeroContent
  aboutBoard?: PageHeroContent
  news?: PageHeroContent
  heritage?: PageHeroContent
  khonDee?: PageHeroContent
  youthCulture?: PageHeroContent
  wisdomAwards?: PageHeroContent
  districts?: PageHeroContent
  contact?: PageHeroContent
}

const mergeWhere = (...parts: Array<QueryWhere | undefined>) => {
  const merged = Object.assign({}, ...parts.filter(Boolean))
  return Object.keys(merged).length > 0 ? merged : undefined
}

async function findDocs<T>(collection: CollectionSlug, options: {
  where?: QueryWhere
  limit?: number
  page?: number
  sort?: string
  depth?: number
} = {}): Promise<FindResponse<T>> {
  const payload = await getPayloadClient()
  const response = await payload.find({
    collection,
    ...(options.where ? { where: options.where } : {}),
    ...(options.limit !== undefined ? { limit: options.limit } : {}),
    ...(options.page !== undefined ? { page: options.page } : {}),
    ...(options.sort ? { sort: options.sort } : {}),
    ...(options.depth !== undefined ? { depth: options.depth } : {}),
  } as Parameters<typeof payload.find>[0])

  return response as unknown as FindResponse<T>
}

async function findOne<T>(collection: CollectionSlug, where: QueryWhere, depth = 0): Promise<T | null> {
  const response = await findDocs<T>(collection, {
    where,
    limit: 1,
    depth,
  })

  return response.docs[0] || null
}

async function findMappedDocs<Raw, Public>(collection: CollectionSlug, options: {
  where?: QueryWhere
  limit?: number
  page?: number
  sort?: string
  depth?: number
} = {}, mapDoc: (doc: Raw) => Public): Promise<FindResponse<Public>> {
  const response = await findDocs<Raw>(collection, options)

  return {
    ...response,
    docs: response.docs.map(mapDoc),
  }
}

async function findMappedOne<Raw, Public>(collection: CollectionSlug, where: QueryWhere, depth: number, mapDoc: (doc: Raw) => Public): Promise<Public | null> {
  const response = await findOne<Raw>(collection, where, depth)

  return response ? mapDoc(response) : null
}

async function findGlobal<T>(slug: GlobalSlug, depth = 0): Promise<T> {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug,
    depth,
  }) as T
}

// === Utility Data Fetching Functions ===

/**
 * ดึงข้อมูลสมาชิกสภาวัฒนธรรมจังหวัด (Provincial Board) ทั้งหมด
 */
export const getProvincialBoard = cache(async () => {
  const response = await findMappedDocs<RawBoardMember, PublicBoardMember>('provincial-board', {
    limit: 100,
    sort: 'order',
    depth: 2,
  }, mapBoardMember)
  return response.docs
})

/**
 * ดึงข้อมูลรายชื่อทั้ง 18 อำเภอ (Districts)
 */
export const getDistricts = cache(async () => {
  const response = await findMappedDocs<RawDistrictSummary, PublicDistrictSummary>('districts', {
    limit: 100,
    sort: 'code',
    depth: 1,
  }, mapDistrictSummary)
  return response.docs
})

/**
 * ดึงข้อมูลอำเภอแบบเจาะจงด้วย slug
 */
export const getDistrictBySlug = cache(async (slug: string) => {
  return await findMappedOne<RawDistrictSummary, PublicDistrictSummary>('districts', {
    slug: {
      equals: slug,
    },
  }, 1, mapDistrictSummary)
})

/**
 * ดึงกรรมการชุดอำเภอแบบเจาะจงอำเภอ
 */
export const getDistrictMembers = cache(async (districtId: string) => {
  const response = await findMappedDocs<RawDistrictMember, PublicDistrictMember>('district-members', {
    where: {
      district: {
        equals: districtId,
      },
    },
    limit: 100,
    sort: 'order',
    depth: 2,
  }, mapDistrictMember)
  return response.docs
})

/**
 * ดึงกิจกรรมทั้งหมด (สามารถกรองตามระดับจังหวัด/อำเภอได้)
 */
export const getActivities = cache(async (options?: { level?: 'province' | 'district', districtId?: string, limit?: number, page?: number }) => {
  return await findMappedDocs<RawActivity, PublicActivity>('activities', {
    where: mergeWhere(
      options?.level ? { level: { equals: options.level } } : undefined,
      options?.districtId ? { district: { equals: options.districtId } } : undefined,
    ),
    limit: options?.limit || 6,
    page: options?.page || 1,
    sort: '-date',
    depth: 1,
  }, mapActivity)
})

/**
 * ดึงกิจกรรมทั้งหมดที่มีรูปภาพแกลเลอรี
 */
export const getActivitiesWithGallery = cache(async (limit = 100) => {
  const response = await findMappedDocs<RawActivity, PublicActivity>('activities', {
    where: {
      isPublished: { equals: true },
    },
    limit,
    sort: '-date',
    depth: 1,
  }, mapActivity)
  
  return {
    ...response,
    docs: response.docs.filter((item) => item.gallery && item.gallery.length > 0)
  }
})


/**
 * ดึงกิจกรรมจาก slug
 */
export const getActivityBySlug = cache(async (slug: string) => {
  return await findMappedOne<RawActivity, PublicActivity>('activities', {
    slug: {
      equals: slug,
    },
  }, 1, mapActivity)
})

/**
 * ดึงบทความมรดกภูมิปัญญา
 */
export const getHeritageBlogs = cache(async (options?: {
  category?: string,
  tagSlug?: string,
  search?: string,
  limit?: number,
  page?: number
}) => {
  let tagId: string | null = null

  if (options?.tagSlug) {
    const tag = await findMappedOne<RawTag, PublicTag>('tags', {
      slug: {
        equals: options.tagSlug,
      },
    }, 0, mapTag)

    tagId = tag ? String(tag.id) : null
  }

  const response = await findMappedDocs<RawHeritage, PublicHeritage>('heritage-blog', {
    where: mergeWhere(
      options?.category ? { category: { equals: options.category } } : undefined,
      tagId ? { tags: { equals: tagId } } : undefined,
    ),
    limit: options?.limit || 12,
    page: options?.page || 1,
    sort: '-createdAt',
    depth: 1,
  }, mapHeritage)

  if (options?.search) {
    const searchKeyword = options.search.toLowerCase().trim()
    response.docs = response.docs.filter((doc) => {
      const title = doc.title?.toLowerCase() || ''
      const excerpt = doc.excerpt?.toLowerCase() || ''
      const content = JSON.stringify((doc as { content?: unknown }).content || '').toLowerCase()
      return title.includes(searchKeyword) || excerpt.includes(searchKeyword) || content.includes(searchKeyword)
    })
    response.totalDocs = response.docs.length
  }

  return response
})

/**
 * ดึงแท็กทั้งหมด
 */
export const getTags = cache(async () => {
  const response = await findMappedDocs<RawTag, PublicTag>('tags', {
    limit: 100,
    sort: 'name',
  }, mapTag)
  return response.docs
})

/**
 * ดึงบทความเดียวเจาะจง
 */
export const getHeritageBlogBySlug = cache(async (slug: string) => {
  return await findMappedOne<RawHeritage, PublicHeritage>('heritage-blog', {
    slug: {
      equals: slug,
    },
  }, 1, mapHeritage)
})

/**
 * ดึงข่าวสาร
 */
export const getNews = cache(async (options?: { type?: string, limit?: number, page?: number }) => {
  return await findMappedDocs<RawNews, PublicNews>('news', {
    where: mergeWhere(
      options?.type ? { type: { equals: options.type } } : undefined,
    ),
    limit: options?.limit || 12,
    page: options?.page || 1,
    sort: '-date',
    depth: 1,
  }, mapNews)
})

/**
 * ดึงข่าวสารเจาะจง
 */
export const getNewsBySlug = cache(async (slug: string) => {
  return await findMappedOne<RawNews, PublicNews>('news', {
    slug: {
      equals: slug,
    },
  }, 1, mapNews)
})

/**
 * ดึงข้อมูลหน้าเกี่ยวกับเรา (Global)
 */
export const getAboutPage = cache(async () => {
  return await findGlobal<PublicAboutPage>('about-page')
})

/**
 * ดึงค่าตั้งค่า hero ของหน้าเว็บหลัก
 */
export const getPageHeroes = cache(async () => {
  return await findGlobal<PageHeroesGlobal>('page-heroes', 1)
})

/**
 * ดึงประธานสภาวัฒนธรรมของแต่ละอำเภอ (positionOrder = 1 หรือ order ต่ำสุด)
 */
export const getDistrictChairmen = cache(async () => {
  const response = await findMappedDocs<RawDistrictMember, PublicDistrictChairman>('district-members', {
    where: {
      'position.level': { equals: 1 },
    },
    limit: 100,
    sort: 'positionOrder',
    depth: 2,
  }, mapDistrictChairman)
  return response.docs
})

export const getAwardYears = cache(async () => {
  const response = await findMappedDocs<RawAwardYear, PublicAwardYear>('award-years', {
    limit: 100,
    sort: '-buddhistYear',
  }, mapAwardYear)
  return response.docs
})

export const getAwardCategories = cache(async () => {
  const response = await findMappedDocs<RawAwardCategory, PublicAwardCategory>('award-categories', {
    limit: 100,
    sort: 'subType',
  }, mapAwardCategory)
  return response.docs
})

export const getYouthAwardCategories = cache(async () => {
  const response = await findMappedDocs<RawYouthAwardCategory, PublicYouthAwardCategory>('youth-award-categories', {
    limit: 100,
    sort: 'title',
  }, mapYouthAwardCategory)
  return response.docs
})

export const getKhonDeeAwards = cache(async (options?: {
  year?: string
  categoryId?: string
  search?: string
  limit?: number
}) => {
  let yearId: string | null = null

  if (options?.year) {
    const matchedYear = await findOne<RawAwardYear>('award-years', {
      buddhistYear: {
        equals: Number(options.year),
      },
    })

    yearId = matchedYear ? String(matchedYear.id) : null
  }

  const response = await findMappedDocs<RawKhonDeeAward, PublicKhonDeeAward>('khon-dee-awards', {
    where: mergeWhere(
      { isPublished: { equals: true } },
      yearId ? { year: { equals: yearId } } : undefined,
      options?.categoryId ? { category: { equals: options.categoryId } } : undefined,
    ),
    limit: options?.limit || 200,
    sort: '-createdAt',
    depth: 2,
  }, mapKhonDeeAward)

  if (options?.search) {
    const searchKeyword = options.search.toLowerCase().trim()
    response.docs = response.docs.filter((doc) => {
      const fullName = doc.fullName.toLowerCase()
      const currentPosition = doc.currentPosition?.toLowerCase() || ''
      const contributionTitle = doc.contributionTitle.toLowerCase()
      const contributionTitlesMatch = doc.contributionTitles?.some(title => title.toLowerCase().includes(searchKeyword)) || false
      return fullName.includes(searchKeyword) || currentPosition.includes(searchKeyword) || contributionTitle.includes(searchKeyword) || contributionTitlesMatch
    })
    response.totalDocs = response.docs.length
  }

  return response
})

export const getKhonDeeAwardById = cache(async (id: string) => {
  return await findMappedOne<RawKhonDeeAward, PublicKhonDeeAward>('khon-dee-awards', {
    id: {
      equals: id,
    },
  }, 2, mapKhonDeeAward)
})

export const getInstitutions = cache(async () => {
  const response = await findMappedDocs<RawInstitution, PublicInstitution>('institutions', {
    limit: 200,
    sort: 'institutionName',
  }, mapInstitution)
  return response.docs
})

export const getAwardees = cache(async (options?: { institutionId?: string }) => {
  const response = await findMappedDocs<RawAwardee, PublicAwardee>('awardees', {
    where: mergeWhere(
      { isPublished: { equals: true } },
      options?.institutionId ? { institution: { equals: options.institutionId } } : undefined,
    ),
    limit: 500,
    sort: 'fullName',
    depth: 1,
  }, mapAwardee)
  return response.docs
})

export const getYouthAwardHistories = cache(async (options?: {
  year?: string
  categoryId?: string
  q?: string
  limit?: number
}) => {
  let yearId: string | null = null

  if (options?.year) {
    const matchedYear = await findOne<RawAwardYear>('award-years', {
      buddhistYear: {
        equals: Number(options.year),
      },
    })

    yearId = matchedYear ? String(matchedYear.id) : null
  }

  const response = await findMappedDocs<RawYouthAwardHistory, PublicYouthAwardHistory>('youth-award-histories', {
    where: mergeWhere(
      { isPublished: { equals: true } },
      yearId ? { year: { equals: yearId } } : undefined,
      options?.categoryId ? { category: { equals: options.categoryId } } : undefined,
    ),
    limit: options?.limit || 200,
    sort: '-createdAt',
    depth: 2,
  }, mapYouthAwardHistory)

  if (options?.q) {
    const keyword = options.q.toLowerCase().trim()
    response.docs = response.docs.filter((doc) => {
      const projectTitle = doc.projectTitle.toLowerCase()
      const projectSummary = doc.projectSummary?.toLowerCase() || ''
      const institutionName = doc.institution?.institutionName.toLowerCase() || ''
      const awardeeNames = doc.awardees.map((awardee) => awardee.fullName.toLowerCase()).join(' ')
      return projectTitle.includes(keyword) || projectSummary.includes(keyword) || institutionName.includes(keyword) || awardeeNames.includes(keyword)
    })
    response.totalDocs = response.docs.length
  }

  return response
})

export const getYouthAwardHistoryById = cache(async (id: string) => {
  return await findMappedOne<RawYouthAwardHistory, PublicYouthAwardHistory>('youth-award-histories', {
    id: {
      equals: id,
    },
  }, 2, mapYouthAwardHistory)
})

export const getAwardGalleries = cache(async (options?: {
  year?: string
  highlightsOnly?: boolean
  limit?: number
}) => {
  let yearId: string | null = null

  if (options?.year) {
    const matchedYear = await findOne<RawAwardYear>('award-years', {
      buddhistYear: {
        equals: Number(options.year),
      },
    })

    yearId = matchedYear ? String(matchedYear.id) : null
  }

  const response = await findMappedDocs<RawAwardGallery, PublicAwardGallery>('award-galleries', {
    where: mergeWhere(
      yearId ? { year: { equals: yearId } } : undefined,
      options?.highlightsOnly ? { isHighlight: { equals: true } } : undefined,
    ),
    limit: options?.limit || 100,
    sort: '-createdAt',
    depth: 1,
  }, mapAwardGallery)

  return response.docs
})

export const getWisdomCategories = cache(async () => {
  const response = await findMappedDocs<RawWisdomCategory, PublicWisdomCategory>('wisdom-categories', {
    limit: 200,
    sort: 'title',
    depth: 0,
  }, mapWisdomCategory)

  return response.docs
})

export const getWisdomAwards = cache(async (options?: {
  year?: string
  category?: string
  q?: string
  limit?: number
}) => {
  let yearId: string | null = null
  let categoryId: string | null = null

  if (options?.year) {
    const matchedYear = await findOne<RawAwardYear>('award-years', {
      buddhistYear: {
        equals: Number(options.year),
      },
    })

    yearId = matchedYear ? String(matchedYear.id) : null
  }

  if (options?.category) {
    const matchedCategory = await findOne<RawWisdomCategory>('wisdom-categories', {
      slug: {
        equals: options.category,
      },
    })

    categoryId = matchedCategory ? String(matchedCategory.id) : null
  }

  const response = await findMappedDocs<RawWisdomAward, PublicWisdomAward>('wisdom-awards', {
    where: mergeWhere(
      { isPublished: { equals: true } },
      yearId ? { year: { equals: yearId } } : undefined,
      categoryId ? { wisdomCategory: { equals: categoryId } } : undefined,
    ),
    limit: options?.limit || 200,
    sort: '-createdAt',
    depth: 1,
  }, mapWisdomAward)

  if (options?.q) {
    const keyword = options.q.toLowerCase().trim()
    response.docs = response.docs.filter((doc) => {
      const fullName = doc.fullName.toLowerCase()
      const detail = doc.contributionDetailHtml?.toLowerCase() || ''
      return fullName.includes(keyword) || detail.includes(keyword)
    })
    response.totalDocs = response.docs.length
  }

  return response
})

export const getWisdomAwardById = cache(async (id: string) => {
  return await findMappedOne<RawWisdomAward, PublicWisdomAward>('wisdom-awards', {
    id: {
      equals: id,
    },
  }, 1, mapWisdomAward)
})
