import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CmsImage from '@/components/CmsImage'
import InstitutionImageCard from '@/components/InstitutionImageCard'
import { getAwardGalleries, getYouthAwardHistories, getYouthAwardHistoryById } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/media'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const history = await getYouthAwardHistoryById(id)
    if (!history) {
        return {}
    }

    const title = `${history.projectTitle} - รางวัลเยาวชนวัฒนธรรม`
    const description = history.projectSummary || `ผลงานเยาวชนวัฒนธรรมจังหวัดเชียงรายโดยสถาบัน/โรงเรียน ${history.institution?.institutionName || ''}`
    const imageUrl = resolveMediaUrl(history.coverImage)

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: imageUrl ? [{ url: imageUrl }] : undefined,
        },
    }
}


const getYouTubeEmbedUrl = (videoUrl?: string | null) => {
    if (!videoUrl) return null

    try {
        const url = new URL(videoUrl)
        if (url.hostname.includes('youtu.be')) {
            const id = url.pathname.replace('/', '')
            return id ? `https://www.youtube.com/embed/${id}` : null
        }

        if (url.hostname.includes('youtube.com')) {
            const id = url.searchParams.get('v')
            return id ? `https://www.youtube.com/embed/${id}` : null
        }
    } catch {
        return null
    }

    return null
}

export default async function YouthCultureDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const history = await getYouthAwardHistoryById(id)

    if (!history) return notFound()

    const [relatedResponse, gallery] = await Promise.all([
        getYouthAwardHistories({
            year: history.year?.buddhistYear ? String(history.year.buddhistYear) : undefined,
            limit: 6,
        }),
        history.year?.buddhistYear ? getAwardGalleries({ year: String(history.year.buddhistYear), limit: 6 }) : Promise.resolve([]),
    ])

    const related = (relatedResponse.docs || []).filter((item) => String(item.id) !== String(history.id)).slice(0, 3)
    const imageUrl = resolveMediaUrl(history.coverImage)
    const institutionImageUrl = resolveMediaUrl(history.institution?.profileImage)
    const videoEmbedUrl = getYouTubeEmbedUrl(history.videoUrl)

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <section className={`relative overflow-hidden ${imageUrl ? 'flex min-h-[52vh] items-end pt-32 pb-24 lg:pt-40 lg:pb-30' : 'bg-primary pt-32 pb-24 lg:pt-40 lg:pb-32'}`}>
                {imageUrl ? (
                    <>
                        <div className="absolute inset-0">
                            <CmsImage src={imageUrl} alt={resolveMediaAlt(history.coverImage, history.projectTitle)} fill sizes="100vw" className="object-cover object-center" priority />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/72 to-primary/40" />
                        </div>
                        <div className="container relative z-10 mx-auto max-w-6xl px-4 text-white">
                            <div className="max-w-4xl">
                                <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur-md">
                                    {history.year?.buddhistYear ? `พ.ศ. ${history.year.buddhistYear}` : 'เยาวชนวัฒนธรรม'}
                                </div>
                                <h1 className="font-display text-3xl font-bold leading-[1.05] drop-shadow-lg md:text-5xl lg:text-6xl">{history.projectTitle}</h1>
                                <p className="mt-5 max-w-3xl text-lg font-light text-white/82 md:text-xl">
                                    {history.institution?.institutionName || 'ผลงานเยาวชนวัฒนธรรม'}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="container relative z-10 mx-auto max-w-6xl px-4 text-white">
                        <div className="max-w-4xl">
                            <div className="mb-6 inline-flex rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md">
                                {history.year?.buddhistYear ? `พ.ศ. ${history.year.buddhistYear}` : 'เยาวชนวัฒนธรรม'}
                            </div>
                            <h1 className="font-display text-3xl font-bold md:text-5xl lg:text-6xl">{history.projectTitle}</h1>
                        </div>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            <div className="container relative z-10 mx-auto max-w-6xl px-4 py-6 -mt-8">
                <div className="inline-block rounded-2xl border border-base-200 bg-white/90 px-6 py-3 text-sm font-light text-base-content/60 shadow-sm backdrop-blur-md">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                            <li><Link href="/awards/youth-culture" className="hover:text-primary transition-colors">เยาวชนวัฒนธรรม</Link></li>
                            <li className="font-medium text-primary">{history.projectTitle}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <article className="space-y-8 lg:col-span-2">
                        <div className="rounded-3xl border border-base-200 bg-white p-8 shadow-sm lg:p-10">
                            <div className="mb-8 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">โรงเรียน/สถาบัน</div>
                                    <div className="text-base font-semibold leading-relaxed text-primary">{history.institution?.institutionName || '-'}</div>
                                </div>
                                <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">จำนวนสมาชิก</div>
                                    <div className="text-base font-semibold leading-relaxed text-primary">{history.awardees.length} คน</div>
                                </div>
                                {history.institution?.district && (
                                    <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">พื้นที่</div>
                                        <div className="text-base font-medium leading-relaxed text-base-content/80">{history.institution.district}</div>
                                    </div>
                                )}
                                {history.year?.location && (
                                    <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">สถานที่จัดงาน</div>
                                        <div className="text-base font-medium leading-relaxed text-base-content/80">{history.year.location}</div>
                                    </div>
                                )}
                            </div>
                            <div className="prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-base-content/80">
                                <p>{history.projectSummary || 'ยังไม่มีรายละเอียดผลงานในระบบ'}</p>
                            </div>
                        </div>

                        {videoEmbedUrl && (
                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm lg:p-8">
                                <h2 className="font-display text-2xl font-bold text-primary">วิดีโอผลงาน</h2>
                                <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl border border-base-100">
                                    <iframe src={videoEmbedUrl} title={history.projectTitle} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                                </div>
                            </div>
                        )}

                        {gallery.length > 0 && (
                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm lg:p-8">
                                <h2 className="font-display text-2xl font-bold text-primary">คลังภาพบรรยากาศปีเดียวกัน</h2>
                                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {gallery.map((item) => {
                                        const galleryImageUrl = resolveMediaUrl(item.image)
                                        if (!galleryImageUrl) return null
                                        return (
                                            <div key={item.id} className="space-y-2">
                                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-base-100 bg-slate-50">
                                                    <CmsImage src={galleryImageUrl} alt={resolveMediaAlt(item.image, item.caption || 'ภาพบรรยากาศงาน')} fill sizes="18rem" className="object-cover" />
                                                </div>
                                                {item.caption && <p className="text-sm font-light text-base-content/55">{item.caption}</p>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </article>

                    <aside className="space-y-6">
    {institutionImageUrl && (
    <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm lg:p-8">

        <div className="mt-5">
            <InstitutionImageCard
                src={institutionImageUrl}
                alt={resolveMediaAlt(history.institution?.profileImage, history.institution?.institutionName || history.projectTitle)}
                title={history.institution?.institutionName}
            />
        </div>
    </div>
)}

<div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm lg:p-8">
    <h3 className="font-display text-lg font-bold text-primary">สมาชิกในทีม</h3>
    <div className="mt-5 space-y-4">
        {history.awardees.map((awardee) => (
            <div key={awardee.id} className="flex flex-col rounded-2xl border border-base-100 bg-slate-50 p-4">
                <h4 className="font-semibold leading-snug text-primary">{[awardee.prefix, awardee.fullName].filter(Boolean).join(' ')}</h4>
                {awardee.gradeLevel && <p className="mt-1 text-sm text-base-content/60">{awardee.gradeLevel}</p>}
            </div>
        ))}
    </div>
</div>

{related.length > 0 && (
        <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm lg:p-8">
            <h3 className="font-display text-lg font-bold text-primary">ผลงานปีเดียวกัน</h3>
            <ul className="mt-5 space-y-3">
                {related.map((item) => (
                    <li key={item.id}>
                        <Link href={`/awards/youth-culture/${item.id}`} className="group flex gap-4 rounded-xl border border-base-100 bg-slate-50 p-3 transition-all hover:border-primary/20 hover:bg-white hover:shadow-sm">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-base-200 font-semibold text-primary/50">
                                {item.year?.buddhistYear ? String(item.year.buddhistYear).slice(-2) : 'YC'}
                            </div>
                            <div className="min-w-0">
                                <h4 className="line-clamp-2 text-sm font-medium text-base-content transition-colors group-hover:text-primary">{item.projectTitle}</h4>
                                <p className="mt-1 line-clamp-1 text-xs text-base-content/50">{item.institution?.institutionName || '-'}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )}
</aside>
                </div>
            </div>
        </div>
    )
}
