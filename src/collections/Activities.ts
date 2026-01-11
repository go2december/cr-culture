import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
    slug: 'activities',
    admin: {
        useAsTitle: 'title',
        group: 'เนื้อหา',
        description: 'กิจกรรมสภาวัฒนธรรม',
        defaultColumns: ['title', 'level', 'date', 'isPublished'],
    },
    labels: {
        singular: 'กิจกรรม',
        plural: 'กิจกรรม',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'ชื่อกิจกรรม',
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
            type: 'row',
            fields: [
                {
                    name: 'date',
                    type: 'date',
                    label: 'วันที่จัดกิจกรรม',
                    required: true,
                    admin: { width: '50%' },
                },
                {
                    name: 'endDate',
                    type: 'date',
                    label: 'วันสิ้นสุด (ถ้ามี)',
                    admin: { width: '50%' },
                },
            ],
        },
        {
            name: 'level',
            type: 'select',
            label: 'ระดับกิจกรรม',
            required: true,
            options: [
                { label: 'ระดับจังหวัด', value: 'province' },
                { label: 'ระดับอำเภอ', value: 'district' },
            ],
            defaultValue: 'province',
        },
        {
            name: 'district',
            type: 'relationship',
            relationTo: 'districts',
            label: 'อำเภอที่จัด',
            admin: {
                condition: (data) => data?.level === 'district',
                description: 'เลือกอำเภอ (สำหรับกิจกรรมระดับอำเภอ)',
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพปก',
        },
        {
            name: 'summary',
            type: 'textarea',
            label: 'สรุปโดยย่อ',
            maxLength: 300,
        },
        {
            name: 'content',
            type: 'richText',
            label: 'รายละเอียด',
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
            name: 'location',
            type: 'text',
            label: 'สถานที่จัด',
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
    ],
}
