# Heritage Blog Search Feature - Analysis & Design

**Date:** 15 มีนาคม 2569  
**Status:** 📋 Design Phase

---

## 1. Current State Analysis

### Existing Features
✅ **Category Filter** - Filter by 3 categories (มรดกภูมิปัญญา, แหล่งเรียนรู้, ปราชญ์ชาวบ้าน)  
✅ **Tag Filter** - Filter by tags from database  
✅ **Pagination** - Navigate through results  
✅ **Combined Filters** - Category + Tag work together

### Current Limitations
❌ No text-based search  
❌ No search by article title/content  
❌ No search by author  
❌ No search by district  
❌ No advanced filtering options

---

## 2. Search Requirements

### 2.1 Searchable Fields

Based on `HeritageBlog` collection schema:

| Field | Type | Searchable | Priority |
|-------|------|------------|----------|
| `title` | text | ✅ Full-text | **High** |
| `excerpt` | textarea | ✅ Full-text | **High** |
| `content` | richText | ✅ Full-text | Medium |
| `author` | text | ✅ Exact/Partial | Medium |
| `source` | text | ✅ Exact/Partial | Low |
| `category` | select | ✅ Exact match | **High** (existing) |
| `tags` | relationship | ✅ By tag slug | **High** (existing) |
| `relatedDistrict` | relationship | ✅ By district | Medium |

---

## 3. Search Feature Design

### 3.1 Search Types

#### **A. Simple Search** (Default)
- Single search box in header/sidebar
- Searches: `title` + `excerpt`
- Real-time suggestions (optional)
- URL: `?search=keyword`

#### **B. Advanced Search** (Expandable)
- Multiple filter fields
- Searches: `title` + `excerpt` + `content` + `author` + `district`
- Combined with existing category/tag filters
- URL: `?search=keyword&author=...&district=...`

---

### 3.2 UI/UX Design

#### **Layout Option 1: Search in Sidebar** (Recommended)

```
┌─────────────────────────────────────────────────────────────┐
│  📚 หมวดหมู่                    🔍 ค้นหา                   │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐  ┌──────────────────────────┐  │
│ │ 🔍 ค้นหาบทความ...      │  │ ✅ มรดกภูมิปัญญา         │  │
│ └─────────────────────────┘  │ ⬜ แหล่งเรียนรู้          │  │
│                              │ ⬜ ปราชญ์ชาวบ้าน         │  │
│ 🔍 ผลการค้นหา: "ผ้าทอ"      │                          │  │
│ พบ 5 รายการ                  │ 🏷️ แท็กทั้งหมด           │  │
│                              │ #ผ้าทอ #อาหาร #ประเพณี  │  │
│ ┌────────────────────────┐  │                          │  │
│ │ [Image] ผ้าซิ่นตีนจก   │  │                          │  │
│ │ มรดกภูมิปัญญา          │  │                          │  │
│ └────────────────────────┘  │                          │  │
└─────────────────────────────────────────────────────────────┘
```

#### **Layout Option 2: Search Bar Above Content**

```
┌─────────────────────────────────────────────────────────────┐
│  หมวดหมู่: ทั้งหมด                              🔍 [ค้นหา] │
├─────────────────────────────────────────────────────────────┤
│ 🔍 ค้นหา: "ผ้าทอ" | 🏷️ แท็ก: ผ้าทอ | 📂 หมวดหมู่: ทั้งหมด │
│ พบ 5 รายการ                                  [ล้างฟิลเตอร์] │
├─────────────────────────────────────────────────────────────┤
│  [Article Grid...]                                          │
└─────────────────────────────────────────────────────────────┘
```

---

### 3.3 Search Component Design

#### **Search Input Component**

```tsx
// Location: src/components/heritage/SearchBox.tsx
interface SearchBoxProps {
    initialValue?: string
    placeholder?: string
    variant?: 'simple' | 'advanced'
}

// Features:
- Debounced input (300ms delay)
- Clear button (X)
- Search icon
- Submit on Enter
- Mobile-responsive
```

#### **Active Filters Display**

```tsx
// Location: src/components/heritage/ActiveFilters.tsx
// Shows all active filters with remove buttons

Active Filters:
🔍 "ผ้าทอ" [×]  🏷️ #ผ้าทอ [×]  📂 มรดกภูมิปัญญา [×]  [ล้างทั้งหมด]
```

---

### 3.4 URL Structure

| Search Type | URL Example |
|-------------|-------------|
| Simple search | `/heritage?search=ผ้าทอ` |
| Search + Category | `/heritage?search=ผ้าทอ&category=intangible-heritage` |
| Search + Tag | `/heritage?search=ผ้า&tag=pha-tho` |
| Search + Author | `/heritage?search=วัฒนธรรม&author=สภาวัฒนธรรม` |
| Search + District | `/heritage?search=โบราณ&district=chiang-saen` |
| Advanced search | `/heritage?search=ผ้า&category=intangible-heritage&tag=pha-tho&author=สุชาติ` |

---

## 4. Technical Implementation

### 4.1 Backend API Changes

#### Update `getHeritageBlogs()` function:

```typescript
// src/lib/payload.ts

export const getHeritageBlogs = cache(async (options?: {
    category?: string
    tagSlug?: string
    search?: string        // NEW: Search keyword
    author?: string        // NEW: Author filter
    districtSlug?: string  // NEW: District filter
    limit?: number
    page?: number
}) => {
    const payload = await getPayloadClient()
    
    const where: any = {}
    
    // Existing category filter
    if (options?.category) {
        where.category = { equals: options.category }
    }
    
    // Existing tag filter
    if (options?.tagSlug) {
        const tag = await payload.find({
            collection: 'tags',
            where: { slug: { equals: options.tagSlug } },
            limit: 1,
        })
        if (tag.docs.length > 0) {
            where.tags = { equals: tag.docs[0].id }
        }
    }
    
    // NEW: Text search (title + excerpt)
    if (options?.search) {
        const searchKeyword = options.search.trim()
        
        // MongoDB text search simulation
        // Search in title
        where.title = {
            like: searchKeyword,
        }
        
        // Note: For full-text search across multiple fields,
        // we'll need to filter results after fetching
    }
    
    // NEW: Author filter
    if (options?.author) {
        where.author = {
            like: options.author,
        }
    }
    
    // NEW: District filter
    if (options?.districtSlug) {
        const district = await payload.find({
            collection: 'districts',
            where: { slug: { equals: options.districtSlug } },
            limit: 1,
        })
        if (district.docs.length > 0) {
            where.relatedDistrict = {
                equals: district.docs[0].id,
            }
        }
    }
    
    const response = await payload.find({
        collection: 'heritage-blog',
        where: Object.keys(where).length > 0 ? where : undefined,
        limit: options?.limit || 12,
        page: options?.page || 1,
        sort: '-createdAt',
        depth: 1,
    })
    
    // Post-filtering for full-text search (if needed)
    if (options?.search) {
        const keyword = options.search.toLowerCase()
        response.docs = response.docs.filter((doc: any) => {
            const title = doc.title?.toLowerCase() || ''
            const excerpt = doc.excerpt?.toLowerCase() || ''
            return title.includes(keyword) || excerpt.includes(keyword)
        })
        response.totalDocs = response.docs.length
    }
    
    return response
})
```

---

### 3.2 Frontend Component Structure

```
src/app/(frontend)/heritage/
├── page.tsx                    # Main page (updated)
├── SearchBox.tsx              # Search input component (NEW)
├── ActiveFilters.tsx          # Active filters display (NEW)
└── SearchSidebar.tsx          # Search + Filters sidebar (NEW)
```

---

### 3.3 Page Component Updates

```tsx
// src/app/(frontend)/heritage/page.tsx

export default async function HeritagePage({
    searchParams,
}: {
    searchParams: Promise<{
        category?: string
        tag?: string
        search?: string      // NEW
        author?: string      // NEW
        district?: string    // NEW
        page?: string
    }>
}) {
    const params = await searchParams
    
    // NEW: Extract search params
    const searchQuery = params.search || ''
    const authorQuery = params.author || ''
    const districtSlug = params.district || ''
    
    // Updated API call
    const [blogResponse, tagsData, districtsData] = await Promise.all([
        getHeritageBlogs({
            category: params.category,
            tagSlug: params.tag,
            search: searchQuery,
            author: authorQuery,
            districtSlug: districtSlug,
            limit: 12,
            page: currentPage
        }),
        getTags(),
        getDistricts()  // NEW: For district filter
    ])
    
    // ... rest of the logic
}
```

---

## 5. Search Algorithm Options

### Option 1: Simple String Matching (Recommended for MVP)

**Pros:**
- ✅ Easy to implement
- ✅ No additional dependencies
- ✅ Works with MongoDB
- ✅ Fast for small datasets (< 10,000 articles)

**Cons:**
- ❌ No fuzzy matching
- ❌ No relevance scoring
- ❌ Case-sensitive (unless normalized)

**Implementation:**
```typescript
where.title = {
    like: searchKeyword,  // MongoDB $regex
}
```

---

### Option 2: MongoDB Text Search

**Pros:**
- ✅ Better relevance scoring
- ✅ Supports stemming
- ✅ Case-insensitive
- ✅ Faster for large datasets

**Cons:**
- ❌ Requires text index
- ❌ More complex setup
- ❌ Limited to indexed fields

**Implementation:**
```typescript
// Create text index in MongoDB
db['heritage-blog'].createIndex({
    title: 'text',
    excerpt: 'text',
    content: 'text'
})

// Use $text operator
where.$text = {
    $search: searchKeyword,
    $language: 'thai'  // Thai language support
}
```

---

### Option 3: External Search Service (Future)

**Options:**
- Algolia
- Meilisearch
- Elasticsearch

**Pros:**
- ✅ Best search experience
- ✅ Typo tolerance
- ✅ Synonyms support
- ✅ Analytics

**Cons:**
- ❌ Additional cost
- ❌ More infrastructure
- ❌ Complexity

---

## 6. Implementation Priority

### Phase 1: MVP (Minimum Viable Product) ⭐ **Recommended**

**Features:**
1. ✅ Simple search box in sidebar
2. ✅ Search in `title` + `excerpt`
3. ✅ Combine with existing category/tag filters
4. ✅ Show active search query
5. ✅ Clear search button

**Effort:** 2-3 hours  
**Impact:** High

---

### Phase 2: Enhanced Search

**Features:**
1. ✅ Advanced search panel
2. ✅ Search in `content` field
3. ✅ Author filter
4. ✅ District filter
5. ✅ Search result highlighting

**Effort:** 4-6 hours  
**Impact:** Medium

---

### Phase 3: Premium Search (Future)

**Features:**
1. ⏳ Full-text search with MongoDB text index
2. ⏳ Search suggestions/autocomplete
3. ⏳ Search analytics
4. ⏳ Related articles based on search
5. ⏳ Search history

**Effort:** 1-2 days  
**Impact:** Medium

---

## 7. UI Components Design

### 7.1 Search Box Component

```tsx
// src/components/heritage/SearchBox.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchBox({ 
    placeholder = 'ค้นหาบทความ...',
    variant = 'simple'
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('search') || '')
    
    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                const params = new URLSearchParams(searchParams)
                params.set('search', query.trim())
                params.set('page', '1')  // Reset to first page
                router.push(`/heritage?${params.toString()}`)
            } else {
                const params = new URLSearchParams(searchParams)
                params.delete('search')
                router.push(`/heritage?${params.toString()}`)
            }
        }, 300)
        
        return () => clearTimeout(timer)
    }, [query])
    
    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 rounded-xl border border-base-200 
                         focus:border-primary focus:ring-2 focus:ring-primary/20 
                         outline-none transition-all"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 
                                 w-5 h-5 text-base-content/40" />
            {query && (
                <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                             p-1 hover:bg-base-200 rounded-full transition-colors"
                >
                    <XIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}
```

---

### 7.2 Active Filters Component

```tsx
// src/components/heritage/ActiveFilters.tsx
import Link from 'next/link'

interface ActiveFiltersProps {
    search?: string
    category?: string
    tag?: string
    author?: string
    district?: string
}

export default function ActiveFilters({
    search,
    category,
    tag,
    author,
    district
}: ActiveFiltersProps) {
    const filters = []
    
    if (search) filters.push({ type: 'search', label: `🔍 "${search}"` })
    if (category) filters.push({ type: 'category', label: `📂 ${category}` })
    if (tag) filters.push({ type: 'tag', label: `🏷️ #${tag}` })
    if (author) filters.push({ type: 'author', label: `✍️ ${author}` })
    if (district) filters.push({ type: 'district', label: `📍 ${district}` })
    
    if (filters.length === 0) return null
    
    return (
        <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-sm text-base-content/60">
                พบ {totalResults} รายการ
            </span>
            
            {filters.map((filter) => (
                <span
                    key={filter.type}
                    className="inline-flex items-center gap-1 px-3 py-1 
                             bg-primary/10 text-primary rounded-full text-sm
                             border border-primary/20"
                >
                    {filter.label}
                    <Link
                        href={`/heritage?${removeFilter(filter.type)}`}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                        <XIcon className="w-3 h-3" />
                    </Link>
                </span>
            ))}
            
            <Link
                href="/heritage"
                className="text-sm text-primary hover:underline ml-2"
            >
                ล้างทั้งหมด
            </Link>
        </div>
    )
}
```

---

## 8. Recommended Implementation Plan

### Step 1: Update API Utility (15 min)
- [ ] Add `search` parameter to `getHeritageBlogs()`
- [ ] Implement title + excerpt search
- [ ] Add post-filtering for full-text search

### Step 2: Create Search Components (45 min)
- [ ] Create `SearchBox.tsx` component
- [ ] Create `ActiveFilters.tsx` component
- [ ] Add debounced search logic

### Step 3: Update Heritage Page (30 min)
- [ ] Add search params handling
- [ ] Integrate SearchBox in sidebar
- [ ] Show active filters
- [ ] Update pagination to preserve search

### Step 4: Testing (30 min)
- [ ] Test search functionality
- [ ] Test combined filters
- [ ] Test pagination with search
- [ ] Test mobile responsiveness

**Total Time:** ~2 hours

---

## 9. Success Metrics

### Functional Requirements
- [x] Search by keyword (title + excerpt)
- [x] Combine with category filter
- [x] Combine with tag filter
- [x] Clear search easily
- [x] Show active search in URL
- [x] Pagination preserves search

### Non-Functional Requirements
- [x] Search response < 500ms
- [x] Mobile-responsive design
- [x] Accessible (keyboard navigation)
- [x] Thai language support

---

## 10. Conclusion & Recommendation

### Recommended Approach: **Phase 1 (MVP)**

**Why:**
1. ✅ Quick to implement (2 hours)
2. ✅ High user value
3. ✅ No additional infrastructure
4. ✅ Can be enhanced later

**Implementation Order:**
1. Simple search box in sidebar
2. Search in title + excerpt
3. Combine with existing filters
4. Active filters display

**Future Enhancements:**
- MongoDB text index (Phase 2)
- Advanced filters (author, district)
- Search analytics
- Autocomplete suggestions

---

**Ready for implementation! 🚀**
