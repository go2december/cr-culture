import type { GlobalConfig } from 'payload'

type UnknownRecord = Record<string, unknown>

type CleanupPayloadRequest = {
    payload?: {
        delete: (args: {
            collection: 'media'
            id: string
            overrideAccess: boolean
        }) => Promise<unknown>
    }
}

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

const defaultActivitiesCalendar = {
    eyebrow: 'ปฏิทินกิจกรรม',
    title: 'ปฏิทินกิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย',
    subtitle: 'ติดตามกิจกรรมและงานประเพณีท้องถิ่นล่วงหน้า',
}

const defaultAbout = {
    eyebrow: 'ข้อมูลองค์กร',
    title: 'เกี่ยวกับเรา',
    subtitle: 'ทำความรู้จักสภาวัฒนธรรมจังหวัดเชียงราย องค์กรแกนนำในการขับเคลื่อน อนุรักษ์ และสืบสานมรดกภูมิปัญญาล้านนา',
}

const defaultAboutBoard = {
    eyebrow: 'บุคลากร',
    title: 'คณะกรรมการจังหวัด',
    subtitle: 'ทำเนียบคณะบริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ผู้นำในการขับเคลื่อนงานด้านวัฒนธรรม',
}

const defaultDistricts = {
    eyebrow: 'เครือข่ายระดับอำเภอ',
    title: 'เครือข่ายสภาวัฒนธรรมอำเภอ',
    subtitle: 'เชื่อมต่อและประสานความร่วมมือกับเครือข่ายสภาวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย',
}

const defaultContact = {
    eyebrow: 'ติดต่อเรา',
    title: 'ติดต่อสภาวัฒนธรรม',
    subtitle: 'สอบถามข้อมูล หรือประสานงานเครือข่ายวัฒนธรรมจังหวัดเชียงราย ผ่านช่องทางด้านล่าง',
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

const defaultKhonDee = {
    eyebrow: 'รางวัลเกียรติยศ',
    title: 'คนดีศรีเชียงราย',
    subtitle: 'ทำเนียบบุคคลและองค์กรที่ได้รับการยกย่องด้านคุณประโยชน์และผลงานดีเด่นทางวัฒนธรรมของจังหวัดเชียงราย',
}

const defaultYouthCulture = {
    eyebrow: 'รางวัลเกียรติยศ',
    title: 'ยุวชนวัฒนธรรม',
    subtitle: 'รวบรวมผลงานเด่น รายชื่อเยาวชน ครู และสถาบันการศึกษาที่ขับเคลื่อนงานวัฒนธรรมผ่านผลงานของชุมชน',
}

const defaultWisdomAwards = {
    eyebrow: 'รางวัลเกียรติยศ',
    title: 'ครูภูมิผญาเมืองเชียงราย',
    subtitle: 'ทำเนียบผู้สืบสานองค์ความรู้ท้องถิ่นของเชียงราย แยกตามสาขาเพื่อการค้นหาและเผยแพร่ได้อย่างชัดเจน',
}

const isRecord = (value: unknown): value is UnknownRecord => {
    return Boolean(value) && typeof value === 'object'
}

const getValueByPath = (source: unknown, path: string[]) => {
    return path.reduce<unknown>((accumulator, key) => (isRecord(accumulator) ? accumulator[key] : undefined), source)
}

const getUploadId = (value: unknown) => {
    if (!value) return null
    if (typeof value === 'string' || typeof value === 'number') return String(value)
    if (isRecord(value) && (typeof value.id === 'string' || typeof value.id === 'number')) return String(value.id)
    return null
}

const cleanupReplacedHeroUploads = async ({
    doc,
    originalDoc,
    req,
}: {
    doc: unknown
    originalDoc?: unknown
    req?: CleanupPayloadRequest
}) => {
    if (!originalDoc || !req?.payload) {
        return doc
    }

    const heroPaths = [
        ['home', 'heroImage'],
        ['activities', 'heroImage'],
        ['activitiesCalendar', 'heroImage'],
        ['about', 'heroImage'],
        ['aboutBoard', 'heroImage'],
        ['news', 'heroImage'],
        ['heritage', 'heroImage'],
        ['khonDee', 'heroImage'],
        ['youthCulture', 'heroImage'],
        ['wisdomAwards', 'heroImage'],
        ['districts', 'heroImage'],
        ['contact', 'heroImage'],
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
    label: 'ภาพประกอบส่วนหัว',
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
            name: 'activitiesCalendar',
            type: 'group',
            label: 'หน้าปฏิทินกิจกรรม',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultActivitiesCalendar.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultActivitiesCalendar.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultActivitiesCalendar.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าปฏิทินกิจกรรม',
                    },
                },
            ],
        },
        {
            name: 'about',
            type: 'group',
            label: 'หน้าเกี่ยวกับเรา',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultAbout.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultAbout.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultAbout.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าเกี่ยวกับเรา',
                    },
                },
            ],
        },
        {
            name: 'aboutBoard',
            type: 'group',
            label: 'หน้าคณะกรรมการจังหวัด',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultAboutBoard.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultAboutBoard.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultAboutBoard.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าคณะกรรมการจังหวัด',
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
            name: 'districts',
            type: 'group',
            label: 'หน้าเครือข่ายอำเภอ',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultDistricts.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultDistricts.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultDistricts.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าเครือข่ายอำเภอ',
                    },
                },
            ],
        },
        {
            name: 'contact',
            type: 'group',
            label: 'หน้าติดต่อเรา',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultContact.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultContact.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultContact.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าติดต่อเรา',
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
        {
            name: 'khonDee',
            type: 'group',
            label: 'คนดีศรีเชียงราย',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultKhonDee.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultKhonDee.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultKhonDee.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าคนดีศรีเชียงราย',
                    },
                },
            ],
        },
        {
            name: 'youthCulture',
            type: 'group',
            label: 'ยุวชนวัฒนธรรม',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultYouthCulture.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultYouthCulture.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultYouthCulture.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้ายุวชนวัฒนธรรม',
                    },
                },
            ],
        },
        {
            name: 'wisdomAwards',
            type: 'group',
            label: 'ครูภูมิผญาเมืองเชียงราย',
            fields: [
                {
                    name: 'eyebrow',
                    type: 'text',
                    label: 'ป้ายกำกับ',
                    defaultValue: defaultWisdomAwards.eyebrow,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'หัวเรื่อง',
                    defaultValue: defaultWisdomAwards.title,
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    label: 'คำอธิบาย',
                    defaultValue: defaultWisdomAwards.subtitle,
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ hero',
                    admin: {
                        description: 'ใช้แสดงใน hero ของหน้าครูภูมิผญาเมืองเชียงราย',
                    },
                },
            ],
        },
    ],
}
