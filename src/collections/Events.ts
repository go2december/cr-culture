import type { CollectionConfig } from 'payload/types';

// ฮีตสิบสอง - ประเพณี 12 เดือนล้านนา
export const HEET_12_MONTHS = [
    { label: 'เดือนเกี๋ยง (เดือน 1) - บุญกฐิน', value: 'month_1' },
    { label: 'เดือนยี่ (เดือน 2) - บุญยี่เป็ง', value: 'month_2' },
    { label: 'เดือนสาม - บุญข้าวจี่', value: 'month_3' },
    { label: 'เดือนสี่ - บุญผะเหวด', value: 'month_4' },
    { label: 'เดือนห้า - บุญสงกรานต์', value: 'month_5' },
    { label: 'เดือนหก - บุญบั้งไฟ', value: 'month_6' },
    { label: 'เดือนเจ็ด - บุญซำฮะ', value: 'month_7' },
    { label: 'เดือนแปด - บุญเข้าพรรษา', value: 'month_8' },
    { label: 'เดือนเก้า - บุญข้าวประดับดิน', value: 'month_9' },
    { label: 'เดือนสิบ - บุญข้าวสาก', value: 'month_10' },
    { label: 'เดือนสิบเอ็ด - บุญออกพรรษา', value: 'month_11' },
    { label: 'เดือนสิบสอง - บุญกฐิน', value: 'month_12' },
];

export const Events: CollectionConfig = {
    slug: 'events',
    labels: {
        singular: 'กิจกรรม/ประเพณี',
        plural: 'กิจกรรม/ประเพณี',
    },
    admin: {
        useAsTitle: 'title_th',
        defaultColumns: ['title_th', 'eventType', 'heet12Month', 'startDate', 'status'],
    },
    fields: [
        {
            name: 'title_th',
            type: 'text',
            required: true,
            label: 'ชื่องาน (ภาษาไทย)',
        },
        {
            name: 'title_en',
            type: 'text',
            label: 'ชื่องาน (ภาษาอังกฤษ)',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (URL)',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'eventType',
            type: 'select',
            required: true,
            label: 'ประเภทกิจกรรม',
            options: [
                { label: 'ประเพณีฮีตสิบสอง', value: 'heet_12' },
                { label: 'เทศกาลประจำปี', value: 'annual_festival' },
                { label: 'งานวัด/งานบุญ', value: 'temple_fair' },
                { label: 'กิจกรรมวัฒนธรรม', value: 'cultural_activity' },
                { label: 'การแสดง/มหรสพ', value: 'performance' },
                { label: 'อื่นๆ', value: 'other' },
            ],
        },
        {
            name: 'heet12Month',
            type: 'select',
            label: 'ฮีตสิบสอง (ถ้ามี)',
            options: HEET_12_MONTHS,
            admin: {
                condition: (data) => data?.eventType === 'heet_12',
            },
        },
        {
            name: 'description',
            type: 'richText',
            label: 'รายละเอียด',
        },
        {
            name: 'traditions',
            type: 'richText',
            label: 'ความเป็นมา/ความเชื่อ',
        },
        {
            name: 'startDate',
            type: 'date',
            label: 'วันที่เริ่ม',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'endDate',
            type: 'date',
            label: 'วันที่สิ้นสุด',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'isRecurring',
            type: 'checkbox',
            label: 'จัดทุกปี',
            defaultValue: true,
        },
        {
            name: 'location',
            type: 'group',
            label: 'สถานที่จัด',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: 'ชื่อสถานที่',
                },
                {
                    name: 'district',
                    type: 'relationship',
                    relationTo: 'districts',
                    label: 'อำเภอ',
                },
                {
                    name: 'address',
                    type: 'textarea',
                    label: 'ที่อยู่',
                },
                {
                    name: 'coordinates',
                    type: 'group',
                    label: 'พิกัด GPS',
                    fields: [
                        {
                            name: 'latitude',
                            type: 'number',
                            label: 'ละติจูด',
                        },
                        {
                            name: 'longitude',
                            type: 'number',
                            label: 'ลองจิจูด',
                        },
                    ],
                },
            ],
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพหลัก',
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'แกลเลอรี่รูปภาพ',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                    label: 'คำอธิบาย',
                },
            ],
        },
        {
            name: 'relatedHeritage',
            type: 'relationship',
            relationTo: 'cultural-heritage',
            hasMany: true,
            label: 'มรดกวัฒนธรรมที่เกี่ยวข้อง',
        },
        {
            name: 'status',
            type: 'select',
            label: 'สถานะ',
            defaultValue: 'upcoming',
            options: [
                { label: 'กำลังจะมาถึง', value: 'upcoming' },
                { label: 'กำลังจัดงาน', value: 'ongoing' },
                { label: 'จบแล้ว', value: 'completed' },
                { label: 'ยกเลิก', value: 'cancelled' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishStatus',
            type: 'select',
            label: 'สถานะการเผยแพร่',
            defaultValue: 'draft',
            options: [
                { label: 'ฉบับร่าง', value: 'draft' },
                { label: 'เผยแพร่', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
    ],
};

export default Events;
