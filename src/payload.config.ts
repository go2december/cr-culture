import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { ProvincialBoard } from './collections/ProvincialBoard'
import { BoardPositions } from './collections/BoardPositions'
import { DistrictBoardPositions } from './collections/DistrictBoardPositions'
import { Districts } from './collections/Districts'
import { DistrictMembers } from './collections/DistrictMembers'
import { Activities } from './collections/Activities'
import { HeritageBlog } from './collections/HeritageBlog'
import { Tags } from './collections/Tags'
import { News } from './collections/News'
import { Media } from './collections/Media'
import { AwardYears } from './collections/AwardYears'
import { AwardCategories } from './collections/AwardCategories'
import { KhonDeeAwards } from './collections/KhonDeeAwards'
import { Institutions } from './collections/Institutions'
import { Awardees } from './collections/Awardees'
import { YouthAwardHistories } from './collections/YouthAwardHistories'
import { WisdomCategories } from './collections/WisdomCategories'
import { WisdomAwards } from './collections/WisdomAwards'
import { YouthAwardCategories } from './collections/YouthAwardCategories'
import { Prefixes } from './collections/Prefixes'


// Globals
import { AboutPage } from './globals/AboutPage'
import { PageHeroes } from './globals/PageHeroes'
import { SiteSettings } from './globals/SiteSettings'
import { AnalyticsReport } from './globals/AnalyticsReport'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const localOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
]
const configuredServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
const configuredOrigins = [configuredServerUrl, ...localOrigins]

export default buildConfig({
    serverURL: configuredServerUrl,
    admin: {
        user: Users.slug,
        suppressHydrationWarning: true,
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
        AwardYears,
        AwardCategories,
        KhonDeeAwards,
        Institutions,
        Awardees,
        YouthAwardHistories,
        WisdomCategories,
        WisdomAwards,
        YouthAwardCategories,
        Prefixes,
    ],
    globals: [
        AboutPage,
        PageHeroes,
        SiteSettings,
        AnalyticsReport,
    ],
    secret: process.env.PAYLOAD_SECRET || 'cr-culture-secret-key',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || 'mongodb://localhost:27017/crculture',
    }),
    sharp,
    cors: Array.from(new Set(configuredOrigins)),
    upload: {
        limits: {
            fileSize: 10000000, // 10MB
        },
    },
})
