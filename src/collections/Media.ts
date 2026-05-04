import type { CollectionConfig } from 'payload'

const optimizeImageUploadToWebp = ({ req, operation }: { req: any; operation: string }) => {
    if (operation !== 'create' && operation !== 'update') {
        return
    }

    const file = req.file

    if (!file?.mimeType?.startsWith('image/')) {
        return
    }

    const originalName = file.name ?? 'image'
    const baseName = originalName.replace(/\.[^.]+$/, '')

    file.name = `${baseName}.webp`
    file.extension = 'webp'
    file.mimeType = 'image/webp'
}

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    hooks: {
        beforeOperation: [optimizeImageUploadToWebp],
    },
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
        formatOptions: {
            format: 'webp',
            options: {
                quality: 82,
            },
        },
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
