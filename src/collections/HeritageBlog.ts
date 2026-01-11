import type { CollectionConfig } from 'payload'

export const HeritageBlog: CollectionConfig = {
    slug: 'heritage-blog',
    admin: {
        useAsTitle: 'title',
        group: 'เนื้อหา',
        description: 'คลังมรดกภูมิปัญญา',
        defaultColumns: ['title', 'category', 'createdAt', 'isPublished'],
    },
    labels: {
        singular: 'บทความมรดกภูมิปัญญา',
        plural: 'คลังมรดกภูมิปัญญา',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'ชื่อบทความ',
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
            name: 'category',
            type: 'select',
            label: 'หมวดหมู่',
            required: true,
            options: [
                { label: 'มรดกภูมิปัญญา', value: 'intangible-heritage' },
                { label: 'ศูนย์เชียงรายศึกษา', value: 'chiangrai-studies' },
                { label: 'แหล่งเรียนรู้', value: 'learning-resources' },
                { label: 'ปราชญ์ชาวบ้าน', value: 'local-wisdom' },
            ],
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพปก',
            required: true,
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
            required: true,
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'แกลเลอรีรูปภาพ',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'รูปภาพ',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                    label: 'คำบรรยาย',
                },
            ],
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
            label: 'แท็ก',
        },
        {
            name: 'relatedDistrict',
            type: 'relationship',
            relationTo: 'districts',
            label: 'อำเภอที่เกี่ยวข้อง',
            admin: {
                description: 'เลือกอำเภอที่เกี่ยวข้อง (ถ้ามี)',
            },
        },
        {
            name: 'author',
            type: 'text',
            label: 'ผู้เขียน',
        },
        {
            name: 'source',
            type: 'text',
            label: 'แหล่งที่มา',
        },
        {
            name: 'isPublished',
            type: 'checkbox',
            label: 'เผยแพร่',
            defaultValue: true,
        },
        {
            name: 'isFeatured',
            type: 'checkbox',
            label: 'แนะนำ',
            defaultValue: false,
        },
        {
            name: 'viewCount',
            type: 'number',
            label: 'จำนวนเข้าชม',
            defaultValue: 0,
            admin: {
                readOnly: true,
            },
        },
    ],
}
