import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users.ts'
import { ProvincialBoard } from './collections/ProvincialBoard.ts'
import { BoardPositions } from './collections/BoardPositions.ts'
import { DistrictBoardPositions } from './collections/DistrictBoardPositions.ts'
import { Districts } from './collections/Districts.ts'
import { DistrictMembers } from './collections/DistrictMembers.ts'
import { Activities } from './collections/Activities.ts'
import { HeritageBlog } from './collections/HeritageBlog.ts'
import { Tags } from './collections/Tags.ts'
import { News } from './collections/News.ts'
import { Media } from './collections/Media.ts'

// Globals
import { AboutPage } from './globals/AboutPage.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '- สภาวัฒนธรรมจังหวัดเชียงราย',
            openGraph: {
                images: [
                    {
                        url: '/og-image.png',
                    },
                ],
            },
        },
        components: {
            graphics: {
                Logo: '@/components/admin/Logo#Logo',
                Icon: '@/components/admin/Icon#Icon',
            },
        },
    },
    editor: lexicalEditor(),
    collections: [
        Users,
        BoardPositions,
        DistrictBoardPositions,
        ProvincialBoard,
        Districts,
        DistrictMembers,
        Activities,
        HeritageBlog,
        Tags,
        News,
        Media,
    ],
    globals: [
        AboutPage,
    ],
    secret: process.env.PAYLOAD_SECRET || 'cr-culture-secret-key',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || 'mongodb://localhost:27017/crculture',
    }),
    sharp,
    cors: [
        'http://localhost:3000',
    ],
    upload: {
        limits: {
            fileSize: 10000000, // 10MB
        },
    },
})
