import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  const payload = await getPayload({ config })
  const createRichText = (text: string) => ({
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text,
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  })

  try {
    // ============================================================
    // 1. BoardPositions (ตำแหน่งคณะกรรมการจังหวัด)
    // ============================================================
    const positions = [
      { title: 'ประธานสภาวัฒนธรรมจังหวัด', level: 1 },
      { title: 'รองประธาน คนที่ 1', level: 2 },
      { title: 'รองประธาน คนที่ 2', level: 2 },
      { title: 'รองประธาน คนที่ 3', level: 2 },
      { title: 'รองประธาน คนที่ 4', level: 2 },
      { title: 'กรรมการฝ่ายธุรการและประสานงาน', level: 3 },
      { title: 'กรรมการ', level: 4 },
      { title: 'เลขานุการ', level: 5 },
    ]

    const positionIds: Record<string, string> = {}
    for (const pos of positions) {
      const existing = await payload.find({ collection: 'board-positions', where: { title: { equals: pos.title } }, limit: 1 })
      if (existing.docs.length > 0) {
        positionIds[pos.title] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({ collection: 'board-positions', data: pos })
        positionIds[pos.title] = String(created.id)
      }
    }

    // ============================================================
    // 2. DistrictBoardPositions (ตำแหน่งกรรมการอำเภอ)
    // ============================================================
    const distPositions = [
      { title: 'ประธานสภาวัฒนธรรมอำเภอ', level: 1 },
      { title: 'รองประธานสภาวัฒนธรรมอำเภอ', level: 2 },
      { title: 'กรรมการอำเภอ', level: 3 },
      { title: 'เลขานุการอำเภอ', level: 4 },
    ]

    const distPosIds: Record<string, string> = {}
    for (const pos of distPositions) {
      const existing = await payload.find({ collection: 'district-board-positions', where: { title: { equals: pos.title } }, limit: 1 })
      if (existing.docs.length > 0) {
        distPosIds[pos.title] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({ collection: 'district-board-positions', data: pos })
        distPosIds[pos.title] = String(created.id)
      }
    }

    // ============================================================
    // 3. ProvincialBoard (คณะกรรมการจังหวัด)
    // ============================================================
    const boardMembers = [
      { name: 'นายประสงค์ วัฒนธรรม', position: 'ประธานสภาวัฒนธรรมจังหวัด', positionOrder: 1 },
      { name: 'นางสาวสุภา รักษ์ล้านนา', position: 'รองประธาน คนที่ 1', positionOrder: 2 },
      { name: 'นายวิชัย พัฒนาวัฒน์', position: 'รองประธาน คนที่ 2', positionOrder: 3 },
      { name: 'นางมาลี ศรีวัฒนา', position: 'รองประธาน คนที่ 3', positionOrder: 4 },
      { name: 'นายกิตติพงศ์ ล้านนาศรี', position: 'รองประธาน คนที่ 4', positionOrder: 5 },
      { name: 'นายสมชาย ใจดี', position: 'กรรมการฝ่ายธุรการและประสานงาน', positionOrder: 6 },
      { name: 'นางราตรี ศิลป์ลานนา', position: 'กรรมการฝ่ายธุรการและประสานงาน', positionOrder: 7 },
      { name: 'นายพิทักษ์ มรดกไทย', position: 'กรรมการฝ่ายธุรการและประสานงาน', positionOrder: 8 },
      { name: 'นางสมศรี วัฒนาสกุล', position: 'กรรมการฝ่ายธุรการและประสานงาน', positionOrder: 9 },
      { name: 'นายธวัชชัย ประเพณีไทย', position: 'กรรมการ', positionOrder: 10 },
      { name: 'นางนภัส ล้านนาวัฒน์', position: 'เลขานุการ', positionOrder: 11 },
    ]

    for (const member of boardMembers) {
      const existingMember = await payload.find({
        collection: 'provincial-board',
        where: {
          name: {
            equals: member.name,
          },
        },
        limit: 1,
      })

      const memberData = {
        name: member.name,
        position: positionIds[member.position],
        positionOrder: member.positionOrder,
        isActive: true,
      }

      if (existingMember.docs.length > 0) {
        await payload.update({
          collection: 'provincial-board',
          id: String(existingMember.docs[0].id),
          data: memberData,
        })
      } else {
        await payload.create({
          collection: 'provincial-board',
          data: memberData,
        })
      }
    }

    // ============================================================
    // 4. Districts (18 อำเภอ)
    // ============================================================
    const districts = [
      { name: 'อำเภอเมืองเชียงราย', slug: 'muang-chiang-rai', code: '5701', description: 'อำเภอศูนย์กลางของจังหวัดเชียงราย เป็นแหล่งรวมศิลปวัฒนธรรมล้านนาที่สำคัญ', order: 1 },
      { name: 'อำเภอเชียงแสน', slug: 'chiang-saen', code: '5702', description: 'เมืองโบราณที่มีประวัติศาสตร์ยาวนานกว่า 800 ปี แหล่งท่องเที่ยวเชิงวัฒนธรรมริมแม่น้ำโขง', order: 2 },
      { name: 'อำเภอแม่สาย', slug: 'mae-sai', code: '5703', description: 'อำเภอเหนือสุดของประเทศไทย ชายแดนติดเมียนมา ศูนย์กลางการค้าชายแดน', order: 3 },
      { name: 'อำเภอเชียงของ', slug: 'chiang-khong', code: '5704', description: 'อำเภอริมแม่น้ำโขง ประตูสู่ สปป.ลาว ร่ำรวยวัฒนธรรมริมน้ำ', order: 4 },
      { name: 'อำเภอแม่จัน', slug: 'mae-chan', code: '5705', description: 'ดินแดนแห่งชาวเขาหลากหลายชาติพันธุ์ วัฒนธรรมบนดอยสูง', order: 5 },
      { name: 'อำเภอเทิง', slug: 'thoeng', code: '5706', description: 'อำเภอที่มีทัศนียภาพสวยงาม อุดมวัฒนธรรมเกษตรพื้นบ้าน', order: 6 },
      { name: 'อำเภอพาน', slug: 'phan', code: '5707', description: 'ศูนย์กลางเกษตรกรรม วัฒนธรรมชาวนาล้านนา', order: 7 },
      { name: 'อำเภอป่าแดด', slug: 'pa-daet', code: '5708', description: 'อำเภอเล็กๆ ที่อุดมด้วยวัฒนธรรมพื้นบ้านดั้งเดิม', order: 8 },
      { name: 'อำเภอแม่สรวย', slug: 'mae-suai', code: '5709', description: 'อำเภอบนเทือกเขา เชื่อมโยงวัฒนธรรมชนเผ่าและคนพื้นราบ', order: 9 },
      { name: 'อำเภอเวียงชัย', slug: 'wiang-chai', code: '5710', description: 'อำเภอที่อยู่ใกล้ตัวเมือง วัฒนธรรมเกษตรกรรมล้านนาแท้', order: 10 },
      { name: 'อำเภอเวียงป่าเป้า', slug: 'wiang-pa-pao', code: '5711', description: 'ดินแดนแห่งชาและกาแฟ วัฒนธรรมชาวดอยเมี่ยน-อาข่า', order: 11 },
      { name: 'อำเภอพญาเม็งราย', slug: 'phaya-mengrai', code: '5712', description: 'อำเภอตั้งชื่อตามพญามังราย ผู้สร้างอาณาจักรล้านนา', order: 12 },
      { name: 'อำเภอแม่ฟ้าหลวง', slug: 'mae-fa-luang', code: '5713', description: 'ดินแดนดอยตุง โครงการพระราชดำริ วัฒนธรรมชนเผ่าบนดอยสูง', order: 13 },
      { name: 'อำเภอแม่ลาว', slug: 'mae-lao', code: '5714', description: 'อำเภอริมแม่น้ำลาว วัฒนธรรมชาวน้ำล้านนาแท้ๆ', order: 14 },
      { name: 'อำเภอเวียงแก่น', slug: 'wiang-kaen', code: '5715', description: 'อำเภอชายแดนริมโขง วัฒนธรรมไทลื้อและภูไท', order: 15 },
      { name: 'อำเภอขุนตาล', slug: 'khun-tan', code: '5716', description: 'อำเภอภูเขาที่อุดมด้วยวัฒนธรรมชนเผ่า', order: 16 },
      { name: 'อำเภอดอยหลวง', slug: 'doi-luang', code: '5717', description: 'อำเภอบนดอย อากาศเย็นสบาย วัฒนธรรมเกษตรที่สูง', order: 17 },
      { name: 'อำเภอเวียงเชียงรุ้ง', slug: 'wiang-chiang-rung', code: '5718', description: 'อำเภอเวียงเชียงรุ้ง ดินแดนมรดกล้านนาที่ยังคงเสน่ห์ดั้งเดิม', order: 18 },
    ]

    const districtIds: Record<string, string> = {}
    for (const dist of districts) {
      const existing = await payload.find({ collection: 'districts', where: { slug: { equals: dist.slug } }, limit: 1 })
      if (existing.docs.length > 0) {
        districtIds[dist.slug] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({
          collection: 'districts',
          data: { ...dist, isActive: true },
        })
        districtIds[dist.slug] = String(created.id)
      }
    }

    // ============================================================
    // 5. DistrictMembers (ประธานแต่ละอำเภอ)
    // ============================================================
    const chairmanPosId = distPosIds['ประธานสภาวัฒนธรรมอำเภอ']
    const districtChairmen = [
      { name: 'นายสุริยันต์ แสงล้านนา', districtSlug: 'muang-chiang-rai' },
      { name: 'นายเกริกชัย โบราณศาสตร์', districtSlug: 'chiang-saen' },
      { name: 'นางสาวพิมพา ชายแดนทอง', districtSlug: 'mae-sai' },
      { name: 'นายวันชัย ริมโขงวัฒน์', districtSlug: 'chiang-khong' },
      { name: 'นายนิรันดร์ ชาติพันธุ์ดี', districtSlug: 'mae-chan' },
      { name: 'นางทัศนี เทิงวัฒนา', districtSlug: 'thoeng' },
      { name: 'นายประยุทธ พานนาดี', districtSlug: 'phan' },
      { name: 'นายบุญมี ป่าแดดศรี', districtSlug: 'pa-daet' },
      { name: 'นางจิราภรณ์ สรวยศิริ', districtSlug: 'mae-suai' },
      { name: 'นายสุทัศน์ เวียงชัยศรี', districtSlug: 'wiang-chai' },
      { name: 'นางวราภรณ์ ชาดอยป่าเป้า', districtSlug: 'wiang-pa-pao' },
      { name: 'นายเมธี เม็งรายวงศ์', districtSlug: 'phaya-mengrai' },
      { name: 'นางสาวดารณี ดอยตุงวนา', districtSlug: 'mae-fa-luang' },
      { name: 'นายสมบัติ ลาววัฒน์', districtSlug: 'mae-lao' },
      { name: 'นายอภิชาต โขงเจียม', districtSlug: 'wiang-kaen' },
      { name: 'นางมณี ขุนตาลนที', districtSlug: 'khun-tan' },
      { name: 'นายอนันต์ ดอยหลวงศรี', districtSlug: 'doi-luang' },
      { name: 'นายศิลป์ชัย เชียงรุ้งวัฒน์', districtSlug: 'wiang-chiang-rung' },
    ]

    const existingDistMembers = await payload.find({ collection: 'district-members', limit: 1 })
    if (existingDistMembers.docs.length === 0) {
      for (const chairman of districtChairmen) {
        const distId = districtIds[chairman.districtSlug]
        if (distId && chairmanPosId) {
          await payload.create({
            collection: 'district-members',
            data: {
              name: chairman.name,
              position: chairmanPosId,
              positionOrder: 1,
              district: distId,
              isActive: true,
            },
          })
        }
      }
    }

    // ============================================================
    // 6. Tags
    // ============================================================
    const tags = [
      { name: 'ผ้าทอ', slug: 'pha-tho' },
      { name: 'อาหาร', slug: 'ahan' },
      { name: 'ประเพณี', slug: 'prapheni' },
      { name: 'ศิลปะ', slug: 'sinlapa' },
      { name: 'สมุนไพร', slug: 'samunphrai' },
      { name: 'หัตถกรรม', slug: 'hatthakam' },
      { name: 'ดนตรีล้านนา', slug: 'dontri-lanna' },
      { name: 'ชาติพันธุ์', slug: 'chatphan' },
    ]
    const tagIds: Record<string, string> = {}
    for (const tag of tags) {
      const existing = await payload.find({ collection: 'tags', where: { name: { equals: tag.name } }, limit: 1 })
      if (existing.docs.length > 0) {
        tagIds[tag.name] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({ collection: 'tags', data: tag })
        tagIds[tag.name] = String(created.id)
      }
    }

    // ============================================================
    // 7. Activities (กิจกรรม)
    // ============================================================
    type SeedActivity = {
      title: string
      slug: string
      date: string
      endDate?: string
      level: 'province' | 'district'
      summary: string
      location: string
      isPublished: boolean
      isFeatured?: boolean
      districtSlug?: string
    }

    const activities: SeedActivity[] = [
      {
        title: 'งานสืบสานประเพณีสงกรานต์ล้านนา ปี 2569',
        slug: 'songkran-lanna-2569',
        date: '2026-04-13T00:00:00.000Z',
        endDate: '2026-04-15T00:00:00.000Z',
        level: 'province',
        summary: 'งานประเพณีสงกรานต์ล้านนาประจำปี 2569 สืบสานวัฒนธรรมปี๋ใหม่เมือง ขบวนแห่พระพุทธรูปสรงน้ำ การแสดงศิลปวัฒนธรรมล้านนา',
        location: 'ลานอนุสาวรีย์พญามังราย อ.เมืองเชียงราย',
        isPublished: true,
        isFeatured: true,
      },
      {
        title: 'โครงการสืบสานมรดกภูมิปัญญาท้องถิ่น ประจำปี 2569',
        slug: 'heritage-wisdom-2569',
        date: '2026-03-15T00:00:00.000Z',
        level: 'province',
        summary: 'สภาวัฒนธรรมจังหวัดเชียงรายจัดกิจกรรมส่งเสริมการเรียนรู้และถ่ายทอดภูมิปัญญาจากเครือข่ายศิลปินและปราชญ์ชาวบ้าน',
        location: 'อาคารเฉลิมพระเกียรติ จ.เชียงราย',
        isPublished: true,
        isFeatured: true,
      },
      {
        title: 'เทศกาลดนตรีพื้นเมืองล้านนา ครั้งที่ 5',
        slug: 'lanna-music-festival-5',
        date: '2026-02-20T00:00:00.000Z',
        endDate: '2026-02-22T00:00:00.000Z',
        level: 'province',
        summary: 'การประกวดดนตรีพื้นเมืองล้านนา สะล้อ ซอ ซึง ระดับจังหวัด มีผู้เข้าร่วมจากทุกอำเภอ',
        location: 'หอประชุมใหญ่ มหาวิทยาลัยราชภัฏเชียงราย',
        isPublished: true,
      },
      {
        title: 'ประชุมเครือข่ายสภาวัฒนธรรมอำเภอ ครั้งที่ 1/2569',
        slug: 'network-meeting-1-2569',
        date: '2026-01-25T00:00:00.000Z',
        level: 'province',
        summary: 'การประชุมประธานสภาวัฒนธรรมอำเภอทั้ง 18 อำเภอ เพื่อวางแผนงานวัฒนธรรมประจำปี 2569',
        location: 'ห้องประชุมศาลากลางจังหวัดเชียงราย ชั้น 3',
        isPublished: true,
      },
      {
        title: 'งานทำบุญเมืองเชียงแสน',
        slug: 'chiang-saen-merit-festival',
        date: '2026-03-01T00:00:00.000Z',
        level: 'district',
        summary: 'พิธีทำบุญเมืองเชียงแสนตามประเพณีโบราณ สืบสานตำนานเมืองเก่า 800 ปี',
        location: 'วัดพระธาตุจอมสัก อ.เชียงแสน',
        isPublished: true,
        districtSlug: 'chiang-saen',
      },
      {
        title: 'งานผ้าทอไทลื้อเวียงแก่น',
        slug: 'wiang-kaen-tai-lue-textile',
        date: '2026-02-10T00:00:00.000Z',
        endDate: '2026-02-12T00:00:00.000Z',
        level: 'district',
        summary: 'งานแสดงผ้าทอไทลื้อ สาธิตการทอผ้าแบบดั้งเดิม ตลาดวัฒนธรรม',
        location: 'ลานวัฒนธรรม อ.เวียงแก่น',
        isPublished: true,
        districtSlug: 'wiang-kaen',
      },
    ]

    const existingActivities = await payload.find({ collection: 'activities', limit: 1 })
    if (existingActivities.docs.length === 0) {
      for (const act of activities) {
        const { districtSlug: distSlug } = act
        const data: Record<string, unknown> = {
          title: act.title,
          slug: act.slug,
          date: act.date,
          endDate: act.endDate || undefined,
          level: act.level,
          summary: act.summary,
          location: act.location,
          isPublished: act.isPublished,
          isFeatured: act.isFeatured || false,
        }
        if (distSlug && districtIds[distSlug]) {
          data.district = districtIds[distSlug]
        }
        await payload.create({ collection: 'activities', data })
      }
    }

    // ============================================================
    // 8. HeritageBlog (คลังมรดกภูมิปัญญา)
    // ============================================================
    const heritageBlogs = [
      {
        title: 'ผ้าซิ่นตีนจกล้านนา — ศิลปะบนสายด้าย',
        slug: 'pha-sin-tin-jok-lanna',
        category: 'intangible-heritage',
        excerpt: 'ผ้าซิ่นตีนจกเป็นผ้าทอมือแบบโบราณของชาวล้านนา มีลวดลายเฉพาะที่สืบทอดกันมาหลายร้อยปี ถือเป็นมรดกภูมิปัญญาที่ทรงคุณค่าอันยิ่ง',
        author: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        districtSlug: 'muang-chiang-rai',
        tagNames: ['ผ้าทอ', 'หัตถกรรม', 'ศิลปะ'],
      },
      {
        title: 'แกงโฮะ — อาหารล้านนาแห่งการแบ่งปัน',
        slug: 'kaeng-ho-lanna-food',
        category: 'intangible-heritage',
        excerpt: 'แกงโฮะเป็นอาหารล้านนาที่สะท้อนวิถีชีวิตชุมชน นำแกงที่เหลือหลายชนิดมาผสมรวมกัน ได้รสชาติกลมกล่อมเป็นเอกลักษณ์',
        author: 'ปราชญ์อาหารล้านนา',
        districtSlug: 'phan',
        tagNames: ['อาหาร', 'ประเพณี'],
      },
      {
        title: 'พ่อครูสะล้อ ซอ ซึง แห่งดอยตุง',
        slug: 'salor-sor-sung-doi-tung',
        category: 'local-wisdom',
        excerpt: 'ปราชญ์ชาวบ้านผู้สืบสานเครื่องดนตรีพื้นเมืองล้านนา สะล้อ ซอ ซึง ที่มีเสียงไพเราะเป็นเอกลักษณ์ของดินแดนล้านนา',
        author: 'ศูนย์ศิลปวัฒนธรรม',
        districtSlug: 'mae-fa-luang',
        tagNames: ['ดนตรีล้านนา', 'ศิลปะ'],
      },
      {
        title: 'พิพิธภัณฑ์บ้านเชียงแสน — แหล่งเรียนรู้อารยธรรมโบราณ',
        slug: 'chiang-saen-museum',
        category: 'learning-resources',
        excerpt: 'พิพิธภัณฑ์ที่รวบรวมโบราณวัตถุจากอาณาจักรเชียงแสนโบราณ แหล่งเรียนรู้ประวัติศาสตร์ล้านนาที่สำคัญ',
        author: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        districtSlug: 'chiang-saen',
        tagNames: ['ประเพณี'],
      },
      {
        title: 'สมุนไพรล้านนาในวิถีชุมชน',
        slug: 'lanna-herbal-medicine',
        category: 'local-wisdom',
        excerpt: 'ภูมิปัญญาการใช้สมุนไพรพื้นบ้านในวิถีชีวิตชาวล้านนา ตั้งแต่การรักษาโรค การย้อมผ้า ไปจนถึงอาหารพื้นเมือง',
        author: 'เครือข่ายสมุนไพรล้านนา',
        districtSlug: 'mae-suai',
        tagNames: ['สมุนไพร'],
      },
      {
        title: 'ผ้าทอไทลื้อเวียงแก่น — มรดกข้ามแม่น้ำโขง',
        slug: 'tai-lue-textile-wiang-kaen',
        category: 'intangible-heritage',
        excerpt: 'ผ้าทอไทลื้อเป็นหนึ่งในงานหัตถกรรมที่สวยงามที่สุดของอำเภอเวียงแก่น ลวดลายโบราณเล่าเรื่องราววัฒนธรรมข้ามแม่น้ำโขง',
        author: 'กลุ่มทอผ้าไทลื้อเวียงแก่น',
        districtSlug: 'wiang-kaen',
        tagNames: ['ผ้าทอ', 'ชาติพันธุ์', 'หัตถกรรม'],
      },
    ]

    const existingBlogs = await payload.find({ collection: 'heritage-blog', limit: 1 })
    if (existingBlogs.docs.length === 0) {
      for (const blog of heritageBlogs) {
        const relatedTags = blog.tagNames?.map((t: string) => tagIds[t]).filter(Boolean) || []
        const distId = blog.districtSlug ? districtIds[blog.districtSlug] : undefined

        await payload.create({
          collection: 'heritage-blog',
          data: {
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            excerpt: blog.excerpt,
            content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: blog.excerpt, version: 1 }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
            author: blog.author,
            tags: relatedTags,
            relatedDistrict: distId || undefined,
            isPublished: true,
          },
        })
      }
    }

    // ============================================================
    // 9. News (ข่าวสาร)
    // ============================================================
    const newsItems = [
      {
        title: 'ประกาศรับสมัครกรรมการสภาวัฒนธรรมอำเภอ ปี 2569',
        slug: 'recruit-district-board-2569',
        type: 'general',
        publishedAt: '2026-03-01T00:00:00.000Z',
        excerpt: 'สภาวัฒนธรรมจังหวัดเชียงรายเปิดรับสมัครผู้สนใจเข้าร่วมเป็นกรรมการสภาวัฒนธรรมระดับอำเภอ ประจำปี 2569 สนใจติดต่อสำนักงานสภาวัฒนธรรมจังหวัด',
      },
      {
        title: 'สรุปผลการจัดงานเทศกาลดนตรีพื้นเมืองล้านนา ครั้งที่ 5',
        slug: 'lanna-music-festival-5-summary',
        type: 'general',
        publishedAt: '2026-02-25T00:00:00.000Z',
        excerpt: 'สรุปผลงานเทศกาลดนตรีพื้นเมืองล้านนา ครั้งที่ 5 มีผู้เข้าร่วมมากกว่า 2,000 คน จาก 18 อำเภอ คัดเลือกตัวแทนไปแข่งระดับภาค',
      },
      {
        title: 'วิดีโอสารคดี "ล้านนาที่รัก" ตอนที่ 12',
        slug: 'lanna-documentary-ep12',
        type: 'video',
        publishedAt: '2026-02-18T00:00:00.000Z',
        excerpt: 'สารคดีชุด "ล้านนาที่รัก" ตอนที่ 12 ร่วมเดินทางสำรวจมรดกวัฒนธรรมไทลื้อริมแม่น้ำโขง อำเภอเวียงแก่น',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        title: 'รายงานผลการดำเนินงานสภาวัฒนธรรม ปี 2568',
        slug: 'annual-report-2568',
        type: 'document',
        publishedAt: '2026-01-15T00:00:00.000Z',
        excerpt: 'รายงานสรุปผลการดำเนินงานประจำปี 2568 ของสภาวัฒนธรรมจังหวัดเชียงราย ครอบคลุมกิจกรรม 47 โครงการ ใน 18 อำเภอ',
      },
      {
        title: 'ขอเชิญร่วมงานวันอนุรักษ์มรดกไทย ประจำปี 2569',
        slug: 'thai-heritage-day-2569',
        type: 'general',
        publishedAt: '2026-03-10T00:00:00.000Z',
        excerpt: 'สภาวัฒนธรรมจังหวัดเชียงราย ร่วมกับสำนักงานวัฒนธรรมจังหวัด จัดงานวันอนุรักษ์มรดกไทย 2 เมษายน 2569',
      },
    ]

    const existingNews = await payload.find({ collection: 'news', limit: 1 })
    if (existingNews.docs.length === 0) {
      for (const news of newsItems) {
        await payload.create({
          collection: 'news',
          data: {
            title: news.title,
            slug: news.slug,
            type: news.type,
            publishedAt: news.publishedAt,
            excerpt: news.excerpt,
            videoUrl: news.videoUrl || undefined,
            isPublished: true,
          },
        })
      }
    }

    // ============================================================
    // 10. Awards Honor Sample Data
    // ============================================================
    const awardYears = [
      {
        buddhistYear: 2568,
        announcementDate: '2025-06-08T00:00:00.000Z',
        ceremonyDate: '2025-06-29T08:30:00.000Z',
        location: 'หอประชุมใหญ่ มหาวิทยาลัยราชภัฏเชียงราย',
        presidentName: 'ดร.สลักจฤฎดิ์ ติยะไพรัช',
      },
      {
        buddhistYear: 2569,
        announcementDate: '2026-06-08T00:00:00.000Z',
        ceremonyDate: '2026-06-29T08:30:00.000Z',
        location: 'หอประชุมใหญ่ มหาวิทยาลัยราชภัฏเชียงราย',
        presidentName: 'ดร.สลักจฤฎดิ์ ติยะไพรัช',
      },
    ]
    const awardYearIds: Record<number, string> = {}
    for (const year of awardYears) {
      const existing = await payload.find({
        collection: 'award-years',
        where: { buddhistYear: { equals: year.buddhistYear } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        awardYearIds[year.buddhistYear] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({ collection: 'award-years', data: year })
        awardYearIds[year.buddhistYear] = String(created.id)
      }
    }

    const mediaDocs = await payload.find({
      collection: 'media',
      limit: 20,
      sort: '-createdAt',
    })
    const findMediaId = (pattern: string) =>
      String(mediaDocs.docs.find((doc) => typeof doc.filename === 'string' && doc.filename.includes(pattern))?.id || '')
    const mediaIds = {
      silver: findMediaId('Silver_ore_threads_into_jewelry'),
      textileA: findMediaId('Cotton_silk_threads_Tai_Lue_202605061201'),
      textileB: findMediaId('Cotton_silk_threads_Tai_Lue_202605061249'),
      bamboo: findMediaId('Bamboo_offerings_with_silk_ribbons'),
      clay: findMediaId('Clay_to_ceramic_transformation_vase'),
      ethnic: findMediaId('Ethnic_textures_blending_cultura'),
      craftA: findMediaId('Craft_materials_into_cultural_la') || findMediaId('Craft_materials_into_cultur'),
      surreal: findMediaId('Surreal_and_visually'),
    }

    const awardCategories = [
      { mainPillar: 'cultural-contributor' as const, subType: 'ประเภทบุคคลทั่วไป' },
      { mainPillar: 'outstanding-cultural-achievement' as const, subType: 'ประเภทองค์กร / ชุมชน' },
      { mainPillar: 'outstanding-cultural-achievement' as const, subType: 'ประเภทเยาวชน / สถานศึกษา' },
    ]
    const awardCategoryIds: Record<string, string> = {}
    for (const category of awardCategories) {
      const key = `${category.mainPillar}:${category.subType}`
      const existing = await payload.find({
        collection: 'award-categories',
        where: {
          and: [
            { mainPillar: { equals: category.mainPillar } },
            { subType: { equals: category.subType } },
          ],
        },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        awardCategoryIds[key] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({ collection: 'award-categories', data: category })
        awardCategoryIds[key] = String(created.id)
      }
    }

    const institutions = [
      { institutionName: 'โรงเรียนสามัคคีวิทยาคม', district: 'อ.เมืองเชียงราย' },
      { institutionName: 'โรงเรียนดำรงราษฎร์สงเคราะห์', district: 'อ.เมืองเชียงราย' },
      { institutionName: 'โรงเรียนเชียงของวิทยาคม', district: 'อ.เชียงของ' },
    ]
    const institutionIds: Record<string, string> = {}
    for (const institution of institutions) {
      const existing = await payload.find({
        collection: 'institutions',
        where: { institutionName: { equals: institution.institutionName } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        institutionIds[institution.institutionName] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({ collection: 'institutions', data: institution })
        institutionIds[institution.institutionName] = String(created.id)
      }
    }

    const awardees = [
      { prefix: 'นางสาว', fullName: 'พิมพ์ชนก ใจคำ', institutionName: 'โรงเรียนสามัคคีวิทยาคม', gradeLevel: 'มัธยมศึกษาปีที่ 5', avatarImage: mediaIds.textileA || mediaIds.ethnic },
      { prefix: 'นาย', fullName: 'ธนกฤต แซ่ลี้', institutionName: 'โรงเรียนสามัคคีวิทยาคม', gradeLevel: 'มัธยมศึกษาปีที่ 5', avatarImage: mediaIds.bamboo || mediaIds.craftA },
      { prefix: 'นางสาว', fullName: 'กัญญาณัฐ วงศ์ประเสริฐ', institutionName: 'โรงเรียนดำรงราษฎร์สงเคราะห์', gradeLevel: 'มัธยมศึกษาปีที่ 6', avatarImage: mediaIds.clay || mediaIds.surreal },
      { prefix: 'นาย', fullName: 'ภัทรพล เชื้อเมืองพาน', institutionName: 'โรงเรียนเชียงของวิทยาคม', gradeLevel: 'มัธยมศึกษาปีที่ 4', avatarImage: mediaIds.textileB || mediaIds.ethnic },
    ]
    const awardeeIds: Record<string, string> = {}
    for (const awardee of awardees) {
      const existing = await payload.find({
        collection: 'awardees',
        where: { fullName: { equals: awardee.fullName } },
        limit: 1,
      })
      const awardeeData = {
        prefix: awardee.prefix,
        fullName: awardee.fullName,
        institution: institutionIds[awardee.institutionName],
        gradeLevel: awardee.gradeLevel,
        avatarImage: awardee.avatarImage || undefined,
        isPublished: true,
      }
      if (existing.docs.length > 0) {
        awardeeIds[awardee.fullName] = String(existing.docs[0].id)
        await payload.update({
          collection: 'awardees',
          id: String(existing.docs[0].id),
          data: awardeeData,
        })
      } else {
        const created = await payload.create({
          collection: 'awardees',
          data: awardeeData,
        })
        awardeeIds[awardee.fullName] = String(created.id)
      }
    }

    const khonDeeAwards = [
      {
        prefix: 'นาย',
        fullName: 'ประยูร อินต๊ะวงศ์',
        currentPosition: 'ประธานกลุ่มสืบสานงานหัตถกรรมพื้นบ้าน',
        contributionTitle: 'โครงการสืบสานเครื่องเงินและลายแกะล้านนา',
        contributionDetail: 'ดำเนินงานถ่ายทอดภูมิปัญญางานช่างพื้นบ้านให้เยาวชนและชุมชนในอำเภอเมืองเชียงรายอย่างต่อเนื่อง พร้อมจัดนิทรรศการหมุนเวียนในพื้นที่สาธารณะ',
        impactArea: 'อ.เมืองเชียงราย, อ.แม่ลาว',
        year: 2569,
        categoryKey: 'cultural-contributor:ประเภทบุคคลทั่วไป',
        contactPhone: '08-1234-5678',
        contactAddress: 'อำเภอเมืองเชียงราย จังหวัดเชียงราย',
        nominatorName: 'สภาวัฒนธรรมอำเภอเมืองเชียงราย',
        profileImage: mediaIds.silver || mediaIds.craftA,
      },
      {
        prefix: 'คณะ',
        fullName: 'ชุมชนลุ่มน้ำแม่กก',
        currentPosition: 'เครือข่ายวัฒนธรรมชุมชน',
        contributionTitle: 'ฟื้นฟูประเพณีลอยโขมดและตลาดวัฒนธรรมริมกก',
        contributionDetail: 'รวมพลังชุมชน หน่วยงานท้องถิ่น และเยาวชน จัดกิจกรรมสืบสานประเพณีริมน้ำ พร้อมสร้างรายได้จากผลิตภัณฑ์วัฒนธรรมของชุมชน',
        impactArea: 'อ.เมืองเชียงราย, อ.เชียงแสน',
        year: 2568,
        categoryKey: 'outstanding-cultural-achievement:ประเภทองค์กร / ชุมชน',
        contactPhone: '08-2345-6789',
        contactAddress: 'ชุมชนลุ่มน้ำแม่กก จังหวัดเชียงราย',
        nominatorName: 'เครือข่ายวัฒนธรรมจังหวัดเชียงราย',
        profileImage: mediaIds.ethnic || mediaIds.textileA,
      },
    ]
    for (const award of khonDeeAwards) {
      const existing = await payload.find({
        collection: 'khon-dee-awards',
        where: {
          and: [
            { fullName: { equals: award.fullName } },
            { contributionTitle: { equals: award.contributionTitle } },
          ],
        },
        limit: 1,
      })
      const awardData = {
        prefix: award.prefix,
        fullName: award.fullName,
        currentPosition: award.currentPosition,
        profileImage: award.profileImage || undefined,
        contributionTitle: award.contributionTitle,
        contributionDetail: createRichText(award.contributionDetail),
        impactArea: award.impactArea,
        year: awardYearIds[award.year],
        category: awardCategoryIds[award.categoryKey],
        contactPhone: award.contactPhone,
        contactAddress: award.contactAddress,
        nominatorName: award.nominatorName,
        isPublished: true,
      }
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'khon-dee-awards',
          id: String(existing.docs[0].id),
          data: awardData,
        })
      } else {
        await payload.create({
          collection: 'khon-dee-awards',
          data: awardData,
        })
      }
    }

    const youthAwardHistories = [
      {
        projectTitle: 'สารคดีสั้น ตามรอยภูมิปัญญาผ้าทอเชียงราย',
        year: 2569,
        categoryKey: 'outstanding-cultural-achievement:ประเภทเยาวชน / สถานศึกษา',
        institutionName: 'โรงเรียนสามัคคีวิทยาคม',
        awardeeNames: ['พิมพ์ชนก ใจคำ', 'ธนกฤต แซ่ลี้'],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        projectSummary: 'สารคดีสั้นที่บันทึกเรื่องราวช่างทอผ้าท้องถิ่น กระบวนการย้อมสีธรรมชาติ และการต่อยอดงานหัตถกรรมสู่คนรุ่นใหม่',
        coverImage: mediaIds.textileA || mediaIds.ethnic,
      },
      {
        projectTitle: 'ละครเวทีเยาวชน เสียงจากลำน้ำโขง',
        year: 2568,
        categoryKey: 'outstanding-cultural-achievement:ประเภทเยาวชน / สถานศึกษา',
        institutionName: 'โรงเรียนเชียงของวิทยาคม',
        awardeeNames: ['ภัทรพล เชื้อเมืองพาน'],
        videoUrl: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
        projectSummary: 'ผลงานสร้างสรรค์เชิงการแสดงที่เล่าเรื่องวิถีวัฒนธรรมริมน้ำโขง เชื่อมโยงประวัติศาสตร์ท้องถิ่นกับมุมมองของเยาวชน',
        coverImage: mediaIds.bamboo || mediaIds.craftA,
      },
    ]
    for (const history of youthAwardHistories) {
      const existing = await payload.find({
        collection: 'youth-award-histories',
        where: { projectTitle: { equals: history.projectTitle } },
        limit: 1,
      })
      const historyData = {
        projectTitle: history.projectTitle,
        year: awardYearIds[history.year],
        category: awardCategoryIds[history.categoryKey],
        institution: institutionIds[history.institutionName],
        awardees: history.awardeeNames.map((name) => awardeeIds[name]).filter(Boolean),
        coverImage: history.coverImage || undefined,
        videoUrl: history.videoUrl,
        projectSummary: history.projectSummary,
        isPublished: true,
      }
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'youth-award-histories',
          id: String(existing.docs[0].id),
          data: historyData,
        })
      } else {
        await payload.create({
          collection: 'youth-award-histories',
          data: historyData,
        })
      }
    }
    const awardGalleries = [
      { year: 2569, caption: 'บรรยากาศพิธีมอบรางวัลเกียรติยศประจำปี 2569', isHighlight: true, image: mediaIds.craftA || mediaIds.surreal },
      { year: 2569, caption: 'เยาวชนผู้ได้รับรางวัลร่วมถ่ายภาพกับคณะกรรมการ', isHighlight: false, image: mediaIds.textileB || mediaIds.ethnic },
      { year: 2568, caption: 'การแสดงผลงานวัฒนธรรมของนักเรียนบนเวทีหลัก', isHighlight: false, image: mediaIds.bamboo || mediaIds.textileA },
    ]
    for (const gallery of awardGalleries) {
      const existing = await payload.find({
        collection: 'award-galleries',
        where: { caption: { equals: gallery.caption } },
        limit: 1,
      })
      const galleryData = {
        year: awardYearIds[gallery.year],
        image: gallery.image || mediaIds.craftA || undefined,
        caption: gallery.caption,
        isHighlight: gallery.isHighlight,
      }
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'award-galleries',
          id: String(existing.docs[0].id),
          data: galleryData,
        })
      } else {
        await payload.create({
          collection: 'award-galleries',
          data: galleryData,
        })
      }
    }

    const wisdomCategories = [
      { title: 'สาขาช่างฝีมือดั้งเดิม', slug: 'traditional-craftsmanship' },
      { title: 'สาขาศิลปะการแสดง', slug: 'performing-arts' },
      { title: 'สาขาการแพทย์พื้นบ้าน', slug: 'folk-medicine' },
    ]
    const wisdomCategoryIds: Record<string, string> = {}
    for (const category of wisdomCategories) {
      const existing = await payload.find({
        collection: 'wisdom-categories',
        where: { slug: { equals: category.slug } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        wisdomCategoryIds[category.slug] = String(existing.docs[0].id)
      } else {
        const created = await payload.create({
          collection: 'wisdom-categories',
          data: category,
        })
        wisdomCategoryIds[category.slug] = String(created.id)
      }
    }

    const sampleWisdomAwards = [
      {
        prefix: 'พ่อครู',
        fullName: 'สมศักดิ์ จันต๊ะคุณ',
        wisdomCategorySlug: 'traditional-craftsmanship',
        year: 2569,
        contributionText: 'สืบสานงานช่างฝีมือพื้นบ้านด้านการแกะสลักไม้และการทำเครื่องใช้พื้นถิ่น ถ่ายทอดองค์ความรู้ให้เยาวชนและชุมชนอย่างต่อเนื่อง',
        avatarImage: mediaIds.silver || mediaIds.clay,
      },
      {
        prefix: 'แม่ครู',
        fullName: 'บัวเรียง ใจงาม',
        wisdomCategorySlug: 'performing-arts',
        year: 2569,
        contributionText: 'เป็นผู้สืบทอดศิลปะการฟ้อนพื้นเมืองล้านนาและจัดกิจกรรมถ่ายทอดให้โรงเรียนและเครือข่ายวัฒนธรรมในจังหวัดเชียงราย',
        avatarImage: mediaIds.bamboo || mediaIds.ethnic,
      },
      {
        prefix: 'นาย',
        fullName: 'สุรพล แสงคำ',
        wisdomCategorySlug: 'folk-medicine',
        year: 2568,
        contributionText: 'รวบรวมองค์ความรู้การแพทย์พื้นบ้านและสมุนไพรท้องถิ่น พร้อมให้คำปรึกษาและถ่ายทอดแนวทางดูแลสุขภาพตามภูมิปัญญาชุมชน',
        avatarImage: mediaIds.clay || mediaIds.craftA,
      },
    ]
    for (const wisdom of sampleWisdomAwards) {
      const existing = await payload.find({
        collection: 'wisdom-awards',
        where: { fullName: { equals: wisdom.fullName } },
        limit: 1,
        depth: 0,
      })
      const wisdomData = {
        prefix: wisdom.prefix,
        fullName: wisdom.fullName,
        avatarImage: wisdom.avatarImage || undefined,
        year: awardYearIds[wisdom.year],
        wisdomCategory: wisdomCategoryIds[wisdom.wisdomCategorySlug],
        contributionDetail: createRichText(wisdom.contributionText),
        isPublished: true,
      }
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'wisdom-awards',
          id: String(existing.docs[0].id),
          data: wisdomData,
        })
      } else {
        await payload.create({
          collection: 'wisdom-awards',
          data: wisdomData,
        })
      }
    }

    // ============================================================
    // 11. AboutPage Global
    // ============================================================
    try {
      await payload.updateGlobal({
        slug: 'about-page',
        data: {
          vision: 'เป็นองค์กรหลักในการขับเคลื่อนวัฒนธรรมท้องถิ่น ส่งเสริมและอนุรักษ์มรดกภูมิปัญญาล้านนา ให้คงอยู่อย่างยั่งยืนและสร้างคุณค่าสู่ชุมชน',
          missions: [
            { text: 'ส่งเสริมและอนุรักษ์วัฒนธรรมท้องถิ่นอันดีงาม' },
            { text: 'สนับสนุนกิจกรรมทางวัฒนธรรมในระดับชุมชนจนถึงระดับจังหวัด' },
            { text: 'สร้างเครือข่ายความร่วมมือด้านวัฒนธรรมครอบคลุมทั้ง 18 อำเภอ' },
            { text: 'รวบรวมและเผยแพร่องค์ความรู้เกี่ยวกับมรดกภูมิปัญญาล้านนา' },
            { text: 'ส่งเสริมการมีส่วนร่วมของประชาชนในการดำเนินงานด้านวัฒนธรรม' },
          ],
          historyPlain: 'สภาวัฒนธรรมจังหวัดเชียงราย เป็นองค์กรที่จัดตั้งขึ้นตามพระราชบัญญัติวัฒนธรรมแห่งชาติ พ.ศ. 2553 เพื่อทำหน้าที่เป็นศูนย์กลางในการส่งเสริม อนุรักษ์ และเผยแพร่วัฒนธรรม ของจังหวัดเชียงราย\n\nจังหวัดเชียงรายมีความหลากหลายทางวัฒนธรรมอย่างมาก เป็นดินแดนที่มีประวัติศาสตร์ยาวนาน ตั้งแต่สมัยพญามังรายมหาราช ปฐมกษัตริย์แห่งอาณาจักรล้านนา ประกอบกับความหลากหลาย ของกลุ่มชาติพันธุ์ที่อาศัยอยู่ในพื้นที่ ทำให้มีมรดกทางวัฒนธรรม ทั้งด้านภาษา ศิลปะ ประเพณี และวิถีชีวิต ที่เป็นเอกลักษณ์และควรค่าแก่การสืบสาน\n\nปัจจุบัน สภาวัฒนธรรมจังหวัดเชียงรายมีเครือข่ายครอบคลุมทั้ง 18 อำเภอ ประกอบด้วยสภาวัฒนธรรมอำเภอที่ทำหน้าที่ในระดับพื้นที่ เพื่อร่วมกันอนุรักษ์และสืบสานมรดกวัฒนธรรมอันล้ำค่าของล้านนา',
        },
      })
    } catch {
      // Global may already be up to date
    }

    // ============================================================
    // 11. WisdomAwards (ครูภูมิปัญญาเมืองเชียงราย)
    // ============================================================
    const awardYearsResponse = await payload.find({ collection: 'award-years', limit: 10, sort: '-buddhistYear' })
    const defaultAwardYearId = awardYearsResponse.docs[0] ? String(awardYearsResponse.docs[0].id) : undefined
    const wisdomAwards = [
      {
        prefix: 'พ่อครู',
        fullName: 'สมศักดิ์ จันต๊ะคุณ',
        wisdomCategorySlug: 'traditional-craftsmanship',
        contributionText: 'สืบสานงานช่างฝีมือพื้นบ้านด้านการแกะสลักไม้และการทำเครื่องใช้พื้นถิ่น ถ่ายทอดองค์ความรู้ให้เยาวชนและชุมชนอย่างต่อเนื่อง',
      },
      {
        prefix: 'แม่ครู',
        fullName: 'บัวเรียง ใจงาม',
        wisdomCategorySlug: 'performing-arts',
        contributionText: 'เป็นผู้สืบทอดศิลปะการฟ้อนพื้นเมืองล้านนาและจัดกิจกรรมถ่ายทอดให้โรงเรียนและเครือข่ายวัฒนธรรมในจังหวัดเชียงราย',
      },
      {
        prefix: 'นาย',
        fullName: 'สุรพล แสงคำ',
        wisdomCategorySlug: 'folk-medicine',
        contributionText: 'รวบรวมองค์ความรู้การแพทย์พื้นบ้านและสมุนไพรท้องถิ่น พร้อมให้คำปรึกษาและถ่ายทอดแนวทางดูแลสุขภาพตามภูมิปัญญาชุมชน',
      },
    ]

    if (defaultAwardYearId) {
      const existingWisdomAwards = await payload.find({ collection: 'wisdom-awards', limit: 1, depth: 0 })
      if (existingWisdomAwards.docs.length === 0) {
        for (const wisdom of wisdomAwards) {
          await payload.create({
            collection: 'wisdom-awards',
            data: {
              prefix: wisdom.prefix,
              fullName: wisdom.fullName,
              year: defaultAwardYearId,
              wisdomCategory: wisdomCategoryIds[wisdom.wisdomCategorySlug],
              contributionDetail: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: wisdom.contributionText,
                          version: 1,
                        },
                      ],
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              isPublished: true,
            },
          })
        }
      }
    }

    // ============================================================
    // 12. PageHeroes Global
    // ============================================================
    try {
      const existingPageHeroes = await payload.findGlobal({ slug: 'page-heroes' }).catch(() => null)
      const khonDeeHeroMedia = await payload.find({
        collection: 'media',
        where: {
          filename: {
            contains: 'Craft_materials_into_cultural_la',
          },
        },
        limit: 1,
      }).catch(() => ({ docs: [] }))
      const khonDeeHeroMediaId = khonDeeHeroMedia.docs[0] ? String(khonDeeHeroMedia.docs[0].id) : undefined
      await payload.updateGlobal({
        slug: 'page-heroes',
        data: {
          ...(existingPageHeroes || {}),
          home: {
            ...(existingPageHeroes?.home || {}),
            eyebrow: 'Modern Lanna',
            title: 'สภาวัฒนธรรม จังหวัดเชียงราย',
            subtitle: 'เมืองศิลปิน ถิ่นวัฒนธรรม ส่งเสริมและอนุรักษ์มรดกล้านนา เชื่อมโยงอดีตสู่ปัจจุบันอย่างยั่งยืนเพื่อชนรุ่นหลัง',
          },
          activities: {
            ...(existingPageHeroes?.activities || {}),
            eyebrow: 'กิจกรรมและประเพณี',
            title: 'กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย',
            subtitle: 'รวมข่าวสารกิจกรรมและงานประเพณีท้องถิ่นที่จัดโดยสภาวัฒนธรรมจังหวัดเชียงรายและเครือข่ายระดับอำเภอ',
          },
          activitiesCalendar: {
            ...(existingPageHeroes?.activitiesCalendar || {}),
            eyebrow: 'ปฏิทินกิจกรรม',
            title: 'ปฏิทินกิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย',
            subtitle: 'ติดตามกิจกรรมและงานประเพณีท้องถิ่นล่วงหน้า',
          },
          about: {
            ...(existingPageHeroes?.about || {}),
            eyebrow: 'ข้อมูลองค์กร',
            title: 'เกี่ยวกับเรา',
            subtitle: 'ทำความรู้จักสภาวัฒนธรรมจังหวัดเชียงราย องค์กรแกนนำในการขับเคลื่อน อนุรักษ์ และสืบสานมรดกภูมิปัญญาล้านนา',
          },
          aboutBoard: {
            ...(existingPageHeroes?.aboutBoard || {}),
            eyebrow: 'บุคลากร',
            title: 'คณะกรรมการจังหวัด',
            subtitle: 'ทำเนียบคณะบริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ผู้นำในการขับเคลื่อนงานด้านวัฒนธรรม',
          },
          news: {
            ...(existingPageHeroes?.news || {}),
            eyebrow: 'อัปเดตล่าสุด',
            title: 'ข่าวสารและประชาสัมพันธ์',
            subtitle: 'ติดตามความเคลื่อนไหว ประกาศ และข่าวสารล่าสุดจากสภาวัฒนธรรมจังหวัดเชียงราย',
          },
          heritage: {
            ...(existingPageHeroes?.heritage || {}),
            eyebrow: 'ความรู้และภูมิปัญญา',
            title: 'คลังมรดกภูมิปัญญาทางวัฒนธรรม',
            subtitle: 'รวบรวมและสงวนรักษามรดกทางวัฒนธรรม องค์ความรู้ และภูมิปัญญาท้องถิ่นอันทรงคุณค่าของจังหวัดเชียงราย',
          },
          khonDee: {
            ...(existingPageHeroes?.khonDee || {}),
            eyebrow: 'รางวัลเกียรติยศ',
            title: 'คนดีศรีเชียงราย',
            subtitle: 'ทำเนียบบุคคลและองค์กรที่ได้รับการยกย่องด้านคุณประโยชน์และผลงานดีเด่นทางวัฒนธรรมของจังหวัดเชียงราย',
            heroImage: existingPageHeroes?.khonDee?.heroImage || khonDeeHeroMediaId,
          },
          youthCulture: {
            ...(existingPageHeroes?.youthCulture || {}),
            eyebrow: 'รางวัลเกียรติยศ',
            title: 'เยาวชนวัฒนธรรม',
            subtitle: 'ผลงานสร้างสรรค์ทางวัฒนธรรมของเยาวชนเชียงราย พร้อมข้อมูลโรงเรียน ทีมผู้จัดทำ และคลังภาพบรรยากาศวันรับรางวัล',
            heroImage: existingPageHeroes?.youthCulture?.heroImage || khonDeeHeroMediaId,
          },
          wisdomAwards: {
            ...(existingPageHeroes?.wisdomAwards || {}),
            eyebrow: 'รางวัลเกียรติยศ',
            title: 'ครูภูมิปัญญาเมืองเชียงราย',
            subtitle: 'ทำเนียบผู้สืบสานองค์ความรู้ท้องถิ่นของเชียงราย แยกตามสาขาเพื่อการค้นหาและเผยแพร่ได้อย่างชัดเจน',
            heroImage: existingPageHeroes?.wisdomAwards?.heroImage || khonDeeHeroMediaId,
          },
          districts: {
            ...(existingPageHeroes?.districts || {}),
            eyebrow: 'เครือข่ายระดับอำเภอ',
            title: 'เครือข่ายสภาวัฒนธรรมอำเภอ',
            subtitle: 'เชื่อมต่อและประสานความร่วมมือกับเครือข่ายสภาวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย',
          },
          contact: {
            ...(existingPageHeroes?.contact || {}),
            eyebrow: 'ติดต่อเรา',
            title: 'ติดต่อสภาวัฒนธรรม',
            subtitle: 'สอบถามข้อมูล หรือประสานงานเครือข่ายวัฒนธรรมจังหวัดเชียงราย ผ่านช่องทางด้านล่าง',
          },
        },
      })
    } catch {
      // Global may already be up to date
    }

    const [districtStats, activityStats, heritageStats, newsStats, pageHeroesStats] = await Promise.all([
      payload.find({ collection: 'districts', limit: 1 }),
      payload.find({ collection: 'activities', limit: 1 }),
      payload.find({ collection: 'heritage-blog', limit: 1 }),
      payload.find({ collection: 'news', limit: 1 }),
      payload.findGlobal({ slug: 'page-heroes' }).catch(() => null),
    ])

    const verificationChecks = [
      {
        name: 'districts',
        expected: districts.length,
        actual: districtStats.totalDocs,
        passed: districtStats.totalDocs >= districts.length,
      },
      {
        name: 'activities',
        expected: activities.length,
        actual: activityStats.totalDocs,
        passed: activityStats.totalDocs >= activities.length,
      },
      {
        name: 'heritage blogs',
        expected: heritageBlogs.length,
        actual: heritageStats.totalDocs,
        passed: heritageStats.totalDocs >= heritageBlogs.length,
      },
      {
        name: 'news',
        expected: newsItems.length,
        actual: newsStats.totalDocs,
        passed: newsStats.totalDocs >= newsItems.length,
      },
      {
        name: 'page heroes',
        expected: 1,
        actual: pageHeroesStats ? 1 : 0,
        passed: Boolean(pageHeroesStats?.home?.title && pageHeroesStats?.khonDee?.title && pageHeroesStats?.youthCulture?.title && pageHeroesStats?.wisdomAwards?.title && pageHeroesStats?.districts?.title && pageHeroesStats?.contact?.title),
      },
    ]

    const verificationPassed = verificationChecks.every((check) => check.passed)

    return NextResponse.json({
      success: true,
      message: '✅ Seed ข้อมูลตัวอย่างทั้งหมดเรียบร้อยแล้ว!',
      verification: {
        passed: verificationPassed,
        checks: verificationChecks,
      },
      summary: {
        boardPositions: positions.length,
        districtBoardPositions: distPositions.length,
        provincialBoard: boardMembers.length,
        districts: districts.length,
        districtChairmen: districtChairmen.length,
        tags: tags.length,
        activities: activities.length,
        heritageBlogs: heritageBlogs.length,
        news: newsItems.length,
        awardYears: awardYears.length,
        awardCategories: awardCategories.length,
        wisdomCategories: wisdomCategories.length,
        institutions: institutions.length,
        awardees: awardees.length,
        khonDeeAwards: khonDeeAwards.length,
        youthAwardHistories: youthAwardHistories.length,
        awardGalleries: awardGalleries.length,
        wisdomAwardsSample: sampleWisdomAwards.length,
        wisdomAwards: wisdomAwards.length,
        aboutPageGlobal: 'updated',
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Seed failed'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
