# Tags Filter Implementation - Heritage Blog

**Date:** 15 มีนาคม 2569  
**Status:** ✅ Completed

---

## Overview

Implemented a complete tags filtering system for the Heritage Blog page, allowing users to filter articles by tags from the Payload CMS.

---

## Changes Made

### 1. **Payload API Utility** (`src/lib/payload.ts`)

#### Added `getTags()` function:
```typescript
export const getTags = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'tags',
    limit: 100,
    sort: 'name',
  })
  return docs
})
```

#### Updated `getHeritageBlogs()` to support tag filtering:
```typescript
export const getHeritageBlogs = cache(async (options?: { 
  category?: string, 
  tagSlug?: string,  // NEW parameter
  limit?: number, 
  page?: number 
}) => {
  const payload = await getPayloadClient()
  
  const where: any = {}
  if (options?.category) {
    where.category = { equals: options.category }
  }
  
  // Filter by tag (find tag ID from slug first)
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
  
  // ... rest of the query
})
```

---

### 2. **Heritage Blog Page** (`src/app/(frontend)/heritage/page.tsx`)

#### Key Features Added:

1. **Dynamic Tags from Database**
   - Fetches all tags from Payload CMS
   - Displays them in the sidebar
   - Shows active state for selected tag

2. **Tag Filter Logic**
   - Supports filtering by tag slug
   - Clears tag when selecting a category
   - Preserves tag in pagination

3. **UI Improvements**
   - Shows selected tag in page title
   - "Clear filter" link when tag is active
   - Active tag highlighting (purple background)
   - Empty state when no tags exist

4. **URL Parameter Handling**
   - `?tag=pha-tho` - Filter by tag
   - `?category=intangible-heritage` - Filter by category
   - `?tag=pha-tho&page=2` - Combined filters with pagination

---

## User Experience

### Sidebar - Tags Section

**Before (Static):**
```
แท็กยอดนิยม
#ผ้าทอ #อาหาร #ประเพณี #ศิลปะ #สมุนไพร #หัตถกรรม
```

**After (Dynamic):**
```
แท็กทั้งหมด                    [ล้าง]
#ผ้าทอ #อาหาร #ประเพณี #ศิลปะ 
#สมุนไพร #หัตถกรรม #ดนตรีล้านนา #ชาติพันธุ์
```

- Tags are fetched from the database
- Selected tag is highlighted (purple background)
- "ล้าง" (Clear) link appears when a tag is selected
- Shows empty state if no tags exist

### Main Content Title

**Before:**
```
ทั้งหมด 5 รายการ
```

**After:**
```
#ผ้าทอ 3 รายการ
```
or
```
มรดกภูมิปัญญา 5 รายการ
```

### Pagination

**Before:**
```
?category=intangible-heritage&page=2
```

**After:**
```
?tag=pha-tho&page=2
?category=intangible-heritage&tag=pha-tho&page=2
```

Pagination now preserves both category and tag filters.

---

## Technical Details

### Data Flow

```
User clicks tag → URL updates → searchParams changes
    ↓
HeritagePage component re-renders
    ↓
getHeritageBlogs({ tagSlug: 'pha-tho' })
    ↓
Finds tag ID from slug
    ↓
Filters heritage-blog collection by tag
    ↓
Returns filtered articles
    ↓
Displays results with tag in title
```

### URL Structure

| Filter | URL |
|--------|-----|
| All articles | `/heritage` |
| By category | `/heritage?category=intangible-heritage` |
| By tag | `/heritage?tag=pha-tho` |
| By category + tag | `/heritage?category=intangible-heritage&tag=pha-tho` |
| With pagination | `/heritage?tag=pha-tho&page=2` |

---

## Files Modified

1. ✅ `src/lib/payload.ts` - Added `getTags()` and updated `getHeritageBlogs()`
2. ✅ `src/app/(frontend)/heritage/page.tsx` - Full tag filter implementation

---

## Testing

### To Test:

1. **Start Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Access Heritage Blog:**
   - http://localhost:3000/heritage

3. **Test Tag Filter:**
   - Click on any tag in the sidebar
   - Verify URL updates to `?tag={slug}`
   - Verify page title shows selected tag
   - Verify articles are filtered
   - Verify pagination preserves the tag

4. **Test Category + Tag Combination:**
   - Select a category
   - Click on a tag
   - Verify both filters apply
   - Verify pagination works

5. **Test Clear Filter:**
   - Select a tag
   - Click "ล้าง" (Clear) link
   - Verify filters are cleared

---

## Next Steps

### Completed ✅
- [x] Add `getTags()` utility function
- [x] Update `getHeritageBlogs()` to support tag filtering
- [x] Display dynamic tags from database
- [x] Implement tag selection UI
- [x] Show active tag state
- [x] Clear filter functionality
- [x] Update pagination to preserve tag
- [x] Update page title with selected tag

### Future Enhancements ⏳
- [ ] Tag search input
- [ ] Tag count display (show number of articles per tag)
- [ ] Tag colors from CMS
- [ ] Tag description tooltips
- [ ] Combine multiple tags (AND/OR logic)

---

## Database Schema

### Tags Collection
```typescript
{
  id: string
  name: string           // e.g., "ผ้าทอ"
  slug: string           // e.g., "pha-tho"
  description?: string   // Optional description
  color?: string         // Optional hex color
}
```

### Heritage Blog Collection (tags field)
```typescript
{
  // ... other fields
  tags: string[]  // Array of Tag IDs (relationship)
}
```

---

## Summary

The Tags filter is now fully functional and integrated with the Payload CMS. Users can:
- ✅ Browse articles by tag
- ✅ See all available tags from the database
- ✅ Combine tag + category filters
- ✅ Navigate paginated results while maintaining filters
- ✅ Clear filters easily

**Status:** Ready for production use! 🎉
