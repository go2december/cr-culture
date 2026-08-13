import type { CollectionConfig } from 'payload'

export const CulturalPartners: CollectionConfig = {
    slug: 'cultural-partners',
    admin: {
        useAsTitle: 'name',
        group: 'เครือข่าย',
        description: 'ข้อมูลเครือข่ายองค์กรทางวัฒนธรรม จังหวัดเชียงราย',
        defaultColumns: ['name', 'code', 'order', 'isActive'],
    },
    labels: {
        singular: 'องค์กรภาคีวัฒนธรรม',
        plural: 'เครือข่ายองค์กรทางวัฒนธรรม',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'ชื่อองค์กรภาคีวัฒนธรรม',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug (URL)',
            required: true,
            unique: true,
            admin: {
                description: 'ใช้สำหรับ URL เช่น "chiang-rai-arts-association"',
            },
        },
        {
            name: 'code',
            type: 'text',
            label: 'รหัสองค์กร/ภาคี',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพตราสัญลักษณ์/โลโก้',
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
            label: 'รายละเอียด/บทบาทภารกิจ',
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
                    label: 'ที่อยู่สำนักงาน',
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
                    label: 'Facebook/เว็บไซต์',
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
