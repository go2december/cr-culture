import type { CollectionConfig } from 'payload/types';

export const Districts: CollectionConfig = {
    slug: 'districts',
    labels: {
        singular: 'อำเภอ',
        plural: 'อำเภอ',
    },
    admin: {
        useAsTitle: 'name_th',
        defaultColumns: ['name_th', 'name_en', 'code'],
    },
    fields: [
        {
            name: 'code',
            type: 'text',
            required: true,
            unique: true,
            label: 'รหัสอำเภอ',
        },
        {
            name: 'name_th',
            type: 'text',
            required: true,
            label: 'ชื่อภาษาไทย',
        },
        {
            name: 'name_en',
            type: 'text',
            required: true,
            label: 'ชื่อภาษาอังกฤษ',
        },
        {
            name: 'description',
            type: 'richText',
            label: 'รายละเอียด',
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
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'รูปภาพประจำอำเภอ',
        },
    ],
};

// 18 Districts of Chiang Rai for seeding
export const CHIANG_RAI_DISTRICTS = [
    { code: '5701', name_th: 'เมืองเชียงราย', name_en: 'Mueang Chiang Rai' },
    { code: '5702', name_th: 'เวียงชัย', name_en: 'Wiang Chai' },
    { code: '5703', name_th: 'เชียงของ', name_en: 'Chiang Khong' },
    { code: '5704', name_th: 'เทิง', name_en: 'Thoeng' },
    { code: '5705', name_th: 'พาน', name_en: 'Phan' },
    { code: '5706', name_th: 'ป่าแดด', name_en: 'Pa Daet' },
    { code: '5707', name_th: 'แม่จัน', name_en: 'Mae Chan' },
    { code: '5708', name_th: 'เชียงแสน', name_en: 'Chiang Saen' },
    { code: '5709', name_th: 'แม่สาย', name_en: 'Mae Sai' },
    { code: '5710', name_th: 'แม่สรวย', name_en: 'Mae Suai' },
    { code: '5711', name_th: 'เวียงป่าเป้า', name_en: 'Wiang Pa Pao' },
    { code: '5712', name_th: 'พญาเม็งราย', name_en: 'Phaya Mengrai' },
    { code: '5713', name_th: 'เวียงแก่น', name_en: 'Wiang Kaen' },
    { code: '5714', name_th: 'ขุนตาล', name_en: 'Khun Tan' },
    { code: '5715', name_th: 'แม่ฟ้าหลวง', name_en: 'Mae Fa Luang' },
    { code: '5716', name_th: 'แม่ลาว', name_en: 'Mae Lao' },
    { code: '5717', name_th: 'เวียงเชียงรุ้ง', name_en: 'Wiang Chiang Rung' },
    { code: '5718', name_th: 'ดอยหลวง', name_en: 'Doi Luang' },
];

export default Districts;
