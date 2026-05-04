import type { GlobalConfig } from 'payload'

const defaultHome = {
    eyebrow: 'Modern Lanna',
    title: 'สภาวัฒนธรรม จังหวัดเชียงราย',
    subtitle: 'เมืองศิลปิน ถิ่นวัฒนธรรม ส่งเสริมและอนุรักษ์มรดกล้านนา เชื่อมโยงอดีตสู่ปัจจุบันอย่างยั่งยืนเพื่อชนรุ่นหลัง',
}

const defaultActivities = {
    eyebrow: 'กิจกรรมและประเพณี',
    title: 'กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย',
    subtitle: 'รวมข่าวสารกิจกรรมและงานประเพณีท้องถิ่นที่จัดโดยสภาวัฒนธรรมจังหวัดเชียงรายและเครือข่ายระดับอำเภอ',
}

const defaultNews = {
    eyebrow: 'อัปเดตล่าสุด',
    title: 'ข่าวสารและประชาสัมพันธ์',
    subtitle: 'ติดตามความเคลื่อนไหว ประกาศ และข่าวสารล่าสุดจากสภาวัฒนธรรมจังหวัดเชียงราย',
}

const defaultHeritage = {
    eyebrow: 'ความรู้และภูมิปัญญา',
    title: 'คลังมรดกภูมิปัญญาทางวัฒนธรรม',
    subtitle: 'รวบรวมและสงวนรักษามรดกทางวัฒนธรรม องค์ความรู้ และภูมิปัญญาท้องถิ่นอันทรงคุณค่าของจังหวัดเชียงราย',
}

const getValueByPath = (source: any, path: string[]) => {
    return path.reduce((accumulator, key) => (accumulator && typeof accumulator === 'object' ? accumulator[key] : undefined), source)
}

const getUploadId = (value: any) => {
    if (!value) return null
    if (typeof value === 'string' || typeof value === 'number') return String(value)
    if (typeof value === 'object' && value.id) return String(value.id)
    return null
}

const cleanupReplacedHeroUploads = async ({ doc, originalDoc, req }: any) => {
    if (!originalDoc || !req?.payload) {
        return doc
    }

    const heroPaths = [
        ['home', 'heroImage'],
        ['activities', 'heroImage'],
        ['news', 'heroImage'],
        ['heritage', 'heroImage'],
    ]

    const nextIds = new Set(
        heroPaths
            .map((path) => getUploadId(getValueByPath(doc, path)))
            .filter(Boolean) as string[],
    )

    for (const path of heroPaths) {
        const previousId = getUploadId(getValueByPath(originalDoc, path))
        const currentId = getUploadId(getValueByPath(doc, path))

        if (!previousId || previousId === currentId || nextIds.has(previousId)) {
            continue
        }

        try {
            await req.payload.delete({
                collection: 'media',
                id: previousId,
                overrideAccess: true,
            })
        } catch {
            // Ignore cleanup failures so the hero update still succeeds.
        }
    }

    return doc
}

export const PageHeroes: GlobalConfig = {
    slug: 'page-heroes',
    label: 'Hero Images',
    admin: {
        group: 'เนื้อหาเว็บไซต์',
        description: 'จัดการรูปและข้อความ hero ของหน้าแรก กิจกรรม ข่าว และมรดกภูมิปัญญา',
    },
    hooks: {
        afterChange: [cleanupReplacedHeroUploads],
    },
    fields: [
        {
            name: 'home',
            type: 'group',
            label: 'หน้าแรก',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultHome.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultHome.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultHome.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าแรก',
                    },
                },
            ],
        },
        {
            name: 'activities',
            type: 'group',
            label: 'หน้ากิจกรรม',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultActivities.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultActivities.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultActivities.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้ากิจกรรม',
                    },
                },
            ],
        },
        {
            name: 'news',
            type: 'group',
            label: 'หน้าข่าวสาร',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultNews.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultNews.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultNews.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าข่าวสาร',
                    },
                },
            ],
        },
        {
            name: 'heritage',
            type: 'group',
            label: 'หน้ามรดกภูมิปัญญา',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultHeritage.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultHeritage.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultHeritage.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้ามรดกภูมิปัญญา',
                    },
                },
            ],
        },
    ],
}