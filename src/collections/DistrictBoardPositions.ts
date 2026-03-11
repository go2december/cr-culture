import type { CollectionConfig } from 'payload'

export const DistrictBoardPositions: CollectionConfig = {
    slug: 'district-board-positions',
    admin: {
        useAsTitle: 'title',
        group: 'ตั้งค่าระบบ',
        description: 'จัดการข้อมูลตำแหน่งของคณะกรรมการระดับอำเภอ',
    },
    labels: {
        singular: 'ตำแหน่งกรรมการอำเภอ',
        plural: 'ตำแหน่งกรรมการอำเภอ',
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
            label: 'ระดับความสำคัญ (1 คือสูงสุด)',
            defaultValue: 99,
            admin: {
                description: 'ใช้สำหรับเรียงลำดับการแสดงผล เช่น ประธาน = 1, รองประธาน = 2',
            },
        },
    ],
}
