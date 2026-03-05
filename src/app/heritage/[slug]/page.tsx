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
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-gradient-to-bl from-white/10 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-secondary/30 to-transparent blur-[130px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_,#000_70%,transparent_100%)]" />
                </div>

                <div className="container mx-auto max-w-5xl px-4 relative z-10 text-white text-center">
                    <Link
                        href={`/heritage?category=${article.category}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium shadow-sm mb-6 hover:bg-white/30 transition-colors animate-fade-in-up"
                    >
                        {article.categoryLabel}
                    </Link>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100 drop-shadow-md">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-sm opacity-90 animate-fade-in-up delay-200 font-light">
                        <span className="flex items-center gap-2">โดย {article.author}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span>{new Date(article.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg> {article.viewCount.toLocaleString()} ครั้ง</span>
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-5xl px-4 py-6 relative z-20 -mt-8">
                <div className="breadcrumbs text-sm bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-base-200 inline-block text-base-content/60 font-light animate-fade-in-up delay-300">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/heritage" className="hover:text-primary transition-colors">คลังมรดกภูมิปัญญา</Link></li>
                        <li className="text-primary font-medium">{article.title}</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-2 space-y-8 animate-fade-in-up delay-400">
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-8 lg:p-10">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {article.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/heritage?tag=${tag}`}
                                        className="px-3 py-1 bg-slate-50 border border-base-200 rounded-lg text-sm text-base-content/60 hover:text-primary hover:border-primary/30 transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>

                            {/* Excerpt */}
                            <div className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary mb-8 text-lg text-primary-dark font-medium leading-relaxed">
                                {article.excerpt}
                            </div>

                            {/* Content */}
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-p:text-base-content/80 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-light prose-strong:text-base-content"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* Gallery */}
                            <div className="mt-12 pt-10 border-t border-base-100">
                                <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                    แกลเลอรี
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {article.gallery.map((item, i) => (
                                        <div key={i} className="group relative aspect-square bg-slate-100 rounded-2xl border border-base-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-md transition-all">
                                            <div className="text-center p-4 z-10 group-hover:scale-110 transition-transform duration-500">
                                                <span className="text-4xl mb-3 block drop-shadow-sm">🖼️</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-4">
                                                <span className="text-sm font-medium text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.caption}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Share */}
                            <div className="mt-12 pt-8 border-t border-base-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <h4 className="font-semibold text-base-content/80">แชร์บทความนี้</h4>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-base-200 text-base-content/60 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></button>
                                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-base-200 text-base-content/60 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></button>
                                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-base-200 text-base-content/60 flex items-center justify-center hover:bg-[#00c300] hover:text-white hover:border-[#00c300] transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349.0.63.285.63.631v.373c0 .346-.281.631-.63.631H4.635c-.349.0-.63-.285-.63-.631v-.373c.0-.346.281-.631.63-.631h14.73zm0-4.004c.349.0.63.285.63.631v.373c.0.346-.281.631-.63.631H4.635c-.349.0-.63-.285-.63-.631v-.373c.0-.346.281-.631.63-.631h14.73zm0 8.008c.349.0.63.285.63.631v.373c.0.346-.281.631-.63.631H4.635c-.349.0-.63-.285-.63-.631v-.373c.0-.346.281-.631.63-.631h14.73z" /></svg></button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6 animate-fade-in-up delay-500">
                        {/* Related District */}
                        {article.relatedDistrict && (
                            <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    อำเภอที่เกี่ยวข้อง
                                </h3>
                                <Link
                                    href="/districts/muang-chiang-rai"
                                    className="group block p-4 bg-slate-50 border border-base-200 rounded-2xl hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-base-200 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                            📍
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">เครือข่ายระดับอำเภอ</div>
                                            <div className="font-bold text-base-content group-hover:text-primary transition-colors">{article.relatedDistrict}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Related Articles */}
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                            <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                บทความที่เกี่ยวข้อง
                            </h3>
                            <ul className="space-y-3">
                                {relatedArticles.map((related, i) => (
                                    <li key={i}>
                                        <Link
                                            href={`/heritage/${related.slug}`}
                                            className="group flex gap-4 p-3 bg-slate-50 border border-base-100 rounded-xl hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all"
                                        >
                                            <div className="w-12 h-12 bg-base-200 rounded-lg flex items-center justify-center flex-shrink-0 text-xl group-hover:bg-primary/5 transition-colors">
                                                📄
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-medium text-sm text-base-content group-hover:text-primary transition-colors line-clamp-2">
                                                    {related.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Back to Heritage */}
                        <Link href="/heritage" className="btn btn-primary rounded-xl w-full flex items-center justify-center gap-2 group shadow-sm hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
                            กลับไปยังคลังมรดกภูมิปัญญา
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    )
}
