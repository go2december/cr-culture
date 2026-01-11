import type { CollectionConfig } from 'payload/types';

// ประเภทมรดกวัฒนธรรม
export const HERITAGE_TYPES = [
    { label: 'วัด/ศาสนสถาน', value: 'temple' },
    { label: 'โบราณสถาน', value: 'archaeological' },
    { label: 'ประเพณี/พิธีกรรม', value: 'tradition' },
    { label: 'หัตถกรรม/งานฝีมือ', value: 'handicraft' },
    { label: 'ดนตรี/การแสดง', value: 'performing_arts' },
    { label: 'อาหาร/ภูมิปัญญาท้องถิ่น', value: 'culinary' },
    { label: 'สถาปัตยกรรมล้านนา', value: 'lanna_architecture' },
    { label: 'ภาษา/วรรณกรรม', value: 'language_literature' },
];

export const CulturalHeritage: CollectionConfig = {
    slug: 'cultural-heritage',
    labels: {
        singular: 'มรดกวัฒนธรรม',
        plural: 'มรดกวัฒนธรรม',
    },
    admin: {
        useAsTitle: 'name_th',
        defaultColumns: ['name_th', 'heritageType', 'district', 'status'],
    },
    fields: [
        {
            name: 'name_th',
            type: 'text',
            required: true,
            label: 'ชื่อภาษาไทย',
        },
        {
            name: 'name_en',
            type: 'text',
            label: 'ชื่อภาษาอังกฤษ',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (URL)',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'heritageType',
            type: 'select',
            required: true,
            label: 'ประเภทมรดกวัฒนธรรม',
            options: HERITAGE_TYPES,
        },
        {
            name: 'district',
            type: 'relationship',
            relationTo: 'districts',
            required: true,
            label: 'อำเภอ',
        },
        {
            name: 'history',
            type: 'richText',
            label: 'ประวัติความเป็นมา',
        },
        {
            name: 'significance',
            type: 'richText',
            label: 'ความสำคัญ/คุณค่า',
        },
        {
            name: 'coordinates',
            type: 'group',
            label: 'พิกัด GPS',
            fields: [
                {
                    name: 'latitude',
                    type: 'number',
                    label: 'ละติจูด',
                },
                {
                    name: 'longitude',
                    type: 'number',
                    label: 'ลองจิจูด',
                },
            ],
        },
        {
            name: 'address',
            type: 'textarea',
            label: 'ที่อยู่',
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพหลัก',
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'แกลเลอรี่รูปภาพ',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                    label: 'คำอธิบายรูป',
                },
            ],
        },
        {
            name: 'videos',
            type: 'array',
            label: 'วิดีโอ',
            fields: [
                {
                    name: 'video',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'youtubeUrl',
                    type: 'text',
                    label: 'YouTube URL',
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'ชื่อวิดีโอ',
                },
            ],
        },
        {
            name: 'status',
            type: 'select',
            label: 'สถานะ',
            defaultValue: 'draft',
            options: [
                { label: 'ฉบับร่าง', value: 'draft' },
                { label: 'เผยแพร่', value: 'published' },
                { label: 'เก็บถาวร', value: 'archived' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'relatedScholars',
            type: 'relationship',
            relationTo: 'scholars',
            hasMany: true,
            label: 'ปราชญ์ที่เกี่ยวข้อง',
        },
    ],
};

export default CulturalHeritage;
