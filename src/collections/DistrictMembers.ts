import type { CollectionConfig } from 'payload'

export const DistrictMembers: CollectionConfig = {
    slug: 'district-members',
    admin: {
        useAsTitle: 'name',
        group: 'บุคลากร',
        description: 'กรรมการสภาวัฒนธรรมระดับอำเภอ',
    },
    labels: {
        singular: 'กรรมการอำเภอ',
        plural: 'กรรมการอำเภอ',
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
            type: 'text',
            label: 'ตำแหน่ง',
            required: true,
        },
        {
            name: 'positionOrder',
            type: 'number',
            label: 'ลำดับการแสดงผล',
            defaultValue: 99,
        },
        {
            name: 'district',
            type: 'relationship',
            relationTo: 'districts',
            label: 'สังกัดอำเภอ',
            required: true,
            admin: {
                description: 'เลือกอำเภอที่สังกัด',
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
