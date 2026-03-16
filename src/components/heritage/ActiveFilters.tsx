'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ActiveFilters() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const tag = searchParams.get('tag') || ''
    
    const filters: Array<{ type: string; label: string; value: string }> = []
    
    if (search) filters.push({ type: 'search', label: `🔍 "${search}"`, value: search })
    if (category) {
        const categoryLabels: Record<string, string> = {
            'intangible-heritage': 'มรดกภูมิปัญญา',
            'learning-resources': 'แหล่งเรียนรู้',
            'local-wisdom': 'ปราชญ์ชาวบ้าน',
        }
        filters.push({ type: 'category', label: `📂 ${categoryLabels[category] || category}`, value: category })
    }
    if (tag) filters.push({ type: 'tag', label: `🏷️ #${tag}`, value: tag })
    
    if (filters.length === 0) return null
    
    const removeFilter = (typeToRemove: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (typeToRemove === 'search') params.delete('search')
        if (typeToRemove === 'category') params.delete('category')
        if (typeToRemove === 'tag') params.delete('tag')
        params.delete('page') // Reset page when removing filters
        return params.toString()
    }
    
    const clearAllLink = searchParams.toString() 
        ? `/heritage?${new URLSearchParams(searchParams.toString()).toString()}`.replace(/\?.*$/, '')
        : '/heritage'
    
    return (
        <div className="flex items-center gap-2 flex-wrap mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <span className="text-sm text-base-content/60 font-medium">
                ฟิลเตอร์:
            </span>
            
            {filters.map((filter) => (
                <span
                    key={filter.type}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 
                             bg-white text-primary rounded-full text-sm
                             border border-primary/20 shadow-sm
                             hover:border-primary/40 transition-colors"
                >
                    {filter.label}
                    <Link
                        href={`/heritage${removeFilter(filter.type) ? `?${removeFilter(filter.type)}` : ''}`}
                        className="hover:bg-primary/10 rounded-full p-0.5 transition-colors"
                        title="ลบฟิลเตอร์นี้"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                    </Link>
                </span>
            ))}
            
            <Link
                href="/heritage"
                className="text-sm text-primary hover:text-primary-dark font-medium hover:underline ml-auto"
            >
                ล้างทั้งหมด
            </Link>
        </div>
    )
}
