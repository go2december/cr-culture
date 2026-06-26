import type { CollectionConfig } from 'payload'

export const AwardGalleries: CollectionConfig = {
    slug: 'award-galleries',
    admin: {
        useAsTitle: 'caption',
        group: 'รางวัลเกียรติยศ',
        description: 'คลังภาพบรรยากาศงานของหมวดเยาวชนวัฒนธรรม',
        defaultColumns: ['year', 'caption', 'isHighlight'],
    },
    labels: {
        singular: 'ภาพบรรยากาศงาน',
        plural: 'ภาพบรรยากาศงาน',
    },
    fields: [
        {
            name: 'year',
            type: 'relationship',
            relationTo: 'award-years',
            label: 'ปี พ.ศ.',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพ',
            required: true,
        },
        {
            name: 'caption',
            type: 'text',
            label: 'คำอธิบายใต้ภาพ',
        },
        {
            name: 'isHighlight',
            type: 'checkbox',
            label: 'รูปเด่น',
            defaultValue: false,
        },
    ],
}
