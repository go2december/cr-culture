'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function SearchBox({
    placeholder = 'ค้นหาบทความ...',
}: {
    placeholder?: string
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('search') || '')
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    const handleSearch = (value: string) => {
        setQuery(value)

        // Debounce search (300ms delay)
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (value.trim()) {
                params.set('search', value.trim())
                params.set('page', '1')  // Reset to first page when searching
            } else {
                params.delete('search')
            }

            const queryString = params.toString()
            router.push(`/heritage${queryString ? `?${queryString}` : ''}`)
        }, 300)
    }

    const handleClear = () => {
        setQuery('')
        const params = new URLSearchParams(searchParams.toString())
        params.delete('search')
        const queryString = params.toString()
        router.push(`/heritage${queryString ? `?${queryString}` : ''}`)
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [])

    return (
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
            </div>

            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-base-200 
                         bg-slate-50 focus:bg-white
                         focus:border-primary focus:ring-2 focus:ring-primary/20 
                         outline-none transition-all text-sm font-light
                         placeholder:text-base-content/40"
            />

            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                             p-1 hover:bg-base-200 rounded-full transition-colors
                             text-base-content/40 hover:text-primary"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}
