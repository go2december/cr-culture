import type { GlobalConfig } from 'payload'

export const AnalyticsReport: GlobalConfig = {
    slug: 'analytics-report',
    label: 'รายงานสถิติ',
    admin: {
        group: 'ระบบวิเคราะห์สถิติ',
        description: 'รายงานวิเคราะห์การเข้าชมเว็บไซต์ด้วย Umami Analytics',
        components: {
            views: {
                edit: {
                    default: {
                        Component: '@/components/admin/AnalyticsView#AnalyticsView',
                    },
                },
            },
        },
    },
    access: {
        read: ({ req: { user } }) => !!user && user.role === 'admin',
        update: () => false,
    },
    fields: [],
}
