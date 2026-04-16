# Decision Log

## Purpose
ไฟล์นี้ใช้เก็บบันทึกการตัดสินใจเชิงระบบที่ควรอ้างอิงซ้ำได้ เช่น โครงสร้างเอกสาร วิธีจัด context การเลือก stack หรือแนวทาง implementation ที่มีผลต่อหลายงาน

## How to Use
- เพิ่ม entry ใหม่เมื่อมีการตัดสินใจที่ควรจำระยะยาว
- ลิงก์กลับไปยัง meeting note หรือ feature spec ที่เกี่ยวข้อง
- เขียนให้สั้น ชัด และระบุผลกระทบ

## Index
- [Decision: Canonical Documentation Structure](#decision-canonical-documentation-structure)
- [Decision: Token-Efficient Context Routing](#decision-token-efficient-context-routing)
- [Decision: Skill-to-Obsidian Canonical Routing Standard](#decision-skill-to-obsidian-canonical-routing-standard)
- [Decision: Route Group Separation for Frontend and Payload Admin](#decision-route-group-separation-for-frontend-and-payload-admin)
- [Decision: Cached Payload Access Layer in `src/lib/payload.ts`](#decision-cached-payload-access-layer-in-srclibpayloadts)
- [Decision: Payload as the Canonical Content and Admin Backend](#decision-payload-as-the-canonical-content-and-admin-backend)
- [Decision: Modern Lanna Theme via Tailwind v4 Tokens and DaisyUI Light Theme](#decision-modern-lanna-theme-via-tailwind-v4-tokens-and-daisyui-light-theme)
- [Decision: Heritage Search Uses URL-Driven Filters with Server Rendering and Client Search Controls](#decision-heritage-search-uses-url-driven-filters-with-server-rendering-and-client-search-controls)
- [Decision: District Detail Pages Compose View Models from Payload Data with UI-Safe Fallbacks](#decision-district-detail-pages-compose-view-models-from-payload-data-with-ui-safe-fallbacks)
- [Decision: Media Is Managed Centrally Through Payload Uploads with Derived Image Sizes](#decision-media-is-managed-centrally-through-payload-uploads-with-derived-image-sizes)
- [Decision: News Page Uses Client-Side Navigation and Fixed Content Types](#decision-news-page-uses-client-side-navigation-and-fixed-content-types)
- [Decision: Activity Calendar Client-Server Separation](#decision-activity-calendar-client-server-separation)
- [Decision: About Page Configuration via Payload Global and UI Fallbacks](#decision-about-page-configuration-via-payload-global-and-ui-fallbacks)

---

## Decision: Canonical Documentation Structure
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../README.md`
  - `../01_Project_Core/Documentation_Workflow.md`

### Context
- เอกสารในโปรเจกต์กระจายหลายตำแหน่งและมีข้อมูลซ้ำกัน
- การอ้างอิงบริบทสำหรับ Windsurf/Obsidian ยังไม่เป็นทางเดียวกัน

### Decision
- ใช้ `docs/README.md` เป็นสารบัญกลาง
- ใช้ `docs/01_Project_Core/` สำหรับเอกสารระดับระบบและ workflow หลัก
- ใช้ `docs/02_Features/` สำหรับ feature specs แบบ canonical
- ใช้ `docs/03_Database/Schema.md` และ `docs/04_UI_UX/Design_Tokens.md` เป็น source of truth ด้าน schema และ UI
- ใช้ legacy docs เป็น historical reference เท่านั้น

### Consequences
- Positive:
  - ลดความซ้ำซ้อนของบริบท
  - ทำให้ AI และคนในทีมอ้างอิงเอกสารได้ตรงทางเดียวกัน
- Trade-offs:
  - ต้องมีวินัยในการอัปเดต canonical docs ทุกครั้งที่มีการเปลี่ยนแปลงสำคัญ

### Follow-up
- ย้ายความรู้จาก legacy docs มา canonical docs ตามความจำเป็น

---

## Decision: Token-Efficient Context Routing
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../../.windsurfrules`
  - `../01_Project_Core/Documentation_Workflow.md`

### Context
- การโหลด context กว้างเกินไปทำให้เปลือง token และทำให้ agent หาแหล่งข้อมูลช้าลง

### Decision
- ใช้ `.windsurfrules` และ `STATUS.md` เป็นจุดเริ่มต้นเสมอ
- เพิ่มเอกสารตามชนิดงานเท่าที่จำเป็นเท่านั้น
- ให้ไฟล์ canonical เป็น priority สูงกว่า legacy docs
- จำกัดการอ้างอิง context ให้ตรงงาน เช่น feature/schema/UI/workflow เท่านั้น

### Consequences
- Positive:
  - ประหยัด token
  - ทำให้ prompt และการอ้างอิง context แม่นยำขึ้น
- Trade-offs:
  - ต้องรักษาเอกสาร canonical ให้ทันสมัยอยู่เสมอ

### Follow-up
- สร้าง meeting notes และ decision log สำหรับการเปลี่ยนแปลงเชิงระบบในอนาคต

---

## Decision: Skill-to-Obsidian Canonical Routing Standard
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../01_Project_Core/Skill_Routing_with_Obsidian.md`
  - `../01_Project_Core/Documentation_Workflow.md`
  - `../../.agent/skills/doc.md`

### Context
- โปรเจกต์มี workspace skills ภายใต้ `.agent/skills/` แต่ยังไม่มีมาตรฐานบังคับให้ผูกการใช้งานกับเอกสาร canonical ของ Obsidian
- คำสั่งและการเลือก skill ที่ไม่เป็นมาตรฐานทำให้เกิดความเสี่ยงเรื่อง context ซ้ำ, command path ไม่ตรง, และการสรุปผลไม่ถูกบันทึกในเอกสารหลัก

### Decision
- กำหนดให้การเริ่มงานทุกงานต้องอ้าง `Documentation_Workflow.md` และเลือก skill จาก `../../.agent/skills/doc.md` ก่อน
- กำหนดให้ใช้ `Skill_Routing_with_Obsidian.md` เป็น source of truth สำหรับ skill-to-doc mapping และ command path standard
- บังคับใช้ command path แบบ workspace-relative สำหรับ scripts ใน skills (เช่น `.agent/skills/ui-ux-pro-max/scripts/search.py`)
- หลังใช้ skill ต้องบันทึกผลใน canonical docs ตามหมวดงาน และถ้าเป็นมาตรฐานใหม่ให้บันทึกใน Decision Log

### Consequences
- Positive:
  - การเลือกและใช้งาน skill มีเส้นทางเดียวกันทั้งทีม
  - ลดความคลาดเคลื่อนของ command path และลด context duplication
  - ทำให้การทำงานร่วมระหว่าง Obsidian docs และ skills ตรวจสอบย้อนหลังได้
- Trade-offs:
  - ทีมต้องรักษา `Skill_Routing_with_Obsidian.md` ให้ทันสมัยเมื่อมี skill ใหม่หรือเปลี่ยนโครงสร้าง
  - เพิ่มขั้นตอนเริ่มงานเล็กน้อยเพื่อ validate skill routing ก่อนลงมือ

### Follow-up
- ตรวจทาน `.agent/skills/*/SKILL.md` เป็นระยะเพื่อให้ command path สอดคล้องกับมาตรฐาน workspace
- เมื่อเพิ่ม skill ใหม่ ให้เพิ่ม mapping ใน `../01_Project_Core/Skill_Routing_with_Obsidian.md` พร้อมสรุปผลกระทบใน `STATUS.md`

---

## Decision: Route Group Separation for Frontend and Payload Admin
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../01_Project_Core/Site_Map_and_Workflow.md`
  - `../02_Features/District_Committee_Profiles.md`

### Context
- ระบบนี้มีทั้ง public website และ Payload admin อยู่ใน Next.js codebase เดียวกัน
- ต้องแยก concern ของ frontend กับ admin ให้ชัด เพื่อไม่ให้ layout, routing, และ dependencies ปะปนกัน

### Decision
- ใช้ Next.js App Router route groups แยกระหว่าง `(frontend)` และ `(payload)`
- ให้ public pages อยู่ใต้ `(frontend)`
- ให้ Payload admin rendering อยู่ใต้ `(payload)` และใช้ Payload Next integration โดยตรง

### Consequences
- Positive:
  - แยกขอบเขต public UI กับ admin UI ชัดเจน
  - ลดความเสี่ยงที่ layout หรือ component logic จะชนกัน
  - ทำให้ reasoning เรื่อง routing และ ownership ชัดขึ้น
- Trade-offs:
  - ผู้พัฒนาต้องเข้าใจ route groups ของ App Router ให้ตรงกันทั้งทีม

### Follow-up
- รักษา convention นี้สำหรับ route ใหม่ทั้งหมด

---

## Decision: Cached Payload Access Layer in `src/lib/payload.ts`
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../03_Database/Schema.md`
  - `../01_Project_Core/Project_Roadmap.md`

### Context
- หน้า public หลายหน้าต้องอ่านข้อมูลจาก Payload CMS ซ้ำกัน เช่น districts, activities, heritage, news, about page
- หากแต่ละหน้าคุยกับ Payload ตรง ๆ จะทำให้ query logic กระจายและ maintain ยาก

### Decision
- รวม data access logic ไว้ที่ `src/lib/payload.ts`
- ใช้ `cache()` สำหรับ `getPayloadClient()` และ data-fetching helpers หลัก
- ให้หน้าใน App Router เรียก helper functions เช่น `getActivities`, `getDistricts`, `getHeritageBlogs`, `getNews` แทนการ query Payload ตรง ๆ ในหลายจุด

### Consequences
- Positive:
  - รวม query logic ไว้จุดเดียว
  - ทำให้หน้า frontend อ่านง่ายขึ้น
  - เอื้อต่อการปรับ query behavior ในอนาคตจากที่เดียว
- Trade-offs:
  - `src/lib/payload.ts` กลายเป็นจุดรวม logic ขนาดใหญ่และต้องถูกจัดระเบียบต่อเมื่อระบบโตขึ้น

### Follow-up
- หาก query logic โตขึ้นมาก ควรแยก helper ตาม domain เช่น heritage, districts, activities

---

## Decision: Payload as the Canonical Content and Admin Backend
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../03_Database/Schema.md`
  - `../01_Project_Core/Site_Map_and_Workflow.md`

### Context
- โปรเจกต์ต้องมีทั้ง content modeling, admin editing, media management, และ global page content
- เนื้อหาหลายหน้า เช่น About, Heritage, News, Activities, District Network ต้องใช้ backend ที่จัดการ schema และ admin UI ได้ดี

### Decision
- ใช้ Payload CMS เป็น canonical backend สำหรับ content และ admin operations
- ใช้ MongoDB ผ่าน `mongooseAdapter`
- ใช้ Lexical editor สำหรับ rich text
- ใช้ globals เช่น `about-page` สำหรับ single-instance content
- ใช้ collections แยกตาม domain ชัดเจน เช่น districts, district-members, activities, heritage-blog, news, media

### Consequences
- Positive:
  - schema และ admin model อยู่ใกล้กัน
  - ลดการสร้าง backend/admin tooling เอง
  - content team สามารถทำงานผ่าน `/admin` ได้โดยตรง
- Trade-offs:
  - ฝั่ง frontend และ content model ผูกกับ Payload conventions มากขึ้น
  - การเปลี่ยน CMS ในอนาคตจะมีต้นทุน migration สูง

### Follow-up
- ควรอัปเดต `Schema.md` ทุกครั้งที่ collection หรือ global เปลี่ยน

---

## Decision: Modern Lanna Theme via Tailwind v4 Tokens and DaisyUI Light Theme
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../04_UI_UX/Design_Tokens.md`

### Context
- โปรเจกต์ต้องการ visual identity แบบ Modern Lanna ที่สะท้อนเชียงรายและบริบทวัฒนธรรมท้องถิ่น
- ต้องมีระบบ theme ที่ใช้ซ้ำได้ทั้ง utility classes และ reusable custom classes

### Decision
- ใช้ Tailwind CSS v4 เป็น styling engine หลัก
- ใช้ daisyUI ในโหมด `light` เป็น component/theme layer
- กำหนด brand tokens หลักใน `src/app/globals.css` ผ่าน `@theme` และ `:root`
- ใช้ token names เช่น `primary`, `secondary`, `accent`, `base-*` ร่วมกับ custom classes เช่น `.section-header`, `.btn-lanna`, `.card-modern`, `.nav-lanna`

### Consequences
- Positive:
  - สร้าง visual consistency ได้ดี
  - token-driven styling ช่วยให้ refactor theme ง่ายขึ้น
  - รองรับทั้ง Tailwind utilities และ reusable semantic classes
- Trade-offs:
  - ต้องระวังไม่ให้มีสี hard-coded หรือ style patterns กระจายออกนอก token system มากเกินไป

### Follow-up
- ถ้าเพิ่ม reusable UI pattern ใหม่ในหลายจุด ควร promote เข้า `globals.css` และอัปเดต `Design_Tokens.md`

---

## Decision: Heritage Search Uses URL-Driven Filters with Server Rendering and Client Search Controls
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../02_Features/Heritage_Search.md`
  - `../02_Features/Heritage_Tag_Filter.md`

### Context
- หน้า `/heritage` ต้องรองรับ category filter, tag filter, search query, และ pagination พร้อมกัน
- ต้องการให้ URL shareable, state ชัดเจน, และผลลัพธ์หลักยังถูกประกอบที่ฝั่ง server

### Decision
- ใช้ `searchParams` เป็น source of truth ของ filter state
- ใช้ server component สำหรับ render ข้อมูลหลักของหน้า heritage
- ใช้ client components เช่น `SearchBox` และ `ActiveFilters` สำหรับ interaction ที่อัปเดต URL
- ให้ pagination preserve filter state ผ่าน query string เดิม
- ใช้ debounced search ที่ฝั่ง client และ trigger re-render ผ่าน URL navigation

### Consequences
- Positive:
  - ลิงก์ผลการค้นหาแชร์ได้
  - state ของหน้าอ่านและ debug ได้จาก URL
  - แยก responsibility ระหว่าง interaction กับ content rendering ชัดเจน
- Trade-offs:
  - ต้องรักษา query string logic ให้สอดคล้องกันทุกจุด เช่น clear filter, paging, และ filter transitions

### Follow-up
- ถ้าเพิ่ม author/district/date filter ควรเดินตาม URL-driven pattern เดิม

---

## Decision: District Detail Pages Compose View Models from Payload Data with UI-Safe Fallbacks
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../02_Features/District_Committee_Profiles.md`
  - `../03_Database/Schema.md`

### Context
- ข้อมูล district และ district members อาจยังไม่ครบทุก field ระหว่างการพัฒนาและนำเข้าข้อมูลจริง
- หน้า district detail ต้อง render ได้แม้ field บางส่วนหายหรือยังไม่ถูก populate ครบ

### Decision
- ให้หน้า district detail map ข้อมูลจาก Payload ไปเป็น UI-safe view model ก่อน render
- ใช้ fallback values สำหรับ description, address, phone, email และตำแหน่งกรรมการเมื่อข้อมูลไม่ครบ
- sort committee members หลัง map ข้อมูล โดยใช้ `positionOrder` เป็นหลัก
- ให้ empty states เป็นส่วนหนึ่งของหน้ามาตรฐาน ไม่ถือเป็น exceptional path

### Consequences
- Positive:
  - หน้า render ได้เสถียรกว่าในช่วงข้อมูลยังไม่สมบูรณ์
  - UI ไม่พังเพราะ field หายบางค่า
  - แยก data normalization ออกจาก JSX ได้ชัดเจนขึ้น
- Trade-offs:
  - fallback content อาจปิดบังปัญหาคุณภาพข้อมูลจริง ถ้าไม่มีการตรวจข้อมูลต้นทางควบคู่กัน

### Follow-up
- เมื่อเริ่ม import ข้อมูลจริง ควรทบทวน fallback ที่ไม่สอดคล้องกับ schema ปัจจุบันและปรับให้ตรง source model

---

## Decision: Media Is Managed Centrally Through Payload Uploads with Derived Image Sizes
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../03_Database/Schema.md`
  - `../04_UI_UX/Design_Tokens.md`

### Context
- หลาย collection ใช้สื่อร่วมกัน เช่น districts, activities, heritage, news, committee profiles
- ระบบต้องมีจุดกลางสำหรับไฟล์, alt text, caption, และขนาดรูปที่ใช้ซ้ำได้หลายบริบท

### Decision
- ใช้ `media` collection ของ Payload เป็นศูนย์กลางสำหรับ asset uploads
- กำหนด derived image sizes เป็น `thumbnail`, `card`, และ `cover`
- ให้ collection อื่นอ้าง media ผ่าน relationship แทนการเก็บไฟล์แยกตาม domain
- อนุญาตทั้งรูปภาพ, PDF, และ video บางประเภทผ่าน media library เดียวกัน

### Consequences
- Positive:
  - asset management เป็นระบบเดียวกันทั้งโปรเจกต์
  - รองรับการใช้ซ้ำของภาพและ metadata เช่น alt/caption
  - เปิดทางให้พัฒนา image usage policy ต่อได้ง่าย
- Trade-offs:
  - ฝั่ง frontend ยังต้องจัดการการใช้ URL และ image rendering strategy ให้เหมาะกับแต่ละหน้า

### Follow-up
- เมื่อเริ่มทำ image optimization จริง ควรกำหนด policy ให้ชัดว่าเมื่อไรใช้ raw `img` และเมื่อไร migrate ไป `next/image`

---

## Decision: News Page Uses Client-Side Navigation and Fixed Content Types
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../03_Database/Schema.md`

### Context
- หน้าข่าวสาร (`/news`) มี 3 ประเภทตายตัว (general, video, document)
- UI ต้องแสดง icon และสีเฉพาะตามประเภทของข่าวเพื่อการแยกแยะที่ชัดเจน

### Decision
- เก็บประเภทข่าวเป็น `select` field ใน Payload CMS แทนที่จะสร้าง Collection แยกสำหรับ categories
- ใช้ URL parameters (`?type=...`) ในการ filter ข้อมูล
- นิยาม `typeConfig` (ไอคอน, สี) ไว้ที่ frontend (`src/app/(frontend)/news/page.tsx`) แทนที่จะเก็บใน CMS

### Consequences
- Positive:
  - ไม่ต้อง query category collection แยก ทำให้หน้าโหลดเร็วขึ้น
  - UI map สีและไอคอนได้ตรงตัว เพราะรู้ type แน่นอนล่วงหน้า
- Trade-offs:
  - หากต้องการเพิ่มประเภทข่าวใหม่ในอนาคต ต้องแก้โค้ดทั้งฝั่ง CMS (เพิ่ม select option) และ Frontend (เพิ่ม `typeConfig`)

### Follow-up
- ถ้าข่าวมีประเภทงอกขึ้นเรื่อยๆ อาจต้องพิจารณาเปลี่ยนไปใช้ Collection แยกแทน

---

## Decision: Activity Calendar Client-Server Separation
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../03_Database/Schema.md`

### Context
- หน้าปฏิทินกิจกรรม (`/activities/calendar`) ต้องการแสดงกิจกรรมรายเดือนและเปลี่ยนเดือนไปมาได้
- กิจกรรมทั้งหมดดึงจาก Payload แต่การแสดงผลบนปฏิทินต้องการ interaction สูง

### Decision
- ให้ Server Component (`page.tsx`) รับผิดชอบดึงข้อมูลกิจกรรมและกำหนดค่าเริ่มต้น (year, month) ผ่าน `searchParams`
- ส่งต่อข้อมูลให้ Client Component (`CalendarView.tsx`) จัดการเรื่อง state การเปลี่ยนเดือน การจัดเรียงกริดปฏิทิน และ UI interaction
- กรองกิจกรรมของเดือนปัจจุบันตั้งแต่ฝั่ง Server เพื่อลด payload ให้เล็กที่สุด

### Consequences
- Positive:
  - ลดภาระ Server ในการ render UI ปฏิทินที่ซับซ้อน
  - การกดเปลี่ยนเดือนตอบสนองได้ทันที (ถ้าระบุ client state) และยังแชร์ลิงก์แบบระบุเดือนได้ผ่าน `searchParams`
- Trade-offs:
  - ต้อง pass ข้อมูลข้าม boundary ระหว่าง Server กับ Client ทำให้ต้องคำนึงถึงขนาดของ data payload เสมอ

### Follow-up
- ถ้ากิจกรรมเยอะมากจนการดึงมาทั้งก้อน (limit 100) ช้าไป ต้องปรับให้ query เฉพาะกิจกรรมของเดือนนั้นๆ ตั้งแต่ใน `getActivities` แทนการ filter ทีหลัง

---

## Decision: About Page Configuration via Payload Global and UI Fallbacks
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../03_Database/Schema.md`

### Context
- ข้อมูลองค์กร (วิสัยทัศน์, พันธกิจ, ประวัติ) เป็นข้อมูลที่แทบไม่ค่อยเปลี่ยน แต่ควรแก้ไขได้จาก CMS โดยไม่ต้องแตะโค้ด

### Decision
- ใช้ Payload `Global` collection (`AboutPage`) แทน `Collection` ปกติ เพราะมี record เดียวแน่นอน
- เก็บ History ทั้งแบบ rich text (`history`) และ plain text (`historyPlain`) ไว้รองรับ design ที่ต้องการแค่ข้อความดิบ
- ฝั่ง Frontend นิยาม `defaults` object เพื่อให้ UI ไม่พังและมีข้อความเริ่มต้นเสมอในกรณีที่ฝั่ง CMS ยังไม่มีการตั้งค่า

### Consequences
- Positive:
  - แก้ไขข้อมูลเดียวได้ง่ายและครอบคลุม
  - UI มีความเสถียร ไม่ขึ้นกับความพร้อมของ CMS เสมอไป
- Trade-offs:
  - ต้องระวังอย่าเผลอลบ fallback ทิ้ง และอาจเกิดความสับสนถ้าแก้โค้ด fallback แต่ใน CMS เป็นอีกค่า

### Follow-up
- สื่อสารให้ผู้ดูแลระบบทราบว่าต้องตั้งค่าหน้า About ก่อนนำระบบขึ้น production เพื่อไม่ให้แสดงค่า fallback

---

## Entry Template
คัดลอกจาก `../99_Templates/Decision_Log_Entry_Template.md` แล้ววางต่อท้ายไฟล์นี้เมื่อมี decision ใหม่
