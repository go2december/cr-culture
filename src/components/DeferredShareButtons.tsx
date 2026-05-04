'use client'

import dynamic from 'next/dynamic'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
    ssr: false,
    loading: () => <div className="h-10 w-32 rounded-full bg-slate-100" aria-hidden="true" />,
})

interface DeferredShareButtonsProps {
    title: string
    url?: string
}

export default function DeferredShareButtons(props: DeferredShareButtonsProps) {
    return <ShareButtons {...props} />
}