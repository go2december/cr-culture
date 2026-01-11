import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Collections
import { Users } from './src/collections/Users';
import { Districts } from './src/collections/Districts';
import { CulturalHeritage } from './src/collections/CulturalHeritage';
import { Scholars } from './src/collections/Scholars';
import { Events } from './src/collections/Events';
import { Media } from './src/collections/Media';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    collections: [
        Users,
        Media,
        Districts,
        CulturalHeritage,
        Scholars,
        Events,
    ],
    admin: {
        user: 'users',
        meta: {
            titleSuffix: '- สภาวัฒนธรรมจังหวัดเชียงราย',
        },
    },
    editor: lexicalEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || 'mongodb://mongo:27017/cr-culture',
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
});

