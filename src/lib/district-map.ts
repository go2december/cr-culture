import type { PublicDistrictSummary } from './public-organization'

export interface DistrictMapPoint extends PublicDistrictSummary {
    latitude: number
    longitude: number
    coordinateSource: 'cms' | 'fallback'
    theme: 'heritage' | 'border' | 'highland' | 'community'
}

const fallbackDistrictCoordinates: Record<string, { latitude: number; longitude: number }> = {
    'muang-chiang-rai': { latitude: 19.9075, longitude: 99.8265 },
    'chiang-saen': { latitude: 20.275, longitude: 100.083 },
    'mae-sai': { latitude: 20.433, longitude: 99.886 },
    'chiang-khong': { latitude: 20.257, longitude: 100.407 },
    'mae-chan': { latitude: 20.147, longitude: 99.857 },
    'thoeng': { latitude: 19.617, longitude: 100.153 },
    'phan': { latitude: 19.556, longitude: 99.742 },
    'pa-daet': { latitude: 19.489, longitude: 99.984 },
    'mae-suai': { latitude: 19.656, longitude: 99.519 },
    'wiang-chai': { latitude: 19.883, longitude: 99.961 },
    'wiang-pa-pao': { latitude: 19.32, longitude: 99.488 },
    'phaya-mengrai': { latitude: 19.553, longitude: 100.049 },
    'mae-fa-luang': { latitude: 20.303, longitude: 99.753 },
    'mae-lao': { latitude: 19.731, longitude: 99.592 },
    'wiang-kaen': { latitude: 20.273, longitude: 100.205 },
    'khun-tan': { latitude: 19.791, longitude: 99.681 },
    'doi-luang': { latitude: 19.933, longitude: 99.64 },
    'wiang-chiang-rung': { latitude: 19.661, longitude: 99.873 },
}

export const chiangRaiMapCenter: [number, number] = [19.91, 99.88]

const heritageDistricts = new Set(['muang-chiang-rai', 'chiang-saen', 'phaya-mengrai'])
const borderDistricts = new Set(['mae-sai', 'chiang-khong', 'wiang-kaen'])
const highlandDistricts = new Set(['mae-fa-luang', 'mae-suai', 'wiang-pa-pao', 'khun-tan', 'doi-luang'])

const resolveDistrictTheme = (slug: string): DistrictMapPoint['theme'] => {
    if (heritageDistricts.has(slug)) return 'heritage'
    if (borderDistricts.has(slug)) return 'border'
    if (highlandDistricts.has(slug)) return 'highland'
    return 'community'
}

export const resolveDistrictMapPoint = (district: PublicDistrictSummary): DistrictMapPoint => {
    const fallback = fallbackDistrictCoordinates[district.slug]
    const hasCmsCoordinates = Number.isFinite(district.latitude as number) && Number.isFinite(district.longitude as number)

    return {
        ...district,
        latitude: hasCmsCoordinates ? Number(district.latitude) : fallback?.latitude || chiangRaiMapCenter[0],
        longitude: hasCmsCoordinates ? Number(district.longitude) : fallback?.longitude || chiangRaiMapCenter[1],
        coordinateSource: hasCmsCoordinates ? 'cms' : 'fallback',
        theme: resolveDistrictTheme(district.slug),
    }
}