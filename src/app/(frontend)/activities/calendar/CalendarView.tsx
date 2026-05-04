'use client'

import Link from 'next/link'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type GalleryItemLike, type MediaLike } from '@/lib/media'
import type { PublicCalendarActivity } from '@/lib/public-organization'

interface CalendarViewProps {
    year: number
    month: number
    activities: PublicCalendarActivity[]
    districtMap: Map<string | number, string>
}

export default function CalendarView({ year, month, activities, districtMap }: CalendarViewProps) {
    const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]

    // สร้างข้อมูลปฏิทิน
    const daysInMonth = new Date(year, month, 0).getDate()
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    // จัดกลุ่มกิจกรรมตามวันที่
    const activitiesByDate = new Map<string, PublicCalendarActivity[]>()
    activities.forEach((activity) => {
        const dateKey = new Date(activity.date).getDate().toString()
        if (!activitiesByDate.has(dateKey)) {
            activitiesByDate.set(dateKey, [])
        }
        activitiesByDate.get(dateKey)!.push(activity)
    })

    return (
        <>
            {/* Month Navigation */}
            <div className="bg-white rounded-3xl shadow-sm border border-base-200 p-6 mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <Link
                        href={`/activities/calendar?year=${month === 1 ? year - 1 : year}&month=${month === 1 ? 12 : month - 1}`}
                        className="inline-flex min-h-11 items-center gap-2 text-primary hover:text-secondary transition-colors font-medium px-4 py-2 rounded-xl hover:bg-slate-50"
                    >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        เดือนก่อนหน้า
                    </Link>

                    <div className="flex items-center gap-4">
                        <select
                            value={month}
                            className="select select-bordered rounded-xl font-medium text-primary"
                            onChange={(e) => {
                                const newMonth = Number(e.target.value)
                                window.location.href = `/activities/calendar?year=${year}&month=${newMonth}`
                            }}
                        >
                            {monthNames.map((name, index) => (
                                <option key={index} value={index + 1}>{name} {year}</option>
                            ))}
                        </select>

                        <select
                            value={year}
                            className="select select-bordered rounded-xl font-medium text-primary"
                            onChange={(e) => {
                                const newYear = Number(e.target.value)
                                window.location.href = `/activities/calendar?year=${newYear}&month=${month}`
                            }}
                        >
                            {[year - 1, year, year + 1].map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <Link
                        href={`/activities/calendar?year=${month === 12 ? year + 1 : year}&month=${month === 12 ? 1 : month + 1}`}
                        className="inline-flex min-h-11 items-center gap-2 text-primary hover:text-secondary transition-colors font-medium px-4 py-2 rounded-xl hover:bg-slate-50"
                    >
                        เดือนถัดไป
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                </div>

                {/* Quick Jump to Current Month */}
                {(year !== new Date().getFullYear() || month !== new Date().getMonth() + 1) && (
                    <div className="text-center mt-4">
                        <Link
                            href={`/activities/calendar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`}
                            className="inline-flex min-h-11 items-center text-sm font-medium text-secondary hover:underline"
                        >
                            กลับสู่เดือนปัจจุบัน
                        </Link>
                    </div>
                )}
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-3xl shadow-sm border border-base-200 overflow-hidden mb-8">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 bg-primary/5 border-b border-base-200">
                    {['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'].map((day, index) => (
                        <div
                            key={index}
                            className={`py-4 text-center font-bold text-primary ${index >= 5 ? 'text-secondary' : ''}`}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                    {/* Empty cells for days before the first day of month */}
                    {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                        <div key={`empty-${index}`} className="min-h-30 bg-slate-50/50 border-r border-b border-base-100" />
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1
                        const dateKey = day.toString()
                        const dayActivities = activitiesByDate.get(dateKey) || []
                        const isToday = new Date().getDate() === day &&
                                       new Date().getMonth() === month - 1 &&
                                       new Date().getFullYear() === year
                        const isWeekend = (adjustedFirstDay + index) % 7 >= 5

                        return (
                            <div
                                key={day}
                                className={`min-h-30 p-2 border-r border-b border-base-100 transition-colors ${
                                    isToday ? 'bg-secondary/5' : isWeekend ? 'bg-slate-50/30' : 'bg-white'
                                }`}
                            >
                                <div className={`text-sm font-medium mb-1 ${
                                    isToday
                                        ? 'bg-secondary text-white w-7 h-7 rounded-full flex items-center justify-center'
                                        : isWeekend
                                            ? 'text-secondary'
                                            : 'text-base-content'
                                }`}>
                                    {day}
                                </div>

                                {/* Activity Indicators */}
                                <div className="space-y-1 overflow-y-auto max-h-20">
                                    {dayActivities.slice(0, 3).map((activity) => (
                                        <Link
                                            key={activity.id}
                                            href={`/activities/${activity.slug || activity.id}`}
                                            className={`inline-flex min-h-11 items-center w-full text-xs p-1.5 rounded-md truncate transition-colors ${
                                                activity.level === 'province'
                                                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                                    : 'bg-secondary/20 text-secondary-dark hover:bg-secondary/30'
                                            }`}
                                            title={activity.title}
                                        >
                                            {activity.title}
                                        </Link>
                                    ))}
                                    {dayActivities.length > 3 && (
                                        <div className="text-xs text-base-content/50 text-center">
                                            +{dayActivities.length - 3} กิจกรรม
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    {/* Fill remaining cells to complete the grid */}
                    {Array.from({ length: 42 - (adjustedFirstDay + daysInMonth) }).map((_, index) => (
                        <div key={`empty-end-${index}`} className="min-h-30 bg-slate-50/50 border-r border-b border-base-100" />
                    ))}
                </div>
            </div>

            {/* Activity List for Selected Month */}
            <div className="bg-white rounded-3xl shadow-sm border border-base-200 p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 font-display flex items-center gap-3">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                        <path d="M12 2v4" />
                        <path d="m16.2 7.8 2.9-2.9" />
                        <path d="M18 12h4" />
                        <path d="m16.2 16.2 2.9 2.9" />
                        <path d="M12 18v4" />
                        <path d="m4.9 19.1 2.9-2.9" />
                        <path d="M2 12h4" />
                        <path d="m4.9 4.9 2.9 2.9" />
                    </svg>
                    กิจกรรมทั้งหมดในเดือน {monthNames[month - 1]} {year}
                </h2>

                {activities.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((activity) => {
                                const imageUrl = resolveMediaUrl(activity.coverImage, activity.gallery)
                                const imageAlt = resolveMediaAlt(activity.coverImage, activity.title, activity.gallery)
                                const activityDate = new Date(activity.date)

                                return (
                                    <div
                                        key={activity.id}
                                        className="card bg-slate-50 rounded-2xl overflow-hidden border border-base-200 hover:shadow-md transition-all group"
                                    >
                                        <div className="aspect-video bg-slate-200 relative overflow-hidden">
                                            {imageUrl ? (
                                                <CmsImage
                                                    src={imageUrl}
                                                    alt={imageAlt}
                                                    fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl bg-linear-to-br from-primary/10 to-secondary/10">
                                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                                        <path d="M16 2v4" />
                                                        <path d="M8 2v4" />
                                                        <path d="M3 10h18" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-md rounded-xl overflow-hidden text-center">
                                                <div className="bg-secondary text-primary-dark text-xs font-bold py-1 px-2 uppercase tracking-wider">
                                                    {activityDate.toLocaleDateString('th-TH', { month: 'short' })}
                                                </div>
                                                <div className="text-lg font-bold text-primary py-1 px-3 font-display">
                                                    {activityDate.getDate()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-2 ${
                                                activity.level === 'province'
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-secondary/20 text-secondary-dark'
                                            }`}>
                                                {activity.level === 'province' ? 'ระดับจังหวัด' : `ระดับอำเภอ`}
                                            </span>
                                            <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {activity.title}
                                            </h3>
                                            {activity.location && (
                                                <p className="text-xs text-base-content/60 flex items-center gap-1 mb-3">
                                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                                    {activity.location}
                                                </p>
                                            )}
                                            <Link
                                                href={`/activities/${activity.slug || activity.id}`}
                                                className="text-sm font-semibold text-primary hover:text-secondary transition-colors inline-flex min-h-11 items-center gap-1"
                                            >
                                                ดูรายละเอียด
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <span className="mb-4 block opacity-50">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-base-content/40">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4" />
                                <path d="M8 2v4" />
                                <path d="M3 10h18" />
                            </svg>
                        </span>
                        <h3 className="text-xl font-bold text-base-content/70 mb-2">ไม่มีกิจกรรมในเดือนนี้</h3>
                        <p className="text-base-content/50">กิจกรรมและงานประเพณีจะได้รับการอัปเดตในเร็วๆ นี้</p>
                    </div>
                )}
            </div>
        </>
    )
}


