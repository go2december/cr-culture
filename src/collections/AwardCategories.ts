import type { CollectionConfig } from 'payload'

const pillarLabels: Record<string, string> = {
    'cultural-contributor': 'ด้านผู้ทำคุณประโยชน์ทางวัฒนธรรม',
    'outstanding-cultural-achievement': 'ด้านผู้มีผลงานดีเด่นทางวัฒนธรรม',
}

export const AwardCategories: CollectionConfig = {
    slug: 'award-categories',
    admin: {
        useAsTitle: 'title',
        group: 'รางวัลเกียรติยศ',
        description: 'ด้านและประเภทรางวัลของคนดีศรีเชียงราย',
        defaultColumns: ['mainPillar', 'subType'],
    },
    hooks: {
        beforeChange: [
            ({ data }) => {
                if (data) {
                    const pillarLabel = pillarLabels[data.mainPillar] || data.mainPillar
                    data.title = `${pillarLabel} / ${data.subType}`
                }
                return data
            }
        ]
    },
    labels: {
        singular: 'ประเภทรางวัล',
        plural: 'ประเภทรางวัล',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            admin: {
                hidden: true,
            },
        },
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
