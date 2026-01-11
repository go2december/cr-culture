import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
    slug: 'news',
    admin: {
        useAsTitle: 'title',
        group: 'เนื้อหา',
        description: 'ข่าวสารและประชาสัมพันธ์',
        defaultColumns: ['title', 'type', 'publishedAt', 'isPublished'],
    },
    labels: {
        singular: 'ข่าว',
        plural: 'ข่าวสาร',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'หัวข้อข่าว',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug (URL)',
            required: true,
            unique: true,
        },
        {
            name: 'type',
            type: 'select',
            label: 'ประเภทข่าว',
            required: true,
            options: [
                { label: 'ข่าวทั่วไป', value: 'general' },
                { label: 'วิดีโอสื่อวัฒนธรรม', value: 'video' },
                { label: 'เอกสารดาวน์โหลด', value: 'document' },
            ],
            defaultValue: 'general',
        },
        {
            name: 'publishedAt',
            type: 'date',
            label: 'วันที่เผยแพร่',
            required: true,
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพปก',
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'บทคัดย่อ',
            maxLength: 300,
        },
        {
            name: 'content',
            type: 'richText',
            label: 'เนื้อหา',
            admin: {
                condition: (data) => data?.type !== 'document',
            },
        },
        {
            name: 'videoUrl',
            type: 'text',
            label: 'URL วิดีโอ (YouTube/Facebook)',
            admin: {
                condition: (data) => data?.type === 'video',
            },
        },
        {
            name: 'document',
            type: 'upload',
            relationTo: 'media',
            label: 'ไฟล์เอกสาร',
            admin: {
                condition: (data) => data?.type === 'document',
            },
        },
        {
            name: 'isPublished',
            type: 'checkbox',
            label: 'เผยแพร่',
            defaultValue: true,
        },
        {
            name: 'isPinned',
            type: 'checkbox',
            label: 'ปักหมุด',
            defaultValue: false,
        },
    ],
}
