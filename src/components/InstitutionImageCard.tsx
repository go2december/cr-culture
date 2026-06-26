'use client'

import { useState } from 'react'
import CmsImage from '@/components/CmsImage'

type InstitutionImageCardProps = {
    alt: string
    src: string
    title?: string | null
}

export default function InstitutionImageCard({
    alt,
    src,
    title,
}: InstitutionImageCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group block w-full text-left"
                aria-label={`ดูภาพขยาย ${title || alt}`}
            >
                <div className="overflow-hidden rounded-[1.5rem] border border-base-200 bg-slate-50 shadow-sm">
                    <div className="relative aspect-[4/3]">
                        <CmsImage
                            src={src}
                            alt={alt}
                            fill
                            sizes="(min-width: 1024px) 22rem, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
                
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 z-10 rounded-full bg-black/45 px-3 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-black/65"
                        >
                            ปิด
                        </button>
                        <div className="relative aspect-[4/3] w-full">
                            <CmsImage
                                src={src}
                                alt={alt}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
