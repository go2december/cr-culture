import Link from 'next/link'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import { getAwardYears, getPageHeroes, getWisdomAwards, getWisdomCategories } from '@/lib/payload'

export default async function WisdomAwardsPage({
    searchParams,
}: {
    searchParams: Promise<{ year?: string; category?: string; sortBy?: string; q?: string }>
}) {
    const params = await searchParams
    const selectedYear = params.year || ''
    const selectedCategory = params.category || ''
    const sortBy = params.sortBy || 'category'
    const searchQuery = params.q || ''

    const [response, years, categories, pageHeroes] = await Promise.all([
        getWisdomAwards({
            year: selectedYear || undefined,
            category: selectedCategory || undefined,
            q: searchQuery || undefined,
        }),
        getAwardYears(),
        getWisdomCategories(),
        getPageHeroes().catch(() => null),
    ])

    const items = response.docs || []
    const sortedItems = [...items]
    if (sortBy === 'category') {
        sortedItems.sort((a, b) => {
            const catA = a.wisdomCategory?.title || ''
            const catB = b.wisdomCategory?.title || ''
            return catA.localeCompare(catB, 'th')
        })
    } else if (sortBy === 'year_desc') {
        sortedItems.sort((a, b) => (b.year?.buddhistYear || 0) - (a.year?.buddhistYear || 0))
    } else if (sortBy === 'year_asc') {
        sortedItems.sort((a, b) => (a.year?.buddhistYear || 0) - (b.year?.buddhistYear || 0))
    } else if (sortBy === 'name') {
        sortedItems.sort((a, b) => {
            const nameA = [a.prefix, a.fullName].filter(Boolean).join('')
            const nameB = [b.prefix, b.fullName].filter(Boolean).join('')
            return nameA.localeCompare(nameB, 'th')
        })
    }

    const hero = pageHeroes?.wisdomAwards || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ครูภูมิผญาเมืองเชียงราย')

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

                <div className="container relative z-10 mx-auto max-w-7xl px-4">
                    <div className="max-w-4xl">
                        <h1 className={`font-display text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl ${heroImageUrl ? 'text-white' : 'text-primary'}`}>
                            {(hero.title as string) || 'ครูภูมิผญาเมืองเชียงราย'}
                        </h1>
                        <p className={`mt-5 max-w-3xl text-lg font-light leading-relaxed md:text-xl ${heroImageUrl ? 'text-white/86' : 'text-base-content/70'}`}>
                            {(hero.subtitle as string) || 'ทำเนียบผู้สืบสานองค์ความรู้ท้องถิ่นของเชียงราย แยกตามสาขาเพื่อการค้นหาและเผยแพร่ได้อย่างชัดเจน'}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-7xl px-4 py-6">
                <div className="breadcrumbs text-sm text-base-content/60">
                    <ul>
                        <li><Link href="/" className="transition-colors hover:text-primary">หน้าแรก</Link></li>
                        <li className="font-medium text-primary">ครูภูมิผญาเมืองเชียงราย</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 pb-24">
                <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                    <form className="grid items-end gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr_1.1fr_auto]">
                        <label className="form-control">
                            <span className="label-text mb-2 text-sm font-semibold text-base-content/70">ค้นหา</span>
                            <input type="text" name="q" defaultValue={searchQuery} placeholder="ชื่อครูภูมิผญา หรือคำสำคัญในรายละเอียด" className="input input-bordered w-full rounded-2xl border-base-200" />
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
                            <span className="label-text mb-2 text-sm font-semibold text-base-content/70">สาขาองค์ความรู้</span>
                            <select name="category" defaultValue={selectedCategory} className="select select-bordered w-full rounded-2xl border-base-200">
                                <option value="">ทุกสาขา</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.slug}>{category.title}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-control">
                            <span className="label-text mb-2 text-sm font-semibold text-base-content/70">เรียงลำดับ</span>
                            <select name="sortBy" defaultValue={sortBy} className="select select-bordered w-full rounded-2xl border-base-200">
                                <option value="category">ประเภทรางวัลที่ได้รับ</option>
                                <option value="year_desc">ปี พ.ศ. (ล่าสุด - เก่าสุด)</option>
                                <option value="year_asc">ปี พ.ศ. (เก่าสุด - ล่าสุด)</option>
                                <option value="name">ชื่อครูภูมิผญา (ก-ฮ)</option>
                            </select>
                        </label>
                        <div className="flex gap-3">
                            <button type="submit" className="btn min-h-12 rounded-2xl border-primary bg-primary px-6 text-white hover:bg-primary-dark">กรองข้อมูล</button>
                            <Link href="/awards/wisdom-awards" className="btn btn-ghost min-h-12 rounded-2xl px-5">ล้าง</Link>
                        </div>
                    </form>
                </div>

                <div className="mt-8">
                    <h2 className="font-display text-2xl font-bold text-primary">ทำเนียบครูภูมิผญา</h2>
                    <p className="mt-2 text-base-content/60">พบ {sortedItems.length} รายการ{selectedYear ? ` ในปี ${selectedYear}` : ''}</p>
                </div>

                {sortedItems.length > 0 ? (
                    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {sortedItems.map((item) => {
                            const imageUrl = resolveMediaUrl(item.avatarImage)
                            return (
                                <Link key={item.id} href={`/awards/wisdom-awards/${item.id}`} className="group overflow-hidden rounded-3xl border border-base-200 bg-white shadow-sm transition-all duration-300 hover:border-secondary/50 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)]">
                                    <div className="relative aspect-square overflow-hidden border-b border-base-100 bg-slate-50">
                                        {imageUrl ? (
                                            <CmsImage src={imageUrl} alt={resolveMediaAlt(item.avatarImage, item.fullName)} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/5 to-secondary/10 text-4xl text-primary/35">ภ</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {item.year?.buddhistYear && (
                                                <span className="rounded bg-secondary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">พ.ศ. {item.year.buddhistYear}</span>
                                            )}
                                        </div>
                                        <h3 className="font-display text-xl font-bold leading-snug text-primary transition-colors group-hover:text-secondary-dark">
                                            {[item.prefix, item.fullName].filter(Boolean).join('')}
                                        </h3>
                                        <p className="mt-3 text-sm font-medium text-base-content/60">{item.wisdomCategory?.title || 'ไม่ระบุสาขา'}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="mt-8 rounded-3xl border border-dashed border-base-200 bg-white py-16 text-center">
                        <h3 className="font-display text-2xl font-bold text-primary">ยังไม่พบข้อมูลที่ตรงกับเงื่อนไข</h3>
                        <p className="mt-3 text-base-content/60">ลองเปลี่ยนคำค้นหา เลือกปี หรือสาขาองค์ความรู้ใหม่</p>
                    </div>
                )}
            </div>
        </div>
    )
}
