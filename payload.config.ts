import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    collections: [
        // Collections will be added here
    ],
    admin: {
        // Admin config
    },
    editor: lexicalEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || 'mongodb://127.0.0.1/cr-culture',
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
});
