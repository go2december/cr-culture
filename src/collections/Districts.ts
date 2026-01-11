import type { CollectionConfig } from 'payload'

export const Districts: CollectionConfig = {
    slug: 'districts',
    admin: {
        useAsTitle: 'name',
        group: 'เครือข่าย',
        description: 'ข้อมูล 18 อำเภอของจังหวัดเชียงราย',
    },
    labels: {
        singular: 'อำเภอ',
        plural: 'อำเภอ',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'ชื่ออำเภอ',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug (URL)',
            required: true,
            unique: true,
            admin: {
                description: 'ใช้สำหรับ URL เช่น "muang-chiang-rai"',
            },
        },
        {
            name: 'code',
            type: 'text',
            label: 'รหัสอำเภอ',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพสัญลักษณ์',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพปก',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'รายละเอียด',
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'latitude',
                    type: 'number',
                    label: 'ละติจูด',
                    admin: { width: '50%' },
                },
                {
                    name: 'longitude',
                    type: 'number',
                    label: 'ลองจิจูด',
                    admin: { width: '50%' },
                },
            ],
        },
        {
            name: 'contact',
            type: 'group',
            label: 'ข้อมูลติดต่อ',
            fields: [
                {
                    name: 'address',
                    type: 'textarea',
                    label: 'ที่อยู่',
                },
                {
                    name: 'phone',
                    type: 'text',
                    label: 'เบอร์โทรศัพท์',
                },
                {
                    name: 'email',
                    type: 'email',
                    label: 'อีเมล',
                },
                {
                    name: 'facebook',
                    type: 'text',
                    label: 'Facebook',
                },
            ],
        },
        {
            name: 'order',
            type: 'number',
            label: 'ลำดับการแสดงผล',
            defaultValue: 99,
        },
        {
            name: 'isActive',
            type: 'checkbox',
            label: 'เปิดใช้งาน',
            defaultValue: true,
        },
    ],
}
