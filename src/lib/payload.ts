import { getPayload } from 'payload'
import config from '@/payload.config'
import { cache } from 'react'

// ดึงอินสแตนซ์ของ Payload API (Singleton Pattern สำหร้บเรียกใช้หลายที่)
export const getPayloadClient = cache(async () => {
  return await getPayload({ config })
})

// === Utility Data Fetching Functions ===

/**
 * ดึงข้อมูลสมาชิกสภาวัฒนธรรมจังหวัด (Provincial Board) ทั้งหมด
 */
export const getProvincialBoard = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'provincial-board', // ใช้ชื่อ collection ให้ตรงกับ payload-types.ts หรือในไฟล์ Collection นิยามเอาไว้
    limit: 100,
    sort: 'order', // เรียงตามลำดับความสำคัญ
  })
  return docs
})

/**
 * ดึงข้อมูลรายชื่อทั้ง 18 อำเภอ (Districts)
 */
export const getDistricts = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'districts',
    limit: 100,
    sort: 'order',
  })
  return docs
})

/**
 * ดึงข้อมูลอำเภอแบบเจาะจงด้วย slug
 */
export const getDistrictBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'districts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return docs[0] || null
})

/**
 * ดึงกรรมการชุดอำเภอแบบเจาะจงอำเภอ
 */
export const getDistrictMembers = cache(async (districtId: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'district-members',
    where: {
      district: {
        equals: districtId,
      },
    },
    limit: 100,
    sort: 'order', // ถ้าไม่มีจะเรียงตาม id / createdAt
  })
  return docs
})

/**
 * ดึงกิจกรรมทั้งหมด (สามารถกรองตามระดับจังหวัด/อำเภอได้)
 */
export const getActivities = cache(async (options?: { level?: 'province' | 'district', districtId?: string, limit?: number }) => {
  const payload = await getPayloadClient()
  
  // สร้างเงื่อนไข Where แบบ Dynamic
  const where: any = {}
  if (options?.level) {
    where.level = { equals: options.level }
  }
  if (options?.districtId) {
    where.district = { equals: options.districtId }
  }

  const { docs } = await payload.find({
    collection: 'activities',
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: options?.limit || 20,
    sort: '-date', // เรียงจากล่าสุดไปเก่าสุด
    depth: 1, // ดึงข้อมูลลึก 1 ระดับเผื่อมีไฟล์รูปหรือ District แนบมาด้วย
  })
  
  return docs
})

/**
 * ดึงกิจกรรมจาก slug
 */
export const getActivityBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'activities',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })
  return docs[0] || null
})

/**
 * ดึงบทความมรดกภูมิปัญญา
 */
export const getHeritageBlogs = cache(async (options?: { category?: string, tagSlug?: string, limit?: number, page?: number }) => {
  const payload = await getPayloadClient()

  const where: any = {}
  if (options?.category) {
    where.category = { equals: options.category }
  }

  // ปล. ถ้าหา tag ด้วย tagSlug อาจจะต้องหา tag ID ก่อนแล้วค่อยนำมา query 
  // หรือใช้ join ค้นหาใน GraphQL/REST แต่ผ่าน local API เราจำลองตามนี้ไปก่อน

  const response = await payload.find({
    collection: 'heritage-blog',
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: options?.limit || 12,
    page: options?.page || 1,
    sort: '-createdAt', // บทความใหม่ล่าสุดขึ้นก่อน
    depth: 1,
  })
  
  return response
})

/**
 * ดึงบทความเดียวเจาะจง
 */
export const getHeritageBlogBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'heritage-blog',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })
  return docs[0] || null
})

/**
 * ดึงข่าวสาร
 */
export const getNews = cache(async (options?: { type?: string, limit?: number, page?: number }) => {
  const payload = await getPayloadClient()

  const where: any = {}
  if (options?.type) {
    where.type = { equals: options.type }
  }

  const response = await payload.find({
    collection: 'news',
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: options?.limit || 12,
    page: options?.page || 1,
    sort: '-date', // ข่าวล่าสุดขึ้นก่อน
    depth: 1,
  })
  
  return response
})

/**
 * ดึงข่าวสารเจาะจง
 */
export const getNewsBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })
  return docs[0] || null
})

/**
 * ดึงข้อมูลหน้าเกี่ยวกับเรา (Global)
 */
export const getAboutPage = cache(async () => {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({
    slug: 'about-page',
  })
  return data
})

/**
 * ดึงประธานสภาวัฒนธรรมของแต่ละอำเภอ (positionOrder = 1 หรือ order ต่ำสุด)
 */
export const getDistrictChairmen = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'district-members',
    where: {
      positionOrder: { equals: 1 },
    },
    limit: 100,
    sort: 'positionOrder',
    depth: 2, // ดึง district + position ลึก 2 ระดับ
  })
  return docs
})

