import type { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: 'ผู้ใช้งาน',
        plural: 'ผู้ใช้งาน',
    },
    auth: true,
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'name', 'role'],
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
            required: true,
            defaultValue: 'editor',
            options: [
                { label: 'ผู้ดูแลระบบ', value: 'admin' },
                { label: 'บรรณาธิการ', value: 'editor' },
                { label: 'ผู้เขียน', value: 'author' },
            ],
        },
    ],
};

export default Users;
