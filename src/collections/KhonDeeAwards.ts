import type { CollectionConfig } from 'payload'

export const KhonDeeAwards: CollectionConfig = {
    slug: 'khon-dee-awards',
    admin: {
        useAsTitle: 'fullName',
        group: 'รางวัลเกียรติยศ',
        description: 'ทำเนียบคนดีศรีเชียงราย สำหรับบุคคลหรือองค์กรที่ทำคุณประโยชน์หรือมีผลงานดีเด่นทางวัฒนธรรม',
        defaultColumns: ['fullName', 'year', 'category', 'isPublished'],
    },
    labels: {
        singular: 'ทำเนียบคนดีศรีเชียงราย',
        plural: 'ทำเนียบคนดีศรีเชียงราย',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'ข้อมูลพื้นฐาน',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'prefix',
                                    type: 'relationship',
                                    relationTo: 'prefixes',
                                    label: 'คำนำหน้า/ยศ',
                                    admin: {
                                        width: '35%',
                                    },
                                },
                                {
                                    name: 'fullName',
                                    type: 'text',
                                    label: 'ชื่อ-นามสกุล/ชื่อองค์กร',
                                    required: true,
                                    admin: {
                                        width: '65%',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'profileImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'รูปถ่ายผู้ได้รับรางวัล',
                        },
                        {
                            name: 'currentPosition',
                            type: 'text',
                            label: 'อาชีพ/ตำแหน่งปัจจุบัน',
                        },
                    ],
                },
                {
                    label: 'รายละเอียดรางวัลและผลงาน',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'year',
                                    type: 'relationship',
                                    relationTo: 'award-years',
                                    label: 'ปี พ.ศ. ที่ได้รับรางวัล',
                                    required: true,
                                    admin: {
                                        width: '40%',
                                        description: 'เลือกปี พ.ศ. ของรอบประกาศผลและพิธีมอบรางวัล',
                                    },
                                },
                                {
                                    name: 'category',
                                    type: 'relationship',
                                    relationTo: 'award-categories',
                                    label: 'ด้านและประเภทรางวัล',
                                    required: true,
                                    admin: {
                                        width: '60%',
                                        description: 'เลือกด้านหลักของรางวัลและประเภทผู้รับรางวัลจากข้อมูลกลาง',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'contributionTitle',
                            type: 'text',
                            label: 'ชื่อผลงาน/โครงการเด่น',
                            required: true,
                        },
                        {
                            name: 'contributionDetail',
                            type: 'richText',
                            label: 'รายละเอียดความดีเชิงลึก',
                        },
                        {
                            name: 'impactArea',
                            type: 'text',
                            label: 'พื้นที่ที่ได้รับประโยชน์',
                        },
                    ],
                },
                {
                    label: 'ข้อมูลภายในสำหรับเจ้าหน้าที่',
                    fields: [
                        {
                            name: 'contactPhone',
                            type: 'text',
                            label: 'เบอร์โทรศัพท์',
                        },
                        {
                            name: 'contactAddress',
                            type: 'textarea',
                            label: 'ที่อยู่สำหรับติดต่อ',
                        },
                        {
                            name: 'nominatorName',
                            type: 'text',
                            label: 'ผู้เสนอชื่อเข้าคัดเลือก',
                        },
                    ],
                },
            ],
        },
        {
            name: 'isPublished',
            type: 'checkbox',
            label: 'เผยแพร่หน้าเว็บ',
            defaultValue: true,
        },
    ],
}
