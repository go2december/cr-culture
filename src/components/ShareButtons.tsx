'use client'

import { useState, useEffect } from 'react'

interface ShareButtonsProps {
    title: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const [currentUrl, setCurrentUrl] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href)
        }
    }, [])

    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        window.open(url, '_blank', 'width=600,height=400')
    }

    const shareToLine = () => {
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`
        window.open(url, '_blank', 'width=500,height=500')
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy link:', err)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={shareToFacebook}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-base-content/50 flex items-center justify-center transition-colors border border-base-200"
                title="แชร์บน Facebook"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </button>
            <button
                onClick={shareToLine}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-green-50 hover:text-green-600 text-base-content/50 flex items-center justify-center transition-colors border border-base-200"
                title="แชร์บน LINE"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </button>
            <button
                onClick={copyToClipboard}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${copied ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-50 hover:bg-slate-100 text-base-content/60 border-base-200'}`}
                title="คัดลอกลิงก์"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                )}
            </button>
        </div>
    )
}
