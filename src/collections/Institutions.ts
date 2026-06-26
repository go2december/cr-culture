import type { CollectionConfig } from 'payload'

export const Institutions: CollectionConfig = {
    slug: 'institutions',
    admin: {
        useAsTitle: 'institutionName',
        group: 'รางวัลเกียรติยศ',
        description: 'ตารางโรงเรียนหรือหน่วยงานของหมวดเยาวชนวัฒนธรรม',
        defaultColumns: ['institutionName', 'district', 'profileImage'],
    },
    labels: {
        singular: 'โรงเรียน/หน่วยงาน',
        plural: 'โรงเรียน/หน่วยงาน',
    },
    fields: [
        {
            name: 'institutionName',
            type: 'text',
            label: 'ชื่อโรงเรียน/หน่วยงาน',
            required: true,
            unique: true,
        },
        {
            name: 'district',
            type: 'text',
            label: 'อำเภอ',
        },
        {
            name: 'profileImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปโปรไฟล์โรงเรียน',
        },
    ],
}
