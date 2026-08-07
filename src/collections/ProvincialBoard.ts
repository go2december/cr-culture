import type { CollectionConfig } from 'payload'

export const ProvincialBoard: CollectionConfig = {
    slug: 'provincial-board',
    admin: {
        useAsTitle: 'name',
        group: 'บุคลากร',
        description: 'คณะกรรมการสภาวัฒนธรรมจังหวัด',
        defaultColumns: ['sourceType', 'name', 'position', 'partner', 'district', 'positionOrder'],
    },
    labels: {
        singular: 'กรรมการจังหวัด',
        plural: 'คณะกรรมการจังหวัด',
    },
    fields: [
        {
            name: 'sourceType',
            type: 'select',
            label: 'แหล่งที่มาของข้อมูล',
            defaultValue: 'manual',
            options: [
                { label: 'ป้อนข้อมูลเอง', value: 'manual' },
                { label: 'ดึงจากประธานเครือข่ายองค์กรภาคีวัฒนธรรม', value: 'partner' },
                { label: 'ดึงจากประธานสภาวัฒนธรรมอำเภอ', value: 'district' },
            ],
            admin: {
                description: 'เลือกรูปแบบการใส่ข้อมูลกรรมการ (แบบป้อนเอง หรือ ดึงข้อมูลจากตำแหน่งประธานอัตโนมัติ)',
            },
        },
        {
            name: 'partner',
            type: 'relationship',
            relationTo: 'cultural-partners',
            label: 'ดึงข้อมูลจากประธานองค์กรภาคีวัฒนธรรม',
            admin: {
                condition: (data) => data?.sourceType === 'partner',
                description: 'เลือกองค์กรภาคีที่ต้องการดึงข้อมูลประธานมาเป็นกรรมการโดยอัตโนมัติ',
            },
        },
        {
            name: 'district',
            type: 'relationship',
            relationTo: 'districts',
            label: 'ดึงข้อมูลจากประธานอำเภอ',
            admin: {
                condition: (data) => data?.sourceType === 'district',
                description: 'เลือกอำเภอที่ต้องการดึงข้อมูลประธานสภาวัฒนธรรมอำเภอมาเป็นกรรมการโดยอัตโนมัติ',
            },
        },
        {
            name: 'name',
            type: 'text',
            label: 'ชื่อ-นามสกุล',
            validate: (val: unknown, { data }: { data: Record<string, unknown> }) => {
                if (data?.sourceType === 'district' || data?.sourceType === 'partner') return true
                if (typeof val !== 'string' || !val) return 'กรุณากรอกชื่อ-นามสกุล'
                return true
            },
            admin: {
                condition: (data) => data?.sourceType === 'manual',
            },
        },
        {
            name: 'position',
            type: 'relationship',
            relationTo: 'board-positions',
            label: 'ตำแหน่ง',
            required: true,
            hasMany: false,
            admin: {
                description: 'เลือกตำแหน่งจากรายการ (สามารถเพิ่มใหม่ได้จากเมนู ตำแหน่งคณะกรรมการ)',
            },
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
            admin: {
                condition: (data) => data?.sourceType === 'manual',
            },
        },
        {
            name: 'bio',
            type: 'textarea',
            label: 'ประวัติโดยย่อ',
            admin: {
                condition: (data) => data?.sourceType === 'manual',
            },
        },
        {
            name: 'phone',
            type: 'text',
            label: 'เบอร์โทรศัพท์',
            admin: {
                condition: (data) => data?.sourceType === 'manual',
            },
        },
        {
            name: 'email',
            type: 'email',
            label: 'อีเมล',
            admin: {
                condition: (data) => data?.sourceType === 'manual',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            label: 'เปิดใช้งาน',
            defaultValue: true,
        },
    ],
}
