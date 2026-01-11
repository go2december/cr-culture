import Link from 'next/link'

const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: '📚' },
    { id: 'intangible-heritage', label: 'มรดกภูมิปัญญา', icon: '🏛️' },
    { id: 'chiangrai-studies', label: 'ศูนย์เชียงรายศึกษา', icon: '🎓' },
    { id: 'learning-resources', label: 'แหล่งเรียนรู้', icon: '📖' },
    { id: 'local-wisdom', label: 'ปราชญ์ชาวบ้าน', icon: '👨‍🏫' },
]

const sampleArticles = [
    {
        slug: 'lanna-textile',
        title: 'ผ้าทอล้านนา มรดกแห่งภูมิปัญญา',
        excerpt: 'ศิลปะการทอผ้าของชาวล้านนาที่สืบทอดกันมาหลายชั่วอายุคน',
        category: 'intangible-heritage',
        tags: ['ผ้าทอ', 'หัตถกรรม'],
        coverImage: null,
    },
    {
        slug: 'khantoke-dinner',
        title: 'ขันโตก วัฒนธรรมการกินอาหารล้านนา',
        excerpt: 'ประเพณีการรับประทานอาหารบนขันโตก ที่เชื่อมโยงคนในครอบครัว',
        category: 'intangible-heritage',
        tags: ['อาหาร', 'ประเพณี'],
        coverImage: null,
    },
    {
        slug: 'chiang-rai-history',
        title: 'ประวัติศาสตร์เมืองเชียงราย',
        excerpt: 'เรื่องราวความเป็นมาของนครเชียงราย ตั้งแต่สมัยพญามังราย',
        category: 'chiangrai-studies',
        tags: ['ประวัติศาสตร์'],
        coverImage: null,
    },
    {
        slug: 'wat-rong-khun',
        title: 'วัดร่องขุ่น แหล่งเรียนรู้ทางศิลปะ',
        excerpt: 'สถาปัตยกรรมร่วมสมัยที่ผสมผสานศิลปะล้านนากับความทันสมัย',
        category: 'learning-resources',
        tags: ['วัด', 'ศิลปะ'],
        coverImage: null,
    },
    {
        slug: 'local-sage-interview',
        title: 'ปราชญ์ชาวบ้าน ผู้รักษาภูมิปัญญาท้องถิ่น',
        excerpt: 'บทสัมภาษณ์ปราชญ์ชาวบ้านผู้เชี่ยวชาญด้านสมุนไพรพื้นบ้าน',
        category: 'local-wisdom',
        tags: ['สมุนไพร', 'ภูมิปัญญา'],
        coverImage: null,
    },
]

export default function HeritagePage({
    searchParams,
}: {
    searchParams: { category?: string; tag?: string }
}) {
    const selectedCategory = searchParams.category || 'all'

    const filteredArticles = selectedCategory === 'all'
        ? sampleArticles
        : sampleArticles.filter(a => a.category === selectedCategory)

    return (
        <>
            {/* Header */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        คลังมรดกภูมิปัญญา
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        สำรวจมรดกทางวัฒนธรรมและภูมิปัญญาท้องถิ่นของจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-xl sticky top-24">
                            <div className="card-body">
                                <h3 className="card-title text-lg text-primary mb-4">
                                    หมวดหมู่
                                </h3>

                                <ul className="space-y-2">
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link
                                                href={cat.id === 'all' ? '/heritage' : `/heritage?category=${cat.id}`}
                                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${selectedCategory === cat.id
                                                        ? 'bg-primary text-white'
                                                        : 'hover:bg-base-200'
                                                    }`}
                                            >
                                                <span className="text-xl">{cat.icon}</span>
                                                <span className="font-medium">{cat.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {/* Popular Tags */}
                                <div className="divider"></div>
                                <h4 className="font-semibold mb-3">แท็กยอดนิยม</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['ผ้าทอ', 'อาหาร', 'ประเพณี', 'ศิลปะ', 'สมุนไพร', 'หัตถกรรม'].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/heritage?tag=${tag}`}
                                            className="badge badge-outline hover:badge-primary transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Article Grid */}
                    <main className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">
                                {categories.find(c => c.id === selectedCategory)?.label || 'ทั้งหมด'}
                                <span className="text-base-content/50 font-normal ml-2">
                                    ({filteredArticles.length} บทความ)
                                </span>
                            </h2>

                            <select className="select select-bordered select-sm">
                                <option>เรียงตามล่าสุด</option>
                                <option>เรียงตามยอดนิยม</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredArticles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/heritage/${article.slug}`}
                                    className="card-heritage group"
                                >
                                    <figure className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                                        <span className="text-5xl group-hover:scale-110 transition-transform">
                                            {categories.find(c => c.id === article.category)?.icon || '📄'}
                                        </span>
                                    </figure>
                                    <div className="card-body">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="badge badge-primary badge-sm">
                                                {categories.find(c => c.id === article.category)?.label}
                                            </span>
                                        </div>
                                        <h3 className="card-title text-lg group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-base-content/70 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {article.tags.map((tag) => (
                                                <span key={tag} className="badge badge-ghost badge-xs">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-12">
                            <div className="join">
                                <button className="join-item btn btn-disabled">«</button>
                                <button className="join-item btn btn-primary">1</button>
                                <button className="join-item btn">2</button>
                                <button className="join-item btn">3</button>
                                <button className="join-item btn">»</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
