import type { CollectionConfig } from 'payload/types';

// ความเชี่ยวชาญของปราชญ์
export const EXPERTISE_AREAS = [
    { label: 'ดนตรีพื้นเมือง', value: 'traditional_music' },
    { label: 'การทอผ้า', value: 'weaving' },
    { label: 'การแกะสลัก', value: 'carving' },
    { label: 'สมุนไพร/การแพทย์แผนไทย', value: 'herbal_medicine' },
    { label: 'พิธีกรรม/ศาสนา', value: 'ritual_religious' },
    { label: 'การเกษตรพื้นบ้าน', value: 'traditional_farming' },
    { label: 'อาหารพื้นเมือง', value: 'local_cuisine' },
    { label: 'ศิลปะล้านนา', value: 'lanna_art' },
    { label: 'ภาษา/วรรณกรรมล้านนา', value: 'lanna_literature' },
    { label: 'สถาปัตยกรรมพื้นถิ่น', value: 'vernacular_architecture' },
];

export const Scholars: CollectionConfig = {
    slug: 'scholars',
    labels: {
        singular: 'ปราชญ์ชาวบ้าน',
        plural: 'ปราชญ์ชาวบ้าน',
    },
    admin: {
        useAsTitle: 'name_th',
        defaultColumns: ['name_th', 'expertise', 'district', 'status'],
    },
    fields: [
        {
            name: 'name_th',
            type: 'text',
            required: true,
            label: 'ชื่อ-นามสกุล (ภาษาไทย)',
        },
        {
            name: 'name_en',
            type: 'text',
            label: 'ชื่อ-นามสกุล (ภาษาอังกฤษ)',
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
            name: 'title',
            type: 'text',
            label: 'คำนำหน้า/ตำแหน่ง',
        },
        {
            name: 'profileImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปโปรไฟล์',
        },
        {
            name: 'expertise',
            type: 'select',
            hasMany: true,
            required: true,
            label: 'ความเชี่ยวชาญ',
            options: EXPERTISE_AREAS,
        },
        {
            name: 'district',
            type: 'relationship',
            relationTo: 'districts',
            required: true,
            label: 'อำเภอ',
        },
        {
            name: 'biography',
            type: 'richText',
            label: 'ประวัติ/ผลงาน',
        },
        {
            name: 'achievements',
            type: 'array',
            label: 'รางวัล/เกียรติคุณ',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'ชื่อรางวัล',
                },
                {
                    name: 'year',
                    type: 'number',
                    label: 'ปี พ.ศ.',
                },
                {
                    name: 'organization',
                    type: 'text',
                    label: 'หน่วยงานที่มอบ',
                },
            ],
        },
        {
            name: 'contact',
            type: 'group',
            label: 'ข้อมูลติดต่อ',
            fields: [
                {
                    name: 'phone',
                    type: 'text',
                    label: 'โทรศัพท์',
                },
                {
                    name: 'address',
                    type: 'textarea',
                    label: 'ที่อยู่',
                },
            ],
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'แกลเลอรี่ผลงาน',
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
                    label: 'คำอธิบาย',
                },
            ],
        },
        {
            name: 'status',
            type: 'select',
            label: 'สถานะ',
            defaultValue: 'active',
            options: [
                { label: 'ยังมีชีวิต', value: 'active' },
                { label: 'เสียชีวิตแล้ว', value: 'deceased' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishStatus',
            type: 'select',
            label: 'สถานะการเผยแพร่',
            defaultValue: 'draft',
            options: [
                { label: 'ฉบับร่าง', value: 'draft' },
                { label: 'เผยแพร่', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
    ],
};

export default Scholars;
