import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'ตั้งค่าเว็บไซต์',
    admin: {
        group: 'ระบบ',
        description: 'ตั้งค่าทั่วไปของเว็บไซต์ เช่น โหมดสีเริ่มต้น',
    },
    fields: [
        {
            name: 'defaultTheme',
            label: 'โหมดสีเริ่มต้น (สำหรับผู้เข้าชมใหม่)',
            type: 'select',
            options: [
                { label: 'โหมดสีปกติ (สว่าง)', value: 'normal' },
                { label: 'โหมดไว้ทุกข์ (สีเทาขาวดำ)', value: 'mourning' },
            ],
            defaultValue: 'normal',
            required: true,
        },
    ],
}
