import Link from 'next/link'
import { getHeritageBlogs, getPageHeroes, getTags } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicHeritage, PublicTag } from '@/lib/public-content'
import SearchBox from '@/components/heritage/SearchBox'
import ActiveFilters from '@/components/heritage/ActiveFilters'
import CmsImage from '@/components/CmsImage'

const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: '📚' },
    { id: 'intangible-heritage', label: 'มรดกภูมิปัญญา', icon: '🏛️' },
    { id: 'learning-resources', label: 'แหล่งเรียนรู้', icon: '📖' },
    { id: 'local-wisdom', label: 'ปราชญ์ชาวบ้าน', icon: '👨‍🏫' },
]

export default async function HeritagePage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; tag?: string, search?: string, page?: string }>
}) {
    const params = await searchParams
    const selectedCategory = params.category || 'all'
    const selectedTag = params.tag || ''
    const searchQuery = params.search || ''
    const currentPage = Number(params.page) || 1

    // ดึงข้อมูลบทความและแท็กพร้อมกัน
    const [blogResponse, tagsData] = await Promise.all([
        getHeritageBlogs({
            category: selectedCategory === 'all' && !selectedTag && !searchQuery ? undefined : selectedCategory === 'all' ? undefined : selectedCategory,
            tagSlug: selectedTag || undefined,
            search: searchQuery || undefined,
            limit: 12,
            page: currentPage
        }),
        getTags()
    ])

    const filteredArticles = (blogResponse.docs || []) as PublicHeritage[]
    const totalPages = blogResponse.totalPages || 1
    const hasNextPage = blogResponse.hasNextPage || false
    const hasPrevPage = blogResponse.hasPrevPage || false
    const tags = (tagsData || []) as PublicTag[]
    const pageHeroes = await getPageHeroes().catch(() => null)
    const hero = pageHeroes?.heritage || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'คลังมรดกภูมิปัญญา')
    const hasHeroImage = Boolean(heroImageUrl)

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <section className={`relative overflow-hidden ${hasHeroImage ? 'pt-32 pb-24 lg:pt-40 lg:pb-30 accent-panel min-h-[52vh] flex items-end' : 'pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-50 accent-panel'}`}>
                {hasHeroImage ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <CmsImage
                                src={heroImageUrl!}
                                alt={heroImageAlt}
                                fill
                                sizes="100vw"
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/70 to-primary/40" />
                            <div className="absolute inset-0 bg-lanna-pattern opacity-20" />
                            <div className="absolute top-0 right-[-10%] w-[50%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 relative z-20">
                            <div className="max-w-4xl text-left">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-sm mb-6 bg-white/14 backdrop-blur-md border border-white/20 text-white reveal-soft">
                                            <span className="w-2 h-2 rounded-full bg-accent" />
                                            {(hero.eyebrow as string) || 'ความรู้และภูมิปัญญา'}
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight font-display leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                            {(hero.title as string) || 'คลังมรดกภูมิปัญญาทางวัฒนธรรม'}
                                </h1>

                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />

                                <p className="text-lg md:text-xl text-white/82 max-w-3xl font-light leading-relaxed reveal-soft stagger-2">
                                            {(hero.subtitle as string) || 'รวบรวมและสงวนรักษามรดกทางวัฒนธรรม องค์ความรู้ และภูมิปัญญาท้องถิ่นอันทรงคุณค่าของจังหวัดเชียงราย'}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 z-0 bg-lanna-pattern">
                            <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/15 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 relative z-20 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 reveal-soft">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                {(hero.eyebrow as string) || 'ความรู้และภูมิปัญญา'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight reveal-soft stagger-1 font-display">
                                {(hero.title as string) || 'คลังมรดกภูมิปัญญาทางวัฒนธรรม'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'รวบรวมและสงวนรักษามรดกทางวัฒนธรรม องค์ความรู้ และภูมิปัญญาท้องถิ่นอันทรงคุณค่าของจังหวัดเชียงราย'}
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">คลังมรดกภูมิปัญญาทางวัฒนธรรม</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-8 pb-24">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="lg:col-span-1 reveal-soft stagger-1">
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 sticky top-28 space-y-6 accent-panel">
                            {/* Search Box */}
                            <div>
                                <h3 className="text-sm font-bold text-base-content/80 mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                    ค้นหา
                                </h3>
                                <SearchBox placeholder="ค้นหาบทความ..." />
                            </div>

                            {/* Categories */}
                            <div className="pt-6 border-t border-base-100">
                                <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 font-display">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" /></svg>
                                    หมวดหมู่
                                </h3>

                                <ul className="space-y-1">
                                    {categories.map((cat) => {
                                        // Build params: clear tag when selecting category
                                        const catParams = new URLSearchParams()
                                        if (cat.id !== 'all') catParams.set('category', cat.id)
                                        // Tag is cleared when changing category

                                        return (
                                            <li key={cat.id}>
                                                <Link
                                                    href={cat.id === 'all' ? '/heritage' : `/heritage?${catParams.toString()}`}
                                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${selectedCategory === cat.id && !selectedTag
                                                        ? 'bg-primary text-white shadow-md font-medium'
                                                        : 'hover:bg-secondary/10 text-base-content/70 hover:text-primary font-light'
                                                        }`}
                                                >
                                                    <span className="text-xl shrink-0 w-8 text-center">{cat.icon}</span>
                                                    <span>{cat.label}</span>
                                                    {selectedCategory === cat.id && !selectedTag && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-70 text-secondary"><path d="m9 18 6-6-6-6" /></svg>
                                                    )}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* All Tags */}
                                <div className="mt-8 pt-8 border-t border-base-100">
                                    <h4 className="text-sm font-bold text-base-content/80 mb-4 uppercase tracking-wider flex items-center justify-between">
                                        <span>แท็กทั้งหมด</span>
                                        {selectedTag && (
                                            <Link
                                                href="/heritage"
                                                className="text-xs font-normal text-primary hover:underline flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                ล้าง
                                            </Link>
                                        )}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.length > 0 ? (
                                            tags.map((tag) => (
                                                <Link
                                                    key={tag.id}
                                                    href={`/heritage?tag=${tag.slug}`}
                                                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${selectedTag === tag.slug
                                                        ? 'bg-primary text-white border-primary shadow-sm'
                                                        : 'bg-slate-50 border-base-200 text-base-content/60 hover:text-primary hover:border-secondary'
                                                        }`}
                                                >
                                                    #{tag.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs text-base-content/50 w-full text-center py-4">ยังไม่มีแท็ก</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Article Grid */}
                    <main className="lg:col-span-3 pb-12">
                        {/* Active Filters Display */}
                        <ActiveFilters />

                        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 reveal-soft stagger-2">
                            <h2 className="text-2xl font-bold flex items-center gap-3 font-display text-primary">
                                {searchQuery
                                    ? `🔍 "${searchQuery}"`
                                    : selectedTag
                                        ? `#${tags.find((t) => t.slug === selectedTag)?.name || selectedTag}`
                                        : categories.find(c => c.id === selectedCategory)?.label || 'ทั้งหมด'
                                }
                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary/20 text-primary-dark">
                                    {filteredArticles.length} รายการ
                                </span>
                            </h2>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-base-content/50 font-light">จัดเรียง:</span>
                                <select className="bg-white border border-base-200 text-sm rounded-xl px-4 py-2 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%23caa635%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-size-[1em] bg-position-[right_0.5rem_center] bg-no-repeat shadow-sm">
                                    <option>ล่าสุด</option>
                                    <option>ยอดนิยม</option>
                                    <option>ตัวอักษร ก-ฮ</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredArticles.length > 0 ? filteredArticles.map((article, i: number) => {
                                const imageUrl = resolveMediaUrl(article.coverImage)

                                return (
                                    <Link
                                        key={article.id || article.slug}
                                        href={`/heritage/${article.slug || article.id}`}
                                        className={`card-modern group bg-white rounded-3xl border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/50 transition-all duration-400 overflow-hidden flex flex-col h-full reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}
                                    >
                                        <figure className="aspect-16/10 bg-slate-50 relative overflow-hidden shrink-0 border-b border-base-100">
                                            {imageUrl ? (
                                                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                                                    <CmsImage
                                                        src={imageUrl}
                                                        alt={article.title}
                                                        fill
                                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/10 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                                                    <span className="text-primary/30 drop-shadow-sm group-hover:-translate-y-2 transition-transform duration-500 delay-100 [&>svg]:w-16 [&>svg]:h-16">
                                                        {categories.find(c => c.id === article.category)?.icon || (
                                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                                                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </figure>
                                        <div className="p-6 md:p-8 flex flex-col grow">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-secondary/20 text-primary uppercase tracking-widest">
                                                    {categories.find(c => c.id === article.category)?.label || 'มรดกภูมิปัญญา'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-3 leading-snug font-display">
                                                {article.title}
                                            </h3>
                                            {article.excerpt && (
                                                <p className="text-sm text-base-content/70 font-light line-clamp-2 mb-6 grow">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                )
                            }) : (
                                <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-base-200">
                                    {searchQuery ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-base-content/30">
                                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                            </svg>
                                            <h3 className="text-xl font-bold text-base-content/70 mb-2">ไม่พบบทความที่ค้นหา</h3>
                                            <p className="text-base-content/50 mb-4">
                                                ไม่พบบทความที่ตรงกับ &quot;{searchQuery}&quot;
                                            </p>
                                            <Link
                                                href="/heritage"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                                กลับไปดูบทความทั้งหมด
                                            </Link>
                                        </>
                                    ) : (
                                        <p className="text-base-content/50">ไม่พบบทความมรดกภูมิปัญญาในหมวดหมู่ที่เลือก</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-16 reveal-soft stagger-4">
                            {totalPages > 1 && (
                                <div className="inline-flex items-center justify-center p-1 bg-white rounded-full border border-base-200 shadow-sm">
                                    {/* Build query string preserving both category and tag */}
                                    {(() => {
                                        const baseParams = new URLSearchParams()
                                        if (selectedCategory && selectedCategory !== 'all') baseParams.set('category', selectedCategory)
                                        if (selectedTag) baseParams.set('tag', selectedTag)

                                        const prevParams = new URLSearchParams(baseParams)
                                        prevParams.set('page', String(currentPage - 1))

                                        const nextParams = new URLSearchParams(baseParams)
                                        nextParams.set('page', String(currentPage + 1))

                                        return (
                                            <>
                                                <Link
                                                    href={`?${prevParams.toString()}`}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-full ${hasPrevPage ? 'text-base-content/70 hover:bg-secondary/10 transition-colors' : 'text-base-content/40 cursor-not-allowed pointer-events-none'}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                                </Link>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                    const pageParams = new URLSearchParams(baseParams)
                                                    pageParams.set('page', String(page))
                                                    return (
                                                        <Link
                                                            key={page}
                                                            href={`?${pageParams.toString()}`}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium ${currentPage === page ? 'bg-primary text-white shadow-sm' : 'text-base-content/70 hover:bg-secondary/10 transition-colors'}`}
                                                        >
                                                            {page}
                                                        </Link>
                                                    )
                                                })}

                                                <Link
                                                    href={`?${nextParams.toString()}`}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-full ${hasNextPage ? 'text-base-content/70 hover:bg-secondary/10 transition-colors' : 'text-base-content/40 cursor-not-allowed pointer-events-none'}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                </Link>
                                            </>
                                        )
                                    })()}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
