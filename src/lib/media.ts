export type MediaSizeLike = {
    url?: string | null
} | null

export type MediaLike = {
    url?: string | null
    alt?: string | null
    sizes?: {
        cover?: MediaSizeLike
        card?: MediaSizeLike
        thumbnail?: MediaSizeLike
    } | null
} | null | undefined

export type GalleryItemLike = {
    image?: MediaLike
    caption?: string | null
} | null | undefined

export function resolveMediaUrl(media?: MediaLike, gallery?: GalleryItemLike[]): string | null {
    return (
        media?.url ||
        media?.sizes?.cover?.url ||
        media?.sizes?.card?.url ||
        media?.sizes?.thumbnail?.url ||
        gallery?.[0]?.image?.url ||
        gallery?.[0]?.image?.sizes?.cover?.url ||
        gallery?.[0]?.image?.sizes?.card?.url ||
        gallery?.[0]?.image?.sizes?.thumbnail?.url ||
        null
    )
}

export function resolveMediaAlt(media?: MediaLike, fallback?: string | null, gallery?: GalleryItemLike[]): string {
    return media?.alt || gallery?.[0]?.image?.alt || fallback || 'รูปภาพ'
}