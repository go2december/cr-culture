import type { CollectionConfig } from 'payload'

export const WisdomCategories: CollectionConfig = {
    slug: 'wisdom-categories',
    admin: {
        useAsTitle: 'title',
        group: 'รางวัลเกียรติยศ',
        description: 'สาขาองค์ความรู้สำหรับครูภูมิปัญญาเมืองเชียงราย',
        defaultColumns: ['title', 'slug'],
    },
    labels: {
        singular: 'สาขาองค์ความรู้',
        plural: 'สาขาองค์ความรู้',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'ชื่อสาขาองค์ความรู้',
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
                description: 'ใช้สำหรับกรองข้อมูลบนหน้าเว็บ เช่น traditional-craftsmanship',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'คำอธิบาย',
        },
    ],
}
