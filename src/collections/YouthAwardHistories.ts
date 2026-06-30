import type { CollectionConfig } from 'payload'

export const YouthAwardHistories: CollectionConfig = {
    slug: 'youth-award-histories',
    admin: {
        useAsTitle: 'projectTitle',
        group: 'รางวัลเกียรติยศ',
        description: 'รางวัลยุวชนวัฒนธรรม สำหรับบันทึกผลงานคลิปและทีมผู้จัดทำ',
        defaultColumns: ['projectTitle', 'institution', 'year', 'category', 'isPublished'],
    },
    labels: {
        singular: 'รางวัลยุวชนวัฒนธรรม',
        plural: 'รางวัลยุวชนวัฒนธรรม',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'ข้อมูลผลงานและรางวัล',
                    fields: [
                        {
                            name: 'projectTitle',
                            type: 'text',
                            label: 'ชื่อผลงาน/คลิป',
                            required: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'year',
                                    type: 'relationship',
                                    relationTo: 'award-years',
                                    label: 'ปี พ.ศ.',
                                    required: true,
                                    admin: {
                                        width: '34%',
                                    },
                                },
                                {
                                    name: 'category',
                                    type: 'relationship',
                                    relationTo: 'youth-award-categories',
                                    label: 'ประเภทรางวัล',
                                    required: true,
                                    admin: {
                                        width: '33%',
                                    },
                                },
                                {
                                    name: 'institution',
                                    type: 'relationship',
                                    relationTo: 'institutions',
                                    label: 'โรงเรียน/สถาบัน',
                                    required: true,
                                    admin: {
                                        width: '33%',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'awardees',
                            type: 'relationship',
                            relationTo: 'awardees',
                            hasMany: true,
                            label: 'รายชื่อสมาชิกในทีม',
                            required: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'coverImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'รูปหน้าปกผลงาน/ภาพรับรางวัล',
                                    admin: {
                                        width: '50%',
                                    },
                                },
                                {
                                    name: 'videoUrl',
                                    type: 'text',
                                    label: 'ลิงก์วิดีโอผลงาน',
                                    admin: {
                                        width: '50%',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'projectSummary',
                            type: 'textarea',
                            label: 'สรุปผลงาน',
                        },
                    ],
                },
                {
                    label: 'ข้อมูลเผยแพร่',
                    fields: [
                        {
                            name: 'isPublished',
                            type: 'checkbox',
                            label: 'เผยแพร่หน้าเว็บ',
                            defaultValue: true,
                        },
                    ],
                },
            ],
        },
    ],
}
