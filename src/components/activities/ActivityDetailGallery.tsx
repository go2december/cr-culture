'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import CmsImage from '@/components/CmsImage'

export interface DetailGalleryItem {
    imageSrc: string
    caption: string
}

interface ActivityDetailGalleryProps {
    items: DetailGalleryItem[]
    activityTitle: string
}

export const ActivityDetailGallery: React.FC<ActivityDetailGalleryProps> = ({
    items,
    activityTitle,
}) => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

    const handlePrev = () => {
        setSelectedPhotoIndex((prev) => {
            if (prev === null) return null
            return prev > 0 ? prev - 1 : items.length - 1
        })
    }

    const handleNext = () => {
        setSelectedPhotoIndex((prev) => {
            if (prev === null) return null
            return prev < items.length - 1 ? prev + 1 : 0
        })
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPhotoIndex === null) return
            if (e.key === 'Escape') {
                setSelectedPhotoIndex(null)
            } else if (e.key === 'ArrowRight') {
                setSelectedPhotoIndex((prev) => {
                    if (prev === null) return null
                    return prev < items.length - 1 ? prev + 1 : 0
                })
            } else if (e.key === 'ArrowLeft') {
                setSelectedPhotoIndex((prev) => {
                    if (prev === null) return null
                    return prev > 0 ? prev - 1 : items.length - 1
                })
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedPhotoIndex, items.length])

    return (
        <div className="mt-12 pt-10 border-t border-base-100 reveal-soft stagger-1">
            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                แกลเลอรี
            </h3>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.slice(0, 9).map((item, index) => {
                    const isLastVisible = index === 8 && items.length > 9
                    const remainingCount = items.length - 9

                    return (
                        <div
                            key={index}
                            onClick={() => setSelectedPhotoIndex(index)}
                            className="group relative aspect-square bg-slate-100 rounded-2xl border border-base-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-300"
                        >
                            <CmsImage
                                src={item.imageSrc}
                                alt={item.caption || activityTitle}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {isLastVisible ? (
                                <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center text-center p-4 transition-colors group-hover:bg-black/55">
                                    <span className="text-white text-3xl font-bold font-display">
                                        +{remainingCount}
                                    </span>
                                    <span className="text-white/80 text-xs font-medium mt-1 font-sans">
                                        ดูรูปภาพเพิ่มเติม
                                    </span>
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <span className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 transform scale-90 group-hover:scale-100 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
                                        </svg>
                                    </span>
                                    {item.caption && (
                                        <p className="text-white text-xs font-medium font-sans truncate drop-shadow-md">
                                            {item.caption}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Lightbox / Modal */}
            {selectedPhotoIndex !== null && createPortal(
                <div
                    className="fixed inset-0 z-9999 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300 animate-fade-in"
                    onClick={() => setSelectedPhotoIndex(null)}
                >
                    {/* Header Controls */}
                    <div className="flex justify-between items-center w-full z-10 select-none">
                        <div className="text-white/60 text-xs font-light font-sans">
                            ภาพที่ {selectedPhotoIndex + 1} จาก {items.length}
                        </div>
                        <button
                            onClick={() => setSelectedPhotoIndex(null)}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
                            aria-label="ปิดกล่องรูปภาพ"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative flex-grow flex items-center justify-center my-4 w-full h-full max-h-[80vh]">
                        {/* Prev Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handlePrev()
                            }}
                            className="absolute left-0 sm:left-4 z-10 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-all duration-200 cursor-pointer backdrop-blur-xs select-none"
                            aria-label="รูปภาพก่อนหน้า"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Interactive Image Frame */}
                        <div
                            className="relative w-full h-full max-w-7xl select-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CmsImage
                                src={items[selectedPhotoIndex].imageSrc}
                                alt={items[selectedPhotoIndex].caption || activityTitle}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleNext()
                            }}
                            className="absolute right-0 sm:right-4 z-10 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-all duration-200 cursor-pointer backdrop-blur-xs select-none"
                            aria-label="รูปภาพถัดไป"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom Captions & Details */}
                    <div
                        className="w-full max-w-4xl mx-auto text-center z-10 p-4 rounded-xl bg-black/30 border border-white/5 backdrop-blur-md select-text"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="text-white text-base sm:text-lg font-semibold font-display mb-1">
                            {items[selectedPhotoIndex].caption || `ภาพบรรยากาศงาน ${activityTitle}`}
                        </p>
                        <span className="text-xs text-white/60 font-sans font-light">
                            📂 {activityTitle}
                        </span>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}
