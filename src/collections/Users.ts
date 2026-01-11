import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
        group: 'ระบบ',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'ชื่อ-นามสกุล',
        },
        {
            name: 'role',
            type: 'select',
            label: 'บทบาท',
            options: [
                { label: 'ผู้ดูแลระบบ', value: 'admin' },
                { label: 'บรรณาธิการ', value: 'editor' },
                { label: 'ผู้ใช้ทั่วไป', value: 'user' },
            ],
            defaultValue: 'user',
            required: true,
        },
    ],
}
