import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: 'สื่อ',
        plural: 'สื่อ',
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
                height: 480,
                position: 'centre',
            },
            {
                name: 'hero',
                width: 1920,
                height: 1080,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'video/mp4',
            'video/webm',
            'video/ogg',
            'audio/mpeg',
            'audio/ogg',
            'application/pdf',
        ],
    },
    admin: {
        useAsTitle: 'alt',
        defaultColumns: ['filename', 'alt', 'mediaType', 'updatedAt'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
            label: 'คำอธิบายรูปภาพ (Alt Text)',
        },
        {
            name: 'caption',
            type: 'textarea',
            label: 'คำบรรยาย',
        },
        {
            name: 'mediaType',
            type: 'select',
            label: 'ประเภทสื่อ',
            defaultValue: 'image',
            options: [
                { label: 'รูปภาพ', value: 'image' },
                { label: 'วิดีโอ', value: 'video' },
                { label: 'เสียง', value: 'audio' },
                { label: 'เอกสาร', value: 'document' },
            ],
        },
        {
            name: 'credit',
            type: 'text',
            label: 'เครดิต/ที่มา',
        },
        {
            name: 'tags',
            type: 'array',
            label: 'แท็ก',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
    ],
};

export default Media;
