import type { CollectionConfig } from 'payload'

export const BoardPositions: CollectionConfig = {
    slug: 'board-positions',
    admin: {
        useAsTitle: 'title',
        group: 'ตั้งค่าระบบ',
        description: 'จัดการข้อมูลตำแหน่งของคณะกรรมการ',
    },
    labels: {
        singular: 'ตำแหน่งคณะกรรมการ',
        plural: 'ตำแหน่งคณะกรรมการ',
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
                description: 'ใช้สำหรับเรียงลำดับการแสดงผล เช่น ประธาน = 1, รองประธาน = 2, เลขานุการ = 5',
            },
        },
    ],
}
