import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { ProvincialBoard } from './collections/ProvincialBoard'
import { Districts } from './collections/Districts'
import { DistrictMembers } from './collections/DistrictMembers'
import { Activities } from './collections/Activities'
import { HeritageBlog } from './collections/HeritageBlog'
import { Tags } from './collections/Tags'
import { News } from './collections/News'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '- สภาวัฒนธรรมจังหวัดเชียงราย',
            favicon: '/favicon.ico',
            ogImage: '/og-image.png',
        },
    },
    editor: lexicalEditor(),
    collections: [
        Users,
        ProvincialBoard,
        Districts,
        DistrictMembers,
        Activities,
        HeritageBlog,
        Tags,
        News,
        Media,
    ],
    secret: process.env.PAYLOAD_SECRET || 'cr-culture-secret-key',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || 'mongodb://localhost:27017/crculture',
    }),
    cors: [
        'http://localhost:3000',
    ],
    upload: {
        limits: {
            fileSize: 10000000, // 10MB
        },
    },
})
