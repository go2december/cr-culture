import type { MetadataRoute } from 'next'
import {
    getDistricts,
    getActivities,
    getHeritageBlogs,
    getNews,
    getKhonDeeAwards,
    getYouthAwardHistories,
    getWisdomAwards
} from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://cr-culture.com').replace(/\/$/, '')

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/about/board',
        '/activities',
        '/activities/calendar',
        '/districts',
        '/heritage',
        '/news',
        '/contact',
        '/privacy',
        '/terms',
        '/awards/khon-dee',
        '/awards/wisdom-awards',
        '/awards/youth-culture',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    // 2. Fetch Dynamic Routes from CMS
    // 2.1 Districts
    const districts = await getDistricts().catch(() => [])
    const districtRoutes = districts.map((district) => ({
        url: `${baseUrl}/districts/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // 2.2 Activities
    const activitiesRes = await getActivities({ limit: 100 }).catch(() => ({ docs: [] }))
    const activityRoutes = activitiesRes.docs.map((activity) => ({
        url: `${baseUrl}/activities/${activity.slug}`,
        lastModified: activity.date ? new Date(activity.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    // 2.3 Heritage Blogs
    const heritageRes = await getHeritageBlogs({ limit: 100 }).catch(() => ({ docs: [] }))
    const heritageRoutes = heritageRes.docs.map((blog) => ({
        url: `${baseUrl}/heritage/${blog.slug}`,
        lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    // 2.4 News
    const newsRes = await getNews({ limit: 100 }).catch(() => ({ docs: [] }))
    const newsRoutes = newsRes.docs.map((item) => ({
        url: `${baseUrl}/news/${item.slug}`,
        lastModified: item.date ? new Date(item.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    // 2.5 Khon Dee Awards
    const khonDeeRes = await getKhonDeeAwards({ limit: 100 }).catch(() => ({ docs: [] }))
    const khonDeeRoutes = khonDeeRes.docs.map((award) => ({
        url: `${baseUrl}/awards/khon-dee/${award.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    // 2.6 Wisdom Awards
    const wisdomRes = await getWisdomAwards({ limit: 100 }).catch(() => ({ docs: [] }))
    const wisdomRoutes = wisdomRes.docs.map((award) => ({
        url: `${baseUrl}/awards/wisdom-awards/${award.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    // 2.7 Youth Culture Awards
    const youthRes = await getYouthAwardHistories({ limit: 100 }).catch(() => ({ docs: [] }))
    const youthRoutes = youthRes.docs.map((award) => ({
        url: `${baseUrl}/awards/youth-culture/${award.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    return [
        ...staticRoutes,
        ...districtRoutes,
        ...activityRoutes,
        ...heritageRoutes,
        ...newsRoutes,
        ...khonDeeRoutes,
        ...wisdomRoutes,
        ...youthRoutes,
    ]
}
