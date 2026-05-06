'use client'

import Link from 'next/link'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { DistrictMapPoint } from '@/lib/district-map'

const districtThemeMap: Record<DistrictMapPoint['theme'], {
    badge: string
    badgeClass: string
    accentClass: string
    markerGradient: string
    markerGlow: string
    markerSymbol: string
    statusLabel: string
}> = {
    heritage: {
        badge: 'เมืองมรดก',
        badgeClass: 'bg-primary/10 text-primary border-primary/15',
        accentClass: 'text-primary',
        markerGradient: 'linear-gradient(135deg, #1B2A49 0%, #D4AF37 100%)',
        markerGlow: 'rgba(27, 42, 73, 0.28)',
        markerSymbol: '✦',
        statusLabel: 'ศูนย์กลางประวัติศาสตร์และอัตลักษณ์ล้านนา',
    },
    border: {
        badge: 'ชายแดนวัฒนธรรม',
        badgeClass: 'bg-accent/10 text-accent-dark border-accent/15',
        accentClass: 'text-accent-dark',
        markerGradient: 'linear-gradient(135deg, #C83228 0%, #D4AF37 100%)',
        markerGlow: 'rgba(200, 50, 40, 0.32)',
        markerSymbol: '✧',
        statusLabel: 'พื้นที่เชื่อมโยงวัฒนธรรมข้ามพรมแดน',
    },
    highland: {
        badge: 'ชุมชนบนดอย',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        accentClass: 'text-emerald-700',
        markerGradient: 'linear-gradient(135deg, #2D6A4F 0%, #D4AF37 100%)',
        markerGlow: 'rgba(45, 106, 79, 0.28)',
        markerSymbol: '△',
        statusLabel: 'เครือข่ายภูเขาและวัฒนธรรมชาติพันธุ์',
    },
    community: {
        badge: 'ชุมชนวัฒนธรรม',
        badgeClass: 'bg-secondary/15 text-secondary-dark border-secondary/20',
        accentClass: 'text-secondary-dark',
        markerGradient: 'linear-gradient(135deg, #A38526 0%, #C83228 100%)',
        markerGlow: 'rgba(163, 133, 38, 0.28)',
        markerSymbol: '◈',
        statusLabel: 'เครือข่ายชุมชนและกิจกรรมท้องถิ่น',
    },
}

const coordinateStatusMap: Record<DistrictMapPoint['coordinateSource'], { label: string; className: string }> = {
    cms: {
        label: 'พิกัดจาก CMS',
        className: 'bg-primary/10 text-primary border-primary/15',
    },
    fallback: {
        label: 'พิกัดตั้งต้น',
        className: 'bg-stone-100 text-stone-600 border-stone-200',
    },
}

const getDistrictPinIcon = (district: DistrictMapPoint) => {
    const theme = districtThemeMap[district.theme]

    return L.divIcon({
        className: 'district-map-pin',
        html: `
            <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                <div style="position: absolute; inset: auto; width: 36px; height: 36px; border-radius: 9999px 9999px 9999px 0; transform: rotate(45deg); background: ${theme.markerGradient}; border: 2px solid rgba(255,255,255,0.98); box-shadow: 0 14px 28px ${theme.markerGlow};"></div>
                <div style="position: relative; z-index: 2; color: white; font-size: 13px; font-weight: 700; transform: translateY(-1px); text-shadow: 0 1px 2px rgba(0,0,0,0.15);">${theme.markerSymbol}</div>
            </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 30],
        popupAnchor: [0, -26],
    })
}

function FitDistrictBounds({ points }: { points: DistrictMapPoint[] }) {
    const map = useMap()

    useEffect(() => {
        if (points.length === 0) return

        const bounds = L.latLngBounds(points.map((point) => [point.latitude, point.longitude] as [number, number]))
        map.fitBounds(bounds.pad(0.18), { animate: true, duration: 0.8 })
    }, [map, points])

    return null
}

export default function DistrictMap({ points }: { points: DistrictMapPoint[] }) {
    const centeredPoints = useMemo(() => points.filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude)), [points])

    return (
        <div className="space-y-6">
            <div className="rounded-4xl overflow-hidden border border-secondary/20 shadow-[0_20px_60px_rgba(27,42,73,0.12)] bg-white relative">
                <div className="absolute inset-x-0 top-0 z-50 pointer-events-none p-4 md:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-xl rounded-3xl border border-white/60 bg-white/82 backdrop-blur-xl shadow-lg px-5 py-4 text-left pointer-events-auto">
                            <span className="text-secondary font-semibold tracking-widest text-[11px] uppercase block mb-2">Interactive District Map</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary font-display">สำรวจเครือข่ายอำเภอบนแผนที่</h3>
                            <p className="text-sm md:text-base text-base-content/65 font-light leading-relaxed mt-2">
                                คลิกหมุดเพื่ออ่านข้อมูลอำเภอแบบย่อ และเข้าสู่หน้ารายละเอียดของเครือข่ายวัฒนธรรมในแต่ละพื้นที่
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pointer-events-auto sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/60 bg-primary/90 text-white backdrop-blur-xl px-4 py-3 shadow-lg text-left">
                                <div className="text-[10px] uppercase tracking-[0.22em] text-white/70 font-semibold">จำนวนอำเภอ</div>
                                <div className="mt-1 text-2xl font-bold leading-none">{centeredPoints.length}</div>
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/85 text-primary backdrop-blur-xl px-4 py-3 shadow-lg text-left">
                                <div className="text-[10px] uppercase tracking-[0.22em] text-base-content/45 font-semibold">ฐานแผนที่</div>
                                <div className="mt-1 text-sm font-semibold leading-snug">OpenStreetMap</div>
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/85 text-primary backdrop-blur-xl px-4 py-3 shadow-lg text-left col-span-2 sm:col-span-1">
                                <div className="text-[10px] uppercase tracking-[0.22em] text-base-content/45 font-semibold">การใช้งาน</div>
                                <div className="mt-1 text-sm font-semibold leading-snug">คลิกหมุดเพื่อเปิด popup</div>
                            </div>
                        </div>
                    </div>
                </div>

                <MapContainer center={[19.91, 99.88]} zoom={9} scrollWheelZoom className="h-136 w-full md:h-160">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitDistrictBounds points={centeredPoints} />

                    {centeredPoints.map((district) => (
                        <Marker key={district.slug} position={[district.latitude, district.longitude]} icon={getDistrictPinIcon(district)}>
                            <Popup>
                                <div className="min-w-56 max-w-80 space-y-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary-dark">ข้อมูลอำเภอ</div>
                                            <h3 className="text-lg font-bold text-primary font-display mt-1">{district.name}</h3>
                                        </div>
                                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${districtThemeMap[district.theme].badgeClass}`}>
                                            {districtThemeMap[district.theme].badge}
                                        </span>
                                    </div>

                                    <div className="rounded-2xl bg-linear-to-br from-[#fffaf0] via-white to-[#f7f2e1] border border-secondary/15 px-4 py-4 space-y-3">
                                        <div className={`text-sm font-semibold ${districtThemeMap[district.theme].accentClass}`}>
                                            {districtThemeMap[district.theme].statusLabel}
                                        </div>
                                        <div className="flex items-start justify-between gap-3 text-sm">
                                            <span className="text-base-content/50">รหัสอำเภอ</span>
                                            <span className="font-semibold text-primary">{district.code || '-'}</span>
                                        </div>
                                        <div className="flex items-start justify-between gap-3 text-sm">
                                            <span className="text-base-content/50">พิกัดแผนที่</span>
                                            <span className="font-medium text-base-content/75 text-right">
                                                {district.latitude.toFixed(4)}, {district.longitude.toFixed(4)}
                                            </span>
                                        </div>
                                        <div className="pt-1">
                                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${coordinateStatusMap[district.coordinateSource].className}`}>
                                                {coordinateStatusMap[district.coordinateSource].label}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-base-content/70 leading-relaxed">
                                        {district.description || 'เครือข่ายศูนย์วัฒนธรรมระดับอำเภอ'}
                                    </p>

                                    <Link href={`/districts/${district.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:text-secondary-dark transition-colors">
                                        ดูรายละเอียดอำเภอ
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute inset-x-0 bottom-0 z-50 p-4 md:p-6 pointer-events-none">
                    <div className="rounded-3xl border border-white/60 bg-white/84 backdrop-blur-xl shadow-lg px-5 py-4 pointer-events-auto">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="text-left">
                                <div className="text-[11px] uppercase tracking-[0.22em] text-secondary-dark font-semibold">เครือข่ายอำเภอ</div>
                                <div className="text-sm text-base-content/60 font-light mt-1">คลิกหมุดบนแผนที่เพื่อเปิดข้อมูลอำเภอในรูปแบบย่อและเข้าสู่หน้ารายละเอียดโดยตรง</div>
                            </div>
                            <div className="text-xs text-base-content/45 font-medium">ลากแผนที่เพื่อสำรวจพื้นที่เพิ่มเติม</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}