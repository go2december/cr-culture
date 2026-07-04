# 🗄️ Database Schema & Relationships
 
 ## Overview
 The project uses Payload CMS 3.0.0 with MongoDB via `@payloadcms/db-mongodb`.
 
 ## Runtime Configuration
 - Config source: `src/payload.config.ts`
 - Database adapter: `mongooseAdapter`
 - Database URI fallback: `mongodb://localhost:27017/crculture`
 - Rich text editor: `lexicalEditor()`
 - Upload limit: `10000000` bytes (10MB)
 - Type generation: `src/payload-types.ts`
 - Admin user collection: `users`
- Globals registered:
  - `about-page`
  - `page-heroes`
 
 ## Registered Collections
The project currently registers 19 collections in Payload config:
 
 1. `users`
 2. `board-positions`
 3. `district-board-positions`
 4. `provincial-board`
 5. `districts`
 6. `district-members`
 7. `activities`
 8. `heritage-blog`
 9. `tags`
 10. `award-years`
 11. `award-categories`
 12. `khon-dee-awards`
13. `news`
14. `media`
 15. `institutions`
 16. `awardees`
 17. `youth-award-histories`
 18. `wisdom-categories`
 19. `wisdom-awards`
 
 ## Data Models & Relationships
 
 ### 1. `users`
 Purpose: Admin authentication and role-based back-office access.
 
 Fields:
 - `name`: `text`
 - `role`: `select`, required, default `user`
   - `admin`
   - `editor`
   - `user`
 
 Notes:
 - `auth: true`
 - Used as the Payload admin user collection.
 - `admin.useAsTitle = email`
 
 ### 2. `board-positions`
 Purpose: Master data for provincial committee positions.
 
 Fields:
 - `title`: `text`, required, unique
 - `level`: `number`, default `99`
 
 Notes:
 - `level` is used for importance/sorting, where `1` is highest.
 
 ### 3. `district-board-positions`
 Purpose: Master data for district committee positions.
 
 Fields:
 - `title`: `text`, required, unique
 - `level`: `number`, default `99`
 
 Notes:
 - Same pattern as `board-positions`, scoped to district-level governance.
 
 ### 4. `provincial-board`
 Purpose: Provincial committee members.
 
 Fields:
 - `name`: `text`, required
 - `position`: `relationship -> board-positions`, required
 - `positionOrder`: `number`, default `99`
 - `image`: `upload -> media`
 - `bio`: `textarea`
 - `phone`: `text`
 - `email`: `email`
 - `isActive`: `checkbox`, default `true`
 
 Relationships:
 - Many provincial board records can point to one `board-positions` record.
 - Optional media attachment via `image`.
 
 ### 5. `districts`
 Purpose: Central hub for the 18 district networks and location metadata.
 
 Fields:
 - `name`: `text`, required
 - `slug`: `text`, required, unique
 - `code`: `text`
 - `image`: `upload -> media`
 - `coverImage`: `upload -> media`
 - `description`: `textarea`
 - `latitude`: `number`
 - `longitude`: `number`
 - `contact.address`: `textarea`
 - `contact.phone`: `text`
 - `contact.email`: `email`
 - `contact.facebook`: `text`
 - `order`: `number`, default `99`
 - `isActive`: `checkbox`, default `true`
 
 Notes:
 - `slug` is intended for public URL usage.
 - `contact` is implemented as a Payload `group` field.
 - Latitude/longitude are stored as separate numeric fields inside a `row` layout in admin.
 
 ### 6. `district-members`
 Purpose: Committee members associated with specific districts.
 
 Fields:
 - `name`: `text`, required
 - `position`: `relationship -> district-board-positions`, required
 - `positionOrder`: `number`, default `99`
 - `district`: `relationship -> districts`, required
 - `image`: `upload -> media`
 - `phone`: `text`
 - `isActive`: `checkbox`, default `true`
 
 Relationships:
 - Many members belong to one district.
 - Many members can share one district board position.
 
 ### 7. `activities`
 Purpose: Public activity/event content for both province and district levels.
 
 Fields:
 - `title`: `text`, required
 - `slug`: `text`, required, unique
 - `date`: `date`, required
 - `endDate`: `date`
 - `level`: `select`, required, default `province`
   - `province`
   - `district`
 - `district`: `relationship -> districts`
 - `coverImage`: `upload -> media`
 - `summary`: `textarea`, max length `300`
 - `content`: `richText`
 - `gallery`: `array`
   - `image`: `upload -> media`, required
   - `caption`: `text`
 - `location`: `text`
 - `isPublished`: `checkbox`, default `true`
 - `isFeatured`: `checkbox`, default `false`
 
 Conditional behavior:
 - `district` is shown in admin only when `level === 'district'`.
 
 ### 8. `heritage-blog`
 Purpose: Cultural heritage knowledge base and long-form content.
 
 Fields:
 - `title`: `text`, required
 - `slug`: `text`, required, unique
 - `category`: `select`, required
   - `intangible-heritage`
   - `learning-resources`
   - `local-wisdom`
 - `coverImage`: `upload -> media`
 - `excerpt`: `textarea`, max length `500`
 - `content`: `richText`, required
 - `gallery`: `array`
   - `image`: `upload -> media`, required
   - `caption`: `text`
 - `tags`: `relationship -> tags`, hasMany
 - `relatedDistrict`: `relationship -> districts`
 - `author`: `text`
 - `source`: `text`
 - `isPublished`: `checkbox`, default `true`
 - `isFeatured`: `checkbox`, default `false`
 - `viewCount`: `number`, default `0`, read-only in admin
 
 Relationships:
 - Many-to-many style tagging via `tags` with `hasMany: true`.
 - Optional district association via `relatedDistrict`.
 
 ### 9. `tags`
 Purpose: Reusable classification metadata for heritage content.
 
 Fields:
 - `name`: `text`, required
 - `slug`: `text`, required, unique
 - `description`: `textarea`
 - `color`: `text`
 
 Notes:
 - `color` stores a hex string such as `#6B21A8`.
 
 ### 10. `news`
 Purpose: News, PR, documents, and embedded video content.
 
 Fields:
 - `title`: `text`, required
 - `slug`: `text`, required, unique
 - `type`: `select`, required, default `general`
   - `general`
   - `video`
   - `document`
 - `publishedAt`: `date`, required
 - `coverImage`: `upload -> media`
 - `excerpt`: `textarea`, max length `300`
 - `content`: `richText`
 - `videoUrl`: `text`
 - `document`: `upload -> media`
 - `isPublished`: `checkbox`, default `true`
 - `isPinned`: `checkbox`, default `false`
 
 Conditional behavior:
 - `content` is hidden in admin when `type === 'document'`.
 - `videoUrl` is shown only when `type === 'video'`.
 - `document` is shown only when `type === 'document'`.
 
 ### 11. `media`
 Purpose: Shared upload library for images, PDFs, and some video assets.
 
 Upload settings:
 - `staticDir: 'media'`
 - `adminThumbnail: 'thumbnail'`
 - MIME types:
   - `image/*`
   - `application/pdf`
   - `video/mp4`
   - `video/webm`
 
 Image sizes:
 - `thumbnail`: 400x300
 - `card`: 768x432
 - `cover`: 1920x1080
 
 Fields:
 - `alt`: `text`
 - `caption`: `text`
 
 ## Globals
 
### `about-page`
Purpose: Single-source content for the About page.
 
 Fields:
 - `vision`: `textarea`, required
 - `missions`: `array`, min `1`, max `10`
   - `text`: `text`, required
 - `history`: `richText`
 - `historyPlain`: `textarea`
 
Notes:
- Contains default content for vision, missions, and history.
- `history` and `historyPlain` allow either formatted or plain content strategies.

### `page-heroes`
Purpose: Centralized hero content for the main public pages.

Fields:
- `home.eyebrow`, `home.title`, `home.subtitle`, `home.heroImage -> media`
- `activities.eyebrow`, `activities.title`, `activities.subtitle`, `activities.heroImage -> media`
- `activitiesCalendar.eyebrow`, `activitiesCalendar.title`, `activitiesCalendar.subtitle`, `activitiesCalendar.heroImage -> media`
- `about.eyebrow`, `about.title`, `about.subtitle`, `about.heroImage -> media`
- `aboutBoard.eyebrow`, `aboutBoard.title`, `aboutBoard.subtitle`, `aboutBoard.heroImage -> media`
- `news.eyebrow`, `news.title`, `news.subtitle`, `news.heroImage -> media`
- `heritage.eyebrow`, `heritage.title`, `heritage.subtitle`, `heritage.heroImage -> media`
- `khonDee.eyebrow`, `khonDee.title`, `khonDee.subtitle`, `khonDee.heroImage -> media`
- `districts.eyebrow`, `districts.title`, `districts.subtitle`, `districts.heroImage -> media`
- `contact.eyebrow`, `contact.title`, `contact.subtitle`, `contact.heroImage -> media`

Notes:
- Used by the public page list views for consistent heading management from the CMS.
- Replacing hero images triggers cleanup of orphaned uploads in the `media` collection.
 
 ## Relationship Map
 - `provincial-board.position` -> `board-positions`
 - `provincial-board.image` -> `media`
 - `district-members.position` -> `district-board-positions`
 - `district-members.district` -> `districts`
 - `district-members.image` -> `media`
 - `districts.image` -> `media`
 - `districts.coverImage` -> `media`
 - `activities.district` -> `districts`
 - `activities.coverImage` -> `media`
 - `activities.gallery[].image` -> `media`
 - `heritage-blog.coverImage` -> `media`
 - `heritage-blog.gallery[].image` -> `media`
- `heritage-blog.tags` -> `tags`
- `heritage-blog.relatedDistrict` -> `districts`
- `khon-dee-awards.year` -> `award-years`
- `khon-dee-awards.category` -> `award-categories`
- `khon-dee-awards.profileImage` -> `media`
- `news.coverImage` -> `media`
- `news.document` -> `media`
 
 ## Access, Hooks, and Admin Logic
 - No custom collection access control rules are currently defined in the collection configs.
 - No custom hooks are currently defined in the collection configs inspected.
 - Most business logic is currently expressed through:
   - required fields
   - unique constraints
   - `defaultValue`
   - conditional admin field visibility
   - read-only admin fields such as `heritage-blog.viewCount`
 
 ## Implementation Notes
 - Several collections rely on manual slug entry rather than automatic slug generation.
 - Publish state is generally modeled with boolean flags like `isPublished` instead of Payload draft/version configuration.
 - Sorting intent is represented by numeric fields such as `level`, `positionOrder`, and `order`.
- `districts` is the central reference collection for district-scoped content.
- `media` is the shared asset backbone across content and personnel collections.
- `khon-dee-awards` is the public-facing honor roll directory for the `คนดีศรีเชียงราย` module.

## Awards Module

### `award-years`
Purpose: Annual cycle metadata for honor awards.

Fields:
- `buddhistYear`: `number`, required, unique
- `announcementDate`: `date`
- `ceremonyDate`: `date`
- `location`: `text`
- `presidentName`: `text`

### `award-categories`
Purpose: Award pillar and recipient subtype reference data.

Fields:
- `mainPillar`: `select`, required
  - `cultural-contributor`
  - `outstanding-cultural-achievement`
- `subType`: `text`, required

### `khon-dee-awards`
Purpose: Public directory of `คนดีศรีเชียงราย` recipients.

Fields:
- `prefix`: `text`
- `fullName`: `text`, required
- `profileImage`: `upload -> media`
- `currentPosition`: `text`
- `year`: `relationship -> award-years`, required
- `category`: `relationship -> award-categories`, required
- `contributionTitle`: `text`, required
- `contributionDetail`: `richText`
- `impactArea`: `text`
- `contactPhone`: `text`
- `contactAddress`: `textarea`
- `nominatorName`: `text`
- `isPublished`: `checkbox`, default `true`
 
 ## Notes
 - Keep this file aligned with `src/payload.config.ts` and collection files under `src/collections/`.
 - When adding fields or collections, update this file in the same task as the code change.
