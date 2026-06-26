import type { CollectionConfig } from 'payload'

export const WisdomAwards: CollectionConfig = {
    slug: 'wisdom-awards',
    admin: {
        useAsTitle: 'fullName',
        group: 'รางวัลเกียรติยศ',
        description: 'ทำเนียบครูภูมิปัญญาเมืองเชียงราย',
        defaultColumns: ['fullName', 'wisdomCategory', 'year', 'isPublished'],
    },
    labels: {
        singular: 'ครูภูมิปัญญาเมืองเชียงราย',
        plural: 'ครูภูมิปัญญาเมืองเชียงราย',
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
                                    type: 'text',
                                    label: 'คำนำหน้า/ยศ',
                                    admin: {
                                        width: '35%',
                                    },
                                },
                                {
                                    name: 'fullName',
                                    type: 'text',
                                    label: 'ชื่อ-นามสกุล',
                                    required: true,
                                    admin: {
                                        width: '65%',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'avatarImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'รูปถ่ายครูภูมิปัญญา',
                        },
                    ],
                },
                {
                    label: 'สาขาและรายละเอียดผลงาน',
                    fields: [
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
                                        width: '40%',
                                    },
                                },
                                {
                                    name: 'wisdomCategory',
                                    type: 'relationship',
                                    relationTo: 'wisdom-categories',
                                    label: 'สาขาองค์ความรู้',
                                    required: true,
                                    admin: {
                                        width: '60%',
                                        description: 'สามารถเพิ่มสาขาใหม่ได้จากเมนู "สาขาองค์ความรู้"',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'contributionDetail',
                            type: 'richText',
                            label: 'รายละเอียดองค์ความรู้และการสืบสาน',
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
