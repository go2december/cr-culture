'use client'

import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const DistrictMap = dynamic(() => import('./DistrictMap'), {
    ssr: false,
    loading: () => (
        <div className="rounded-3xl border border-base-200 bg-white shadow-sm p-12 text-center min-h-130 flex items-center justify-center">
            <div>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
                <p className="text-base-content/60 font-light">กำลังโหลดแผนที่...</p>
            </div>
        </div>
    ),
})

export default DistrictMap