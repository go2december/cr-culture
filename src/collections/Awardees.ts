import type { CollectionConfig } from 'payload'

export const Awardees: CollectionConfig = {
    slug: 'awardees',
    admin: {
        useAsTitle: 'fullName',
        group: 'รางวัลเกียรติยศ',
        description: 'ตารางยุวชนหรือนักเรียนในหมวดยุวชนวัฒนธรรม',
        defaultColumns: ['fullName', 'institution', 'gradeLevel', 'isPublished'],
    },
    labels: {
        singular: 'ยุวชน/นักเรียน',
        plural: 'ยุวชน/นักเรียน',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'prefix',
                    type: 'relationship',
                    relationTo: 'prefixes',
                    label: 'คำนำหน้า',
                    admin: {
                        width: '30%',
                    },
                },
                {
                    name: 'fullName',
                    type: 'text',
                    label: 'ชื่อ-นามสกุล',
                    required: true,
                    admin: {
                        width: '70%',
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'institution',
                    type: 'relationship',
                    relationTo: 'institutions',
                    label: 'โรงเรียน/หน่วยงาน',
                    required: true,
                    admin: {
                        width: '60%',
                    },
                },
                {
                    name: 'gradeLevel',
                    type: 'text',
                    label: 'ระดับชั้น',
                    admin: {
                        width: '40%',
                    },
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
