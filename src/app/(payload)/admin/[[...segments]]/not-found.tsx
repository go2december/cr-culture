import config from '@payload-config'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

const NotFound = (props: { params: Promise<{ segments: string[] }> }) => NotFoundPage({ config, importMap, params: props.params, searchParams: Promise.resolve({}) })

export default NotFound
