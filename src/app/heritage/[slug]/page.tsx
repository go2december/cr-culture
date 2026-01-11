import Link from 'next/link'

export default async function HeritageArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    // TODO: Fetch from Payload API
    const article = {
        title: 'ผ้าทอล้านนา มรดกแห่งภูมิปัญญา',
        category: 'intangible-heritage',
        categoryLabel: 'มรดกภูมิปัญญา',
        author: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        createdAt: '2026-01-10',
        viewCount: 1234,
        excerpt: 'ศิลปะการทอผ้าของชาวล้านนาที่สืบทอดกันมาหลายชั่วอายุคน',
        content: `
      <p>ผ้าทอล้านนาเป็นมรดกทางวัฒนธรรมที่มีคุณค่าอย่างยิ่งของภาคเหนือ สะท้อนถึงภูมิปัญญา ความเชื่อ และวิถีชีวิตของคนล้านนามาอย่างยาวนาน</p>
      
      <h2>ประวัติความเป็นมา</h2>
      <p>การทอผ้าในดินแดนล้านนามีมาตั้งแต่สมัยโบราณ โดยเริ่มจากการทอผ้าเพื่อใช้ในครัวเรือน และพัฒนามาเป็นงานหัตถกรรมที่มีชื่อเสียง</p>
      
      <h2>เทคนิคการทอ</h2>
      <p>ผ้าทอล้านนามีหลายเทคนิค เช่น ผ้าตีนจก ผ้ายกดอก และผ้าขิด แต่ละเทคนิคมีความละเอียดและความงามเฉพาะตัว</p>
      
      <h2>ลวดลายและความหมาย</h2>
      <p>ลวดลายบนผ้าทอล้านนามักมีความหมายเชิงสัญลักษณ์ เช่น ลายนาค ลายดอกแก้ว ลายเครือวัลย์ ซึ่งสะท้อนความเชื่อทางศาสนาและวัฒนธรรม</p>
    `,
        tags: ['ผ้าทอ', 'หัตถกรรม', 'ล้านนา'],
        relatedDistrict: 'เมืองเชียงราย',
        gallery: [
            { caption: 'ผ้าตีนจกลายโบราณ' },
            { caption: 'กระบวนการทอผ้า' },
            { caption: 'ลวดลายนาค' },
        ],
    }

    // Related articles
    const relatedArticles = [
        { slug: 'khantoke-dinner', title: 'ขันโตก วัฒนธรรมการกินอาหารล้านนา' },
        { slug: 'lanna-dance', title: 'ฟ้อนเล็บ ศิลปะการแสดงล้านนา' },
        { slug: 'paper-umbrella', title: 'ร่มกระดาษสา หัตถกรรมชุมชน' },
    ]

    return (
        <>
            {/* Hero Image */}
            <section className="relative h-[50vh] bg-gradient-to-br from-primary to-secondary flex items-end">
                <div className="absolute inset-0 bg-black/30" />
                <div className="container mx-auto max-w-5xl px-4 pb-12 relative z-10 text-white">
                    <Link
                        href={`/heritage?category=${article.category}`}
                        className="badge badge-secondary mb-4"
                    >
                        {article.categoryLabel}
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                        <span>โดย {article.author}</span>
                        <span>•</span>
                        <span>{new Date(article.createdAt).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                        <span>•</span>
                        <span>👁️ {article.viewCount.toLocaleString()} ครั้ง</span>
                    </div>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-5xl px-4 py-4">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link href="/">หน้าแรก</Link></li>
                        <li><Link href="/heritage">คลังมรดกภูมิปัญญา</Link></li>
                        <li className="text-primary">{article.title}</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/heritage?tag=${tag}`}
                                    className="badge badge-outline hover:badge-primary"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>

                        {/* Excerpt */}
                        <p className="text-xl text-base-content/80 leading-relaxed mb-8 font-medium">
                            {article.excerpt}
                        </p>

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Gallery */}
                        <section className="mt-12">
                            <h3 className="text-xl font-bold text-primary mb-6">แกลเลอรี</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {article.gallery.map((item, i) => (
                                    <div key={i} className="aspect-square bg-base-200 rounded-lg flex items-center justify-center">
                                        <div className="text-center p-4">
                                            <span className="text-3xl mb-2 block">🖼️</span>
                                            <span className="text-xs text-base-content/60">{item.caption}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-base-300">
                            <h4 className="font-semibold mb-4">แชร์บทความนี้</h4>
                            <div className="flex gap-2">
                                <button className="btn btn-circle btn-ghost">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-ghost">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-ghost">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-ghost">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Related District */}
                        {article.relatedDistrict && (
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title text-lg text-primary">
                                        อำเภอที่เกี่ยวข้อง
                                    </h3>
                                    <Link
                                        href="/districts/muang-chiang-rai"
                                        className="flex items-center gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                                    >
                                        <span className="text-2xl">📍</span>
                                        <span className="font-medium">{article.relatedDistrict}</span>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Related Articles */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-lg text-primary mb-4">
                                    บทความที่เกี่ยวข้อง
                                </h3>
                                <ul className="space-y-3">
                                    {relatedArticles.map((related, i) => (
                                        <li key={i}>
                                            <Link
                                                href={`/heritage/${related.slug}`}
                                                className="block p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                                            >
                                                <h4 className="font-medium text-sm line-clamp-2">
                                                    {related.title}
                                                </h4>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Back to Heritage */}
                        <Link href="/heritage" className="btn btn-primary btn-block">
                            ← กลับไปยังคลังมรดกภูมิปัญญา
                        </Link>
                    </aside>
                </div>
            </div>
        </>
    )
}
