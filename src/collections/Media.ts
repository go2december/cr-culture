import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        group: 'ระบบ',
        description: 'คลังสื่อและไฟล์',
    },
    labels: {
        singular: 'สื่อ',
        plural: 'คลังสื่อ',
    },
    upload: {
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 432,
                position: 'centre',
            },
            {
                name: 'cover',
                width: 1920,
                height: 1080,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: [
            'image/*',
            'application/pdf',
            'video/mp4',
            'video/webm',
        ],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: 'ข้อความทดแทน (Alt Text)',
        },
        {
            name: 'caption',
            type: 'text',
            label: 'คำบรรยาย',
        },
    ],
}
