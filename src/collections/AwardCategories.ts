import type { CollectionConfig } from 'payload'

export const AwardCategories: CollectionConfig = {
    slug: 'award-categories',
    admin: {
        useAsTitle: 'subType',
        group: 'รางวัลเกียรติยศ',
        description: 'ด้านและประเภทรางวัลของคนดีศรีเชียงราย',
        defaultColumns: ['mainPillar', 'subType'],
    },
    labels: {
        singular: 'ประเภทรางวัล',
        plural: 'ประเภทรางวัล',
    },
    fields: [
        {
            name: 'mainPillar',
            type: 'select',
            label: 'ด้านหลักของรางวัล',
            required: true,
            options: [
                {
                    label: 'ด้านผู้ทำคุณประโยชน์ทางวัฒนธรรม',
                    value: 'cultural-contributor',
                },
                {
                    label: 'ด้านผู้มีผลงานดีเด่นทางวัฒนธรรม',
                    value: 'outstanding-cultural-achievement',
                },
            ],
        },
        {
            name: 'subType',
            type: 'text',
            label: 'ประเภทผู้รับรางวัล',
            required: true,
        },
    ],
}
