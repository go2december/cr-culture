import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
    slug: 'tags',
    admin: {
        useAsTitle: 'name',
        group: 'อ้างอิง',
        description: 'แท็กสำหรับจัดหมวดหมู่บทความ',
    },
    labels: {
        singular: 'แท็ก',
        plural: 'แท็ก',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'ชื่อแท็ก',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug',
            required: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'คำอธิบาย',
        },
        {
            name: 'color',
            type: 'text',
            label: 'สีแท็ก (Hex)',
            admin: {
                description: 'เช่น #6B21A8',
            },
        },
    ],
}
