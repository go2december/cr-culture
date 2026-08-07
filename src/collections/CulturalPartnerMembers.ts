import type { CollectionConfig } from 'payload'

export const CulturalPartnerMembers: CollectionConfig = {
    slug: 'cultural-partner-members',
    admin: {
        useAsTitle: 'name',
        group: 'บุคลากร',
        description: 'กรรมการและผู้บริหารเครือข่ายองค์กรภาคีวัฒนธรรม',
        defaultColumns: ['name', 'position', 'partner', 'isActive'],
    },
    labels: {
        singular: 'กรรมการองค์กรภาคี',
        plural: 'กรรมการองค์กรภาคี',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'ชื่อ-นามสกุล',
            required: true,
        },
        {
            name: 'position',
            type: 'relationship',
            relationTo: 'cultural-partner-positions',
            label: 'ตำแหน่ง',
            required: true,
            hasMany: false,
            admin: {
                description: 'เลือกตำแหน่งจากรายการ (สามารถเพิ่มใหม่ได้จากเมนู ตำแหน่งกรรมการองค์กรภาคี)',
            },
        },
        {
            name: 'positionOrder',
            type: 'number',
            label: 'ลำดับการแสดงผล',
            defaultValue: 99,
        },
        {
            name: 'partner',
            type: 'relationship',
            relationTo: 'cultural-partners',
            label: 'สังกัดองค์กรภาคีวัฒนธรรม',
            required: true,
            admin: {
                description: 'เลือกองค์กรภาคีที่สังกัด',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพ',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'เบอร์โทรศัพท์',
        },
        {
            name: 'isActive',
            type: 'checkbox',
            label: 'เปิดใช้งาน',
            defaultValue: true,
        },
    ],
}
