import Link from 'next/link'
import { notFound } from 'next/navigation'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/media'
import InstitutionImageCard from '@/components/InstitutionImageCard'
import { getWisdomAwardById, getWisdomAwards } from '@/lib/payload'

export default async function WisdomAwardDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const item = await getWisdomAwardById(id)

    if (!item) return notFound()

    const relatedResponse = await getWisdomAwards({
        year: item.year?.buddhistYear ? String(item.year.buddhistYear) : undefined,
        limit: 6,
    })
    const related = (relatedResponse.docs || []).filter((entry) => String(entry.id) !== String(item.id)).slice(0, 3)
    const imageUrl = resolveMediaUrl(item.avatarImage)
    const profileAlt = resolveMediaAlt(item.avatarImage, item.fullName)

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <section className="relative overflow-hidden bg-primary pt-32 pb-20 lg:pt-40 lg:pb-24">
                <div className="absolute inset-0 z-0 bg-lanna-pattern opacity-25" />
                <div className="absolute top-0 right-[-10%] z-0 h-[70%] w-[60%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] z-0 h-[60%] w-[70%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />

                <div className="container relative z-10 mx-auto max-w-6xl px-4 text-white">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur-md">
                            {item.year?.buddhistYear ? `พ.ศ. ${item.year.buddhistYear}` : 'ครูภูมิปัญญาเมืองเชียงราย'}
                        </div>
                        <h1 className="font-display text-3xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
                            {[item.prefix, item.fullName].filter(Boolean).join(' ')}
                        </h1>
                        <p className="mt-5 max-w-3xl text-lg font-light text-white/82 md:text-xl">{item.wisdomCategory?.title || 'ไม่ระบุสาขาองค์ความรู้'}</p>
                    </div>
                </div>
            </section>

            <div className="container relative z-10 mx-auto max-w-6xl -mt-8 px-4 py-6">
                <div className="inline-block rounded-2xl border border-base-200 bg-white/90 px-6 py-3 text-sm font-light text-base-content/60 shadow-sm backdrop-blur-md">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link href="/" className="transition-colors hover:text-primary">หน้าแรก</Link></li>
                            <li><Link href="/awards/wisdom-awards" className="transition-colors hover:text-primary">ครูภูมิปัญญาเมืองเชียงราย</Link></li>
                            <li className="font-medium text-primary">{item.fullName}</li>
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
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">สาขาองค์ความรู้</div>
                                    <div className="text-base font-semibold leading-relaxed text-primary">{item.wisdomCategory?.title || '-'}</div>
                                </div>
                                <div className="rounded-2xl border border-base-100 bg-slate-50 p-5">
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">ปี พ.ศ.</div>
                                    <div className="text-base font-semibold leading-relaxed text-primary">{item.year?.buddhistYear || '-'}</div>
                                </div>
                            </div>
                            <div className="prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-base-content/80">
                                {item.contributionDetailHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: item.contributionDetailHtml }} />
                                ) : (
                                    <p>ยังไม่มีรายละเอียดองค์ความรู้ในระบบ</p>
                                )}
                            </div>
                        </div>
                    </article>

                    <aside className="space-y-6">
                        <div className="overflow-hidden rounded-3xl border border-base-200 bg-white shadow-sm">
                            
                            
                            <div className="p-6 lg:p-8">
                                <div className="overflow-hidden rounded-[1.75rem] border border-base-200 bg-slate-50">
                                    {imageUrl ? (
                                        <div className="relative aspect-[4/5]">
                                             <InstitutionImageCard src={imageUrl} alt={profileAlt} title={item.fullName} />
                                        </div>
                                    ) : (
                                        <div className="flex aspect-[4/5] items-center justify-center bg-linear-to-br from-primary/6 to-secondary/12 text-5xl font-display text-primary/35">
                                            {item.fullName.slice(0, 1)}
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        </div>

                        {related.length > 0 && (
                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm lg:p-8">
                                <h3 className="font-display text-lg font-bold text-primary">รายชื่อในปีเดียวกัน</h3>
                                <ul className="mt-5 space-y-3">
                                    {related.map((entry) => (
                                        <li key={entry.id}>
                                            <Link href={`/awards/wisdom-awards/${entry.id}`} className="group flex gap-4 rounded-xl border border-base-100 bg-slate-50 p-3 transition-all hover:border-primary/20 hover:bg-white hover:shadow-sm">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-base-200 font-semibold text-primary/50">
                                                    {entry.year?.buddhistYear ? String(entry.year.buddhistYear).slice(-2) : 'WP'}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="line-clamp-2 text-sm font-medium text-base-content transition-colors group-hover:text-primary">{[entry.prefix, entry.fullName].filter(Boolean).join(' ')}</h4>
                                                    <p className="mt-1 line-clamp-1 text-xs text-base-content/50">{entry.wisdomCategory?.title || 'ไม่ระบุสาขา'}</p>
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
