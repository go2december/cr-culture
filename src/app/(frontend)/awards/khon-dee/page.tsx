import Link from 'next/link'
import CmsImage from '@/components/CmsImage'
import { getAwardCategories, getAwardYears, getKhonDeeAwards, getPageHeroes } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicAwardCategory, PublicAwardMainPillar, PublicAwardYear, PublicKhonDeeAward } from '@/lib/public-content'

const pillarLabels: Record<PublicAwardMainPillar, string> = {
    'cultural-contributor': 'ด้านผู้ทำคุณประโยชน์ทางวัฒนธรรม',
    'outstanding-cultural-achievement': 'ด้านผู้มีผลงานดีเด่นทางวัฒนธรรม',
}

export default async function KhonDeeAwardsPage({
    searchParams,
}: {
    searchParams: Promise<{ year?: string; category?: string; sortBy?: string; q?: string }>
}) {
    const params = await searchParams
    const selectedYear = params.year || ''
    const selectedCategoryId = params.category || ''
    const sortBy = params.sortBy || 'category'
    const searchQuery = params.q || ''
    const showYearGrid = !selectedYear && !searchQuery && !selectedCategoryId

    const [awardResponse, yearsData, categoriesData, pageHeroes] = await Promise.all([
        getKhonDeeAwards({
            year: selectedYear || undefined,
            categoryId: selectedCategoryId || undefined,
            search: searchQuery || undefined,
            limit: selectedYear ? undefined : 1000,
        }),
        getAwardYears(),
        getAwardCategories(),
        getPageHeroes().catch(() => null),
    ])

    const awards = (awardResponse.docs || []) as PublicKhonDeeAward[]
    
    // Calculate counts of awards per year
    const awardsPerYear = awards.reduce((acc, curr) => {
        const yr = curr.year?.buddhistYear
        if (yr) {
            acc[yr] = (acc[yr] || 0) + 1
        }
        return acc
    }, {} as Record<number, number>)
    const sortedAwards = [...awards]
    if (sortBy === 'category') {
        sortedAwards.sort((a, b) => {
            const catA = a.category ? `${pillarLabels[a.category.mainPillar]} / ${a.category.subType}` : ''
            const catB = b.category ? `${pillarLabels[b.category.mainPillar]} / ${b.category.subType}` : ''
            return catA.localeCompare(catB, 'th')
        })
    } else if (sortBy === 'year_desc') {
        sortedAwards.sort((a, b) => (b.year?.buddhistYear || 0) - (a.year?.buddhistYear || 0))
    } else if (sortBy === 'year_asc') {
        sortedAwards.sort((a, b) => (a.year?.buddhistYear || 0) - (b.year?.buddhistYear || 0))
    } else if (sortBy === 'name') {
        sortedAwards.sort((a, b) => {
            const nameA = [a.prefix, a.fullName].filter(Boolean).join('')
            const nameB = [b.prefix, b.fullName].filter(Boolean).join('')
            return nameA.localeCompare(nameB, 'th')
        })
    }
    const years = (yearsData || []) as PublicAwardYear[]
    const categories = (categoriesData || []) as PublicAwardCategory[]
    const selectedCategory = categories.find((category) => String(category.id) === selectedCategoryId) || null
    const hero = pageHeroes?.khonDee || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพพื้นหลังหน้าคนดีศรีเชียงราย')
    const hasHeroImage = Boolean(heroImageUrl)

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <section className={`relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-28 accent-panel ${hasHeroImage ? 'bg-primary text-white' : 'bg-slate-50'}`}>
                {hasHeroImage ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <CmsImage src={heroImageUrl!} alt={heroImageAlt} fill sizes="100vw" className="object-cover object-top" priority />
                        </div>
                        <div className="absolute inset-0 z-10 bg-linear-to-r from-primary/90 via-primary/72 to-primary/45" />
                    </>
                ) : (
                    <div className="absolute inset-0 z-0 bg-lanna-pattern">
                        <div className="absolute top-0 right-[-10%] h-[70%] w-[60%] rounded-full bg-linear-to-bl from-secondary/15 to-transparent blur-[120px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] h-[60%] w-[70%] rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[130px]" />
                    </div>
                )}

                <div className="container mx-auto max-w-7xl px-4 relative z-20">
                    <div className="max-w-4xl">
                        <div className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium shadow-sm mb-6 reveal-soft backdrop-blur-md ${hasHeroImage ? 'border border-white/25 bg-white/12 text-white' : 'border border-secondary/30 bg-white/80 text-primary'}`}>
                            <span className="h-2 w-2 rounded-full bg-accent" />
                            {(hero.eyebrow as string) || 'รางวัลเกียรติยศ'}
                        </div>
                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight reveal-soft stagger-1 font-display leading-[1.05] ${hasHeroImage ? 'text-white drop-shadow-lg' : 'text-primary'}`}>
                            {(hero.title as string) || 'คนดีศรีเชียงราย'}
                        </h1>
                        <p className={`max-w-3xl text-lg md:text-xl font-light leading-relaxed reveal-soft stagger-2 ${hasHeroImage ? 'text-white/88 drop-shadow-md' : 'text-base-content/70'}`}>
                            {(hero.subtitle as string) || 'ทำเนียบบุคคลและองค์กรที่ได้รับการยกย่องด้านคุณประโยชน์และผลงานดีเด่นทางวัฒนธรรมของจังหวัดเชียงราย'}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-7xl px-4 py-6">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">คนดีศรีเชียงราย</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 pb-24">
                <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8 mb-8 reveal-soft stagger-1">
                    <form className="grid lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto] gap-4 items-end">
                        <label className="form-control">
                            <span className="label-text text-sm font-semibold text-base-content/70 mb-2">ค้นหา</span>
                            <input
                                type="text"
                                name="q"
                                defaultValue={searchQuery}
                                placeholder="ชื่อผู้ได้รับรางวัล / ผลงานเด่น"
                                className="input input-bordered w-full rounded-2xl border-base-200 focus:border-secondary"
                            />
                        </label>

                        <label className="form-control">
                            <span className="label-text text-sm font-semibold text-base-content/70 mb-2">ปี พ.ศ.</span>
                            <select name="year" defaultValue={selectedYear} className="select select-bordered w-full rounded-2xl border-base-200 focus:border-secondary">
                                <option value="">ทุกปี</option>
                                {years.map((year) => (
                                    <option key={year.id} value={String(year.buddhistYear)}>
                                        {year.buddhistYear}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="form-control">
                            <span className="label-text text-sm font-semibold text-base-content/70 mb-2">ประเภทรางวัล</span>
                            <select name="category" defaultValue={selectedCategoryId} className="select select-bordered w-full rounded-2xl border-base-200 focus:border-secondary">
                                <option value="">ทุกประเภท</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={String(category.id)}>
                                        {pillarLabels[category.mainPillar]} / {category.subType}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="form-control">
                            <span className="label-text text-sm font-semibold text-base-content/70 mb-2">เรียงลำดับ</span>
                            <select name="sortBy" defaultValue={sortBy} className="select select-bordered w-full rounded-2xl border-base-200 focus:border-secondary">
                                <option value="category">ประเภทรางวัลที่ได้รับ</option>
                                <option value="year_desc">ปี พ.ศ. (ล่าสุด - เก่าสุด)</option>
                                <option value="year_asc">ปี พ.ศ. (เก่าสุด - ล่าสุด)</option>
                                <option value="name">ชื่อผู้ได้รับรางวัล (ก-ฮ)</option>
                            </select>
                        </label>

                        <div className="flex gap-3">
                            <button type="submit" className="btn rounded-2xl bg-primary text-white border-primary hover:bg-primary-dark min-h-12 px-6">
                                กรองข้อมูล
                            </button>
                            <Link href="/awards/khon-dee" className="btn btn-ghost rounded-2xl min-h-12 px-5">
                                ล้าง
                            </Link>
                        </div>
                    </form>
                </div>

                {selectedYear && (
                    <div className="mb-6 reveal-soft">
                        <Link href="/awards/khon-dee" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-secondary/15 hover:bg-secondary/25 text-primary font-semibold text-sm transition-all shadow-sm border border-secondary/20">
                            <span>←</span> ย้อนกลับไปเลือกปี พ.ศ. อื่น
                        </Link>
                    </div>
                )}

                {!showYearGrid && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 reveal-soft stagger-2">
                        <div>
                            <h2 className="text-2xl font-bold text-primary font-display flex flex-wrap items-baseline gap-2">
                                <span>
                                    {selectedCategory ? selectedCategory.subType : 'ทำเนียบผู้ได้รับรางวัล'}
                                </span>
                                <span className="text-base font-light text-base-content/60">
                                    (มี {sortedAwards.length} รายการ
                                    {selectedYear ? ` ในปี พ.ศ. ${selectedYear}` : ''}
                                    {searchQuery ? ` สำหรับ "${searchQuery}"` : ''})
                                </span>
                            </h2>
                        </div>
                    </div>
                )}

                {showYearGrid ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {years.map((year, index) => {
                            const count = awardsPerYear[year.buddhistYear] || 0
                            return (
                                <Link
                                    key={year.id}
                                    href={`/awards/khon-dee?year=${year.buddhistYear}`}
                                    className={`card-modern group bg-white rounded-3xl border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/50 transition-all duration-400 overflow-hidden flex flex-col h-full p-6 md:p-8 justify-between reveal-soft ${
                                        index % 4 === 0
                                            ? 'stagger-1'
                                            : index % 4 === 1
                                            ? 'stagger-2'
                                            : index % 4 === 2
                                            ? 'stagger-3'
                                            : 'stagger-4'
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="text-sm font-bold px-4 py-1.5 rounded-full bg-secondary/10 text-primary mb-4 group-hover:bg-secondary/20 transition-all duration-300 font-display">
                                            คนดีศรีเชียงราย
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-primary font-display mb-2 group-hover:text-secondary-dark transition-colors">
                                            พ.ศ. {year.buddhistYear}
                                        </h3>
                                        <p className="text-sm font-semibold text-secondary mb-4">
                                            ผู้ได้รับรางวัล {count} ท่าน
                                        </p>
                                        
                                        {(year.location || year.ceremonyDate) && (
                                            <div className="w-full border-t border-base-100 pt-4 mt-2 text-xs text-base-content/50 font-light text-left space-y-1.5">
                                                {year.ceremonyDate && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span>📅</span>
                                                        <span>{new Date(year.ceremonyDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                    </div>
                                                )}
                                                {year.location && (
                                                    <div className="flex items-start gap-1.5">
                                                        <span className="shrink-0">📍</span>
                                                        <span className="line-clamp-2">{year.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-6 w-full">
                                        <span className="btn btn-sm rounded-xl bg-primary text-white border-primary hover:bg-primary-dark group-hover:bg-secondary group-hover:border-secondary transition-all w-full py-2 h-auto text-xs font-semibold">
                                            ดูรายชื่อผู้ได้รับรางวัล
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : sortedAwards.length > 0 ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {sortedAwards.map((award, index) => {
                            const imageUrl = resolveMediaUrl(award.profileImage)
                            const yearLabel = award.year?.buddhistYear ? `พ.ศ. ${award.year.buddhistYear}` : 'ไม่ระบุปี'
                            const categoryLabel = award.category
                                ? `${pillarLabels[award.category.mainPillar]} / ${award.category.subType}`
                                : 'ไม่ระบุประเภทรางวัล'

                            return (
                                <Link
                                    key={award.id}
                                    href={`/awards/khon-dee/${award.id}`}
                                    className={`card-modern group bg-white rounded-3xl border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/50 transition-all duration-400 overflow-hidden flex flex-col h-full reveal-soft ${index % 4 === 0 ? 'stagger-1' : index % 4 === 1 ? 'stagger-2' : index % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}
                                >
                                    <figure className="aspect-square bg-slate-50 relative overflow-hidden shrink-0 border-b border-base-100">
                                        {imageUrl ? (
                                            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                                                <CmsImage
                                                    src={imageUrl}
                                                    alt={resolveMediaAlt(award.profileImage, award.fullName)}
                                                    fill
                                                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                                                <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-base-200 flex items-center justify-center text-primary/40 text-4xl">
                                                    รศ
                                                </div>
                                            </div>
                                        )}
                                    </figure>

                                    <div className="p-6 md:p-7 flex flex-col grow">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-secondary/20 text-primary uppercase tracking-widest">
                                                {yearLabel}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug font-display mb-3">
                                            {[award.prefix, award.fullName].filter(Boolean).join('')}
                                        </h3>

                                        {award.currentPosition && (
                                            <p className="text-sm text-base-content/60 font-medium mb-3">
                                                {award.currentPosition}
                                            </p>
                                        )}

                                        <p className="text-sm text-base-content/70 font-light line-clamp-2 mb-4">
                                            {award.contributionTitle}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-base-100 text-xs text-base-content/50 font-medium leading-relaxed">
                                            {categoryLabel}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-base-200">
                        <div className="w-20 h-20 mx-auto rounded-full bg-primary/5 text-primary/35 flex items-center justify-center text-3xl mb-5">
                            ค
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-display mb-3">ยังไม่พบข้อมูลรางวัลที่ตรงเงื่อนไข</h3>
                        <p className="text-base-content/60 font-light mb-6">
                            ลองเปลี่ยนตัวกรอง หรือกลับมาดูภายหลังเมื่อมีการเพิ่มข้อมูลในระบบ
                        </p>
                        <Link href="/awards/khon-dee" className="btn rounded-full bg-primary text-white border-primary hover:bg-primary-dark px-6">
                            ดูทั้งหมด
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
