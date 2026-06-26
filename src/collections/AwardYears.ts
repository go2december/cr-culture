import type { CollectionConfig } from 'payload'

export const AwardYears: CollectionConfig = {
    slug: 'award-years',
    admin: {
        useAsTitle: 'buddhistYear',
        group: 'รางวัลเกียรติยศ',
        description: 'ปี พ.ศ. ที่จัดงานรางวัลเกียรติยศ',
        defaultColumns: ['buddhistYear', 'announcementDate', 'ceremonyDate'],
    },
    labels: {
        singular: 'ปีที่จัดงาน',
        plural: 'ปีที่จัดงาน',
    },
    fields: [
        {
            name: 'buddhistYear',
            type: 'number',
            label: 'ปี พ.ศ.',
            required: true,
            unique: true,
        },
        {
            name: 'announcementDate',
            type: 'date',
            label: 'วันที่ประกาศผล',
        },
        {
            name: 'ceremonyDate',
            type: 'date',
            label: 'วัน-เวลาพิธีมอบรางวัล',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'location',
            type: 'text',
            label: 'สถานที่จัดพิธี',
        },
        {
            name: 'presidentName',
            type: 'text',
            label: 'ชื่อประธานผู้ลงนาม',
            defaultValue: 'ดร.สลักจฤฎดิ์ ติยะไพรัช',
        },
    ],
}
