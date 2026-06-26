import type { CollectionConfig } from 'payload'

export const Awardees: CollectionConfig = {
    slug: 'awardees',
    admin: {
        useAsTitle: 'fullName',
        group: 'รางวัลเกียรติยศ',
        description: 'ตารางเยาวชนหรือนักเรียนในหมวดเยาวชนวัฒนธรรม',
        defaultColumns: ['fullName', 'institution', 'gradeLevel', 'isPublished'],
    },
    labels: {
        singular: 'เยาวชน/นักเรียน',
        plural: 'เยาวชน/นักเรียน',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'prefix',
                    type: 'text',
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
