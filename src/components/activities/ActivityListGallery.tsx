'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import CmsImage from '@/components/CmsImage'

export interface ActivityGalleryCard {
    id: string
    title: string
    slug: string | null | undefined
    coverImageSrc: string
    photoCount: number
    date: string
}

interface ActivityListGalleryProps {
    items: ActivityGalleryCard[]
}

const ITEMS_PER_PAGE = 12

export const ActivityListGallery: React.FC<ActivityListGalleryProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Filter items based on search term
    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )


    // Format display date
    const formatThaiDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            const formatter = new Intl.DateTimeFormat('th-TH', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })
            return formatter.format(date)
        } catch {
            return dateString
        }
    }

    return (
        <div className="w-full">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-xs border border-base-200">
                <div className="w-full sm:max-w-md relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อกิจกรรม..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="input input-bordered w-full pl-10 rounded-xl font-sans text-sm focus:outline-hidden focus:border-primary"
                    />
                </div>
                <div className="text-sm text-base-content/60 font-light">
                    พบทั้งหมด <span className="font-semibold text-primary">{filteredItems.length}</span> กิจกรรมที่มีรูปภาพ
                </div>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-base-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-16 h-16 mx-auto text-slate-300 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <p className="text-lg font-medium text-base-content/70">ไม่พบกิจกรรมที่มีรูปภาพตามคำค้นหา</p>
                    <p className="text-sm text-base-content/50 mt-1 font-light">กรุณาลองป้อนคำค้นหาอื่นใหม่</p>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/activities/gallery/${item.slug}`}
                        className="group bg-white rounded-3xl overflow-hidden border border-base-200 shadow-xs hover:shadow-lg hover:border-primary/25 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                    >
                        {/* Cover Frame */}
                        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                            <CmsImage
                                src={item.coverImageSrc}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Photo Count Tag */}
                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                                {item.photoCount} ภาพ
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-3 font-display group-hover:text-secondary-dark transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="text-xs font-light text-base-content/40 flex items-center gap-1.5 pt-4 border-t border-base-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                {formatThaiDate(item.date)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                    <div className="join bg-white border border-base-200 rounded-xl shadow-xs">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="join-item btn btn-ghost btn-md font-sans text-sm font-medium"
                        >
                            « ก่อนหน้า
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`join-item btn btn-md font-sans text-sm ${currentPage === i + 1 ? 'btn-primary text-white' : 'btn-ghost'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="join-item btn btn-ghost btn-md font-sans text-sm font-medium"
                        >
                            ถัดไป »
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
