import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/media'
import InstitutionImageCard from '@/components/InstitutionImageCard'
import { getKhonDeeAwardById, getKhonDeeAwards } from '@/lib/payload'
import type { PublicAwardMainPillar, PublicKhonDeeAward } from '@/lib/public-content'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const award = await getKhonDeeAwardById(id)
    if (!award) {
        return {}
    }

    const title = `${[award.prefix, award.fullName].filter(Boolean).join(' ')} - คนดีศรีเชียงราย`
    const description = award.contributionTitle || `ทำเนียบรางวัลเกียรติยศคนดีศรีเชียงราย ประจำปี พ.ศ. ${award.year?.buddhistYear || ''}`
    const imageUrl = resolveMediaUrl(award.profileImage)

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

const pillarLabels: Record<PublicAwardMainPillar, string> = {
    'cultural-contributor': 'ด้านผู้ทำคุณประโยชน์ทางวัฒนธรรม',
    'outstanding-cultural-achievement': 'ด้านผู้มีผลงานดีเด่นทางวัฒนธรรม',
}

export default async function KhonDeeAwardDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const award = await getKhonDeeAwardById(id)

    if (!award) {
        return notFound()
    }

    const relatedResponse = await getKhonDeeAwards({
        year: award.year?.buddhistYear ? String(award.year.buddhistYear) : undefined,
        limit: 6,
    })
    const relatedAwards = ((relatedResponse.docs || []) as PublicKhonDeeAward[])
        .filter((item) => String(item.id) !== String(award.id))
        .slice(0, 3)
    const imageUrl = resolveMediaUrl(award.profileImage)
    const profileAlt = resolveMediaAlt(award.profileImage, award.fullName)
    const categoryLabel = award.category
        ? `${pillarLabels[award.category.mainPillar]} / ${award.category.subType}`
        : 'ไม่ระบุประเภทรางวัล'

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <section className="relative overflow-hidden bg-primary accent-panel pt-32 pb-20 lg:pt-40 lg:pb-24">
                <div className="absolute inset-0 z-0 bg-lanna-pattern opacity-25" />
                <div className="absolute top-0 right-[-10%] z-0 h-[70%] w-[60%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] z-0 h-[60%] w-[70%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />

                <div className="container relative z-10 mx-auto max-w-6xl px-4 text-white">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-md">
                            {award.year?.buddhistYear ? `พ.ศ. ${award.year.buddhistYear}` : 'รางวัลเกียรติยศ'}
                        </div>
                        <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                            {[award.prefix, award.fullName].filter(Boolean).join(' ')}
                        </h1>
                        <p className="mt-5 max-w-3xl text-lg font-light leading-relaxed text-white/82 md:text-xl">
                            {award.currentPosition || award.contributionTitle}
                        </p>
                        <div className="mb-6 mt-6 h-1 w-24 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent" />
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/78">
                            <span>{categoryLabel}</span>
                            {award.year?.location && (
                                <>
                                    <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
                                    <span>{award.year.location}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container relative z-10 mx-auto max-w-6xl -mt-8 px-4 py-6">
                <div className="inline-block rounded-2xl border border-base-200 bg-white/90 px-6 py-3 text-sm font-light text-base-content/60 shadow-sm backdrop-blur-md">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link href="/" className="transition-colors hover:text-primary">หน้าแรก</Link></li>
                            <li><Link href="/awards/khon-dee" className="transition-colors hover:text-primary">คนดีศรีเชียงราย</Link></li>
                            <li className="font-medium text-primary">{award.fullName}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <article className="space-y-8 lg:col-span-2">
                        <div className="rounded-3xl border border-base-200 bg-white p-8 shadow-sm accent-panel lg:p-10">
                            <div className="mb-8 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">ผลงานเด่น</div>
                                    <div className="text-base font-semibold leading-relaxed text-primary">{award.contributionTitle}</div>
                                </div>
                                <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">ประเภทรางวัล</div>
                                    <div className="text-base font-semibold leading-relaxed text-primary">{categoryLabel}</div>
                                </div>
                                {award.impactArea && (
                                    <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">พื้นที่ที่ได้รับประโยชน์</div>
                                        <div className="text-base font-medium leading-relaxed text-base-content/80">{award.impactArea}</div>
                                    </div>
                                )}
                                {award.year?.presidentName && (
                                    <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">ผู้ลงนามประกาศ</div>
                                        <div className="text-base font-medium leading-relaxed text-base-content/80">{award.year.presidentName}</div>
                                    </div>
                                )}
                            </div>

                            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-primary prose-p:leading-relaxed prose-p:text-base-content/80 prose-strong:text-base-content">
                                {award.contributionDetailHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: award.contributionDetailHtml }} />
                                ) : (
                                    <p>ยังไม่มีรายละเอียดความดีเชิงลึกในระบบ</p>
                                )}
                            </div>
                        </div>
                    </article>

                    <aside className="space-y-6">
                        <div className="overflow-hidden rounded-3xl border border-base-200 bg-white shadow-sm">
                            <div className="p-6 lg:p-8">
                                <div className="overflow-hidden rounded-[1.75rem] border border-base-200 bg-slate-50">
                                    {imageUrl ? (
                                        <InstitutionImageCard src={imageUrl} alt={profileAlt} title={award.fullName} />
                                    ) : (
                                        <div className="flex aspect-[4/5] items-center justify-center bg-linear-to-br from-primary/6 to-secondary/12 text-5xl font-display text-primary/35">
                                            {award.fullName.slice(0, 1)}
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        </div>

                        <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm accent-panel lg:p-8">
                            <h3 className="mb-5 font-display text-lg font-bold text-primary">ข้อมูลรางวัล</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-base-content/50">ปีที่ได้รับรางวัล</div>
                                    <div className="font-medium text-base-content/80">{award.year?.buddhistYear ? `พ.ศ. ${award.year.buddhistYear}` : '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-base-content/50">วันที่ประกาศผล</div>
                                    <div className="font-medium text-base-content/80">{award.year?.announcementDate ? new Date(award.year.announcementDate).toLocaleDateString('th-TH') : '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-base-content/50">พิธีมอบรางวัล</div>
                                    <div className="font-medium text-base-content/80">{award.year?.ceremonyDate ? new Date(award.year.ceremonyDate).toLocaleString('th-TH') : '-'}</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-base-content/50">สถานที่</div>
                                    <div className="font-medium leading-relaxed text-base-content/80">{award.year?.location || '-'}</div>
                                </div>
                            </div>
                        </div>

                        {relatedAwards.length > 0 && (
                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm accent-panel lg:p-8">
                                <h3 className="mb-5 font-display text-lg font-bold text-primary">รายชื่อในปีเดียวกัน</h3>
                                <ul className="space-y-3">
                                    {relatedAwards.map((related) => (
                                        <li key={related.id}>
                                            <Link
                                                href={`/awards/khon-dee/${related.id}`}
                                                className="group flex gap-4 rounded-xl border border-base-100 bg-slate-50 p-3 transition-all hover:border-primary/20 hover:bg-white hover:shadow-sm"
                                            >
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-base-200 font-semibold text-primary/50">
                                                    {related.year?.buddhistYear ? String(related.year.buddhistYear).slice(-2) : 'CR'}
                                                </div>
                                                <div className="flex min-w-0 flex-col justify-center">
                                                    <h4 className="line-clamp-2 text-sm font-medium text-base-content transition-colors group-hover:text-primary">
                                                        {[related.prefix, related.fullName].filter(Boolean).join(' ')}
                                                    </h4>
                                                    <p className="mt-1 line-clamp-1 text-xs text-base-content/50">
                                                        {related.contributionTitle}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Link href="/awards/khon-dee" className="btn btn-primary group flex w-full items-center justify-center gap-2 rounded-xl shadow-sm hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
                            กลับไปยังทำเนียบคนดีศรีเชียงราย
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    )
}
