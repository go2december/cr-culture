import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  const payload = await getPayload({ config })

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
      { title: 'กรรมการ', level: 3 },
      { title: 'เลขานุการ', level: 4 },
      { title: 'ผู้ช่วยเลขานุการ', level: 4 },
    ]

    const positionIds: Record<string, string> = {}
    for (const pos of positions) {
      const existing = await payload.find({ collection: 'board-positions', where: { title: { equals: pos.title } }, limit: 1 })
      if (existing.docs.length > 0) {
        positionIds[pos.title] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'board-positions', data: pos })
        positionIds[pos.title] = created.id
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
        distPosIds[pos.title] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'district-board-positions', data: pos })
        distPosIds[pos.title] = created.id
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
      { name: 'นายสมชาย ใจดี', position: 'กรรมการ', positionOrder: 6 },
      { name: 'นางราตรี ศิลป์ลานนา', position: 'กรรมการ', positionOrder: 7 },
      { name: 'นายพิทักษ์ มรดกไทย', position: 'กรรมการ', positionOrder: 8 },
      { name: 'นางสมศรี วัฒนาสกุล', position: 'กรรมการ', positionOrder: 9 },
      { name: 'นายธวัชชัย ประเพณีไทย', position: 'เลขานุการ', positionOrder: 10 },
      { name: 'นางนภัส ล้านนาวัฒน์', position: 'ผู้ช่วยเลขานุการ', positionOrder: 11 },
    ]

    const existingBoard = await payload.find({ collection: 'provincial-board', limit: 1 })
    if (existingBoard.docs.length === 0) {
      for (const member of boardMembers) {
        await payload.create({
          collection: 'provincial-board',
          data: {
            name: member.name,
            position: positionIds[member.position],
            positionOrder: member.positionOrder,
            isActive: true,
          },
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
        districtIds[dist.slug] = existing.docs[0].id
      } else {
        const created = await payload.create({
          collection: 'districts',
          data: { ...dist, isActive: true },
        })
        districtIds[dist.slug] = created.id
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
        tagIds[tag.name] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'tags', data: tag })
        tagIds[tag.name] = created.id
      }
    }

    // ============================================================
    // 7. Activities (กิจกรรม)
    // ============================================================
    const activities = [
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
        const distSlug = (act as any).districtSlug
        const data: any = {
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
    // 10. AboutPage Global
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

    return NextResponse.json({
      success: true,
      message: '✅ Seed ข้อมูลตัวอย่างทั้งหมดเรียบร้อยแล้ว!',
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
        aboutPageGlobal: 'updated',
      },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
