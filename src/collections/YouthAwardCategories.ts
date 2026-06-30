import type { CollectionConfig } from 'payload'

export const YouthAwardCategories: CollectionConfig = {
    slug: 'youth-award-categories',
    admin: {
        useAsTitle: 'title',
        group: 'รางวัลเกียรติยศ',
        description: 'ประเภทรางวัลสำหรับรางวัลยุวชนวัฒนธรรม',
        defaultColumns: ['title', 'slug'],
    },
    labels: {
        singular: 'ประเภทรางวัลยุวชน',
        plural: 'ประเภทรางวัลยุวชน',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'ชื่อประเภทรางวัล',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug',
            required: true,
            unique: true,
            admin: {
                description: 'ใช้สำหรับกรองข้อมูลบนหน้าเว็บ เช่น youth-institution',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'คำอธิบาย',
        },
    ],
}
