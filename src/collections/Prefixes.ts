import type { CollectionConfig } from 'payload'

export const Prefixes: CollectionConfig = {
    slug: 'prefixes',
    admin: {
        useAsTitle: 'title',
        group: 'รางวัลเกียรติยศ',
        description: 'จัดการคำนำหน้า/ยศ (เช่น นาย, นาง, นางสาว, พ่อครู, แม่ครู)',
        defaultColumns: ['title', 'createdAt'],
    },
    labels: {
        singular: 'คำนำหน้า',
        plural: 'คำนำหน้า',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'คำนำหน้า',
            required: true,
            unique: true,
        },
    ],
}
