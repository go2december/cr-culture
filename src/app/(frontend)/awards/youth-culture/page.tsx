import Link from 'next/link'
import CmsImage from '@/components/CmsImage'
import { getAwardYears, getInstitutions, getPageHeroes, getYouthAwardHistories, getYouthAwardCategories } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'

export default async function YouthCulturePage({
    searchParams,
}: {
    searchParams: Promise<{ year?: string; institution?: string; category?: string; sortBy?: string; q?: string }>
}) {
    const params = await searchParams
    const selectedYear = params.year || ''
    const selectedInstitutionId = params.institution || ''
    const selectedCategoryId = params.category || ''
    const sortBy = params.sortBy || 'category'
    const searchQuery = params.q || ''

    const [historyResponse, years, institutions, categories, pageHeroes] = await Promise.all([
        getYouthAwardHistories({
            year: selectedYear || undefined,
            categoryId: selectedCategoryId || undefined,
            q: searchQuery || undefined,
        }),
        getAwardYears(),
        getInstitutions(),
        getYouthAwardCategories(),
        getPageHeroes().catch(() => null),
    ])

    const histories = (historyResponse.docs || []).filter((item) => {
        if (!selectedInstitutionId) return true
        return String(item.institution?.id || '') === selectedInstitutionId
    })

    const sortedHistories = [...histories]
    if (sortBy === 'category') {
        sortedHistories.sort((a, b) => {
            const catA = a.category?.title || ''
            const catB = b.category?.title || ''
            return catA.localeCompare(catB, 'th')
        })
    } else if (sortBy === 'year_desc') {
        sortedHistories.sort((a, b) => (b.year?.buddhistYear || 0) - (a.year?.buddhistYear || 0))
    } else if (sortBy === 'year_asc') {
        sortedHistories.sort((a, b) => (a.year?.buddhistYear || 0) - (b.year?.buddhistYear || 0))
    } else if (sortBy === 'name') {
        sortedHistories.sort((a, b) => {
            const nameA = a.projectTitle || ''
            const nameB = b.projectTitle || ''
            return nameA.localeCompare(nameB, 'th')
        })
    }

    const hero = pageHeroes?.youthCulture || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ยุวชนวัฒนธรรม')

    return (
        <div className="min-h-screen bg-slate-50">
            <section className={`relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24 ${heroImageUrl ? 'bg-primary text-white' : 'bg-slate-50'}`}>
                {heroImageUrl ? (
                    <>
                        <div className="absolute inset-0">
                            <CmsImage src={heroImageUrl} alt={heroImageAlt} fill sizes="100vw" className="object-cover object-center" priority />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-r from-primary/92 via-primary/78 to-primary/48" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-lanna-pattern">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/6 via-white to-secondary/10" />
                    </div>
                )}

                <div className="container mx-auto max-w-7xl px-4 relative z-10">
                    <div className="max-w-4xl">
                        <h1 className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] ${heroImageUrl ? 'text-white' : 'text-primary'}`}>
                            {(hero.title as string) || 'ยุวชนวัฒนธรรม'}
                        </h1>
                        <p className={`mt-5 max-w-3xl text-lg md:text-xl font-light leading-relaxed ${heroImageUrl ? 'text-white/86' : 'text-base-content/70'}`}>
                            {(hero.subtitle as string) || 'ผลงานสร้างสรรค์ทางวัฒนธรรมของเยาวชนเชียงราย พร้อมข้อมูลโรงเรียน ทีมผู้จัดทำ และคลังภาพบรรยากาศวันรับรางวัล'}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-7xl px-4 py-6">
                <div className="breadcrumbs text-sm text-base-content/60">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">ยุวชนวัฒนธรรม</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 pb-24">
                <div className="space-y-8">
                    <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                        <form className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr_1.1fr_auto] items-end">
                            <label className="form-control">
                                <span className="label-text mb-2 text-sm font-semibold text-base-content/70">ค้นหา</span>
                                <input type="text" name="q" defaultValue={searchQuery} placeholder="ชื่อผลงาน / ชื่อสมาชิก / โรงเรียน" className="input input-bordered w-full rounded-2xl border-base-200" />
                            </label>
                            <label className="form-control">
                                <span className="label-text mb-2 text-sm font-semibold text-base-content/70">ปี พ.ศ.</span>
                                <select name="year" defaultValue={selectedYear} className="select select-bordered w-full rounded-2xl border-base-200">
                                    <option value="">ทุกปี</option>
                                    {years.map((year) => (
                                        <option key={year.id} value={String(year.buddhistYear)}>{year.buddhistYear}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-control">
                                <span className="label-text mb-2 text-sm font-semibold text-base-content/70">ประเภทรางวัล</span>
                                <select name="category" defaultValue={selectedCategoryId} className="select select-bordered w-full rounded-2xl border-base-200">
                                    <option value="">ทุกประเภท</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={String(category.id)}>{category.title}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-control">
                                <span className="label-text mb-2 text-sm font-semibold text-base-content/70">โรงเรียน/สถาบัน</span>
                                <select name="institution" defaultValue={selectedInstitutionId} className="select select-bordered w-full rounded-2xl border-base-200">
                                    <option value="">ทุกสถาบัน</option>
                                    {institutions.map((institution) => (
                                        <option key={institution.id} value={String(institution.id)}>{institution.institutionName}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-control">
                                <span className="label-text mb-2 text-sm font-semibold text-base-content/70">เรียงลำดับ</span>
                                <select name="sortBy" defaultValue={sortBy} className="select select-bordered w-full rounded-2xl border-base-200">
                                    <option value="category">ประเภทรางวัลที่ได้รับ</option>
                                    <option value="year_desc">ปี พ.ศ. (ล่าสุด - เก่าสุด)</option>
                                    <option value="year_asc">ปี พ.ศ. (เก่าสุด - ล่าสุด)</option>
                                    <option value="name">ชื่อผลงาน (ก-ฮ)</option>
                                </select>
                            </label>
                            <div className="flex gap-3">
                                <button type="submit" className="btn min-h-12 rounded-2xl border-primary bg-primary px-6 text-white hover:bg-primary-dark">กรองข้อมูล</button>
                                <Link href="/awards/youth-culture" className="btn btn-ghost min-h-12 rounded-2xl px-5">ล้าง</Link>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h2 className="font-display text-2xl font-bold text-primary">ผลงานยุวชนวัฒนธรรม</h2>
                        <p className="mt-2 text-base-content/60">พบ {sortedHistories.length} รายการ{selectedYear ? ` ในปี ${selectedYear}` : ''}</p>
                    </div>

                    {sortedHistories.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sortedHistories.map((history) => {
                                const institutionImageUrl = resolveMediaUrl(history.institution?.profileImage)
                                const coverImageUrl = resolveMediaUrl(history.coverImage)
                                const imageUrl = institutionImageUrl || coverImageUrl
                                const imageAlt = institutionImageUrl
                                    ? resolveMediaAlt(history.institution?.profileImage, history.institution?.institutionName || history.projectTitle)
                                    : resolveMediaAlt(history.coverImage, history.projectTitle)

                                return (
                                    <Link key={history.id} href={`/awards/youth-culture/${history.id}`} className="group overflow-hidden rounded-3xl border border-base-200 bg-white shadow-sm transition-all duration-300 hover:border-secondary/50 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)]">
                                        <div className="relative aspect-[4/3] overflow-hidden border-b border-base-100 bg-slate-50">
                                            {imageUrl ? (
                                                <CmsImage src={imageUrl} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/5 to-secondary/10 text-4xl text-primary/35">ย</div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                {history.year?.buddhistYear && (
                                                    <span className="rounded bg-secondary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">พ.ศ. {history.year.buddhistYear}</span>
                                                )}
                                                {history.category?.title && (
                                                    <span className="rounded bg-secondary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary/80">{history.category.title}</span>
                                                )}
                                                {history.institution?.district && (
                                                    <span className="rounded bg-primary/6 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-base-content/60">{history.institution.district}</span>
                                                )}
                                            </div>
                                            <h3 className="font-display text-xl font-bold leading-snug text-primary transition-colors group-hover:text-secondary-dark">{history.projectTitle}</h3>
                                            {history.institution?.institutionName && (
                                                <p className="mt-3 text-sm font-medium text-base-content/60">{history.institution.institutionName}</p>
                                            )}
                                            {history.projectSummary && (
                                                <p className="mt-3 line-clamp-2 text-sm font-light text-base-content/70">{history.projectSummary}</p>
                                            )}
                                            {history.awardees.length > 0 && (
                                                <p className="mt-4 line-clamp-2 text-xs font-medium text-base-content/55">
                                                    {history.awardees.map((awardee) => awardee.fullName).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-base-200 bg-white py-16 text-center">
                            <h3 className="font-display text-2xl font-bold text-primary">ยังไม่พบข้อมูลที่ตรงกับเงื่อนไข</h3>
                            <p className="mt-3 text-base-content/60">ลองเปลี่ยนคำค้นหา หรือกลับมาดูใหม่ภายหลังเมื่อมีการเพิ่มข้อมูล</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
