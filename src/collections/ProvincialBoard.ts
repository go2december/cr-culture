import type { CollectionConfig } from 'payload'

export const ProvincialBoard: CollectionConfig = {
    slug: 'provincial-board',
    admin: {
        useAsTitle: 'name',
        group: 'บุคลากร',
        description: 'คณะกรรมการสภาวัฒนธรรมจังหวัด',
    },
    labels: {
        singular: 'กรรมการจังหวัด',
        plural: 'คณะกรรมการจังหวัด',
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
            admin: {
                description: 'ค่าน้อย = แสดงก่อน',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพ',
        },
        {
            name: 'bio',
            type: 'textarea',
            label: 'ประวัติโดยย่อ',
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
            name: 'isActive',
            type: 'checkbox',
            label: 'เปิดใช้งาน',
            defaultValue: true,
        },
    ],
}
