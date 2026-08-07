import type { CollectionConfig } from 'payload'

export const CulturalPartnerPositions: CollectionConfig = {
    slug: 'cultural-partner-positions',
    admin: {
        useAsTitle: 'title',
        group: 'ตั้งค่าระบบ',
        description: 'จัดการข้อมูลตำแหน่งของคณะกรรมการเครือข่ายองค์กรภาคีวัฒนธรรม',
    },
    labels: {
        singular: 'ตำแหน่งกรรมการองค์กรภาคี',
        plural: 'ตำแหน่งกรรมการองค์กรภาคี',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'ชื่อตำแหน่ง',
            required: true,
            unique: true,
        },
        {
            name: 'level',
            type: 'number',
            label: 'ระดับความสำคัญ (1 คือสูงสุด เช่น ประธานเครือข่ายองค์กรภาคี)',
            defaultValue: 99,
            admin: {
                description: 'ใช้สำหรับเรียงลำดับการแสดงผล เช่น ประธาน = 1, รองประธาน = 2',
            },
        },
    ],
}
