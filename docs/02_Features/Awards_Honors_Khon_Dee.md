# Awards Honors: Khon Dee Sri Chiang Rai

## Purpose
- Add a new navbar section `รางวัลเกียรติยศ` with submenu `คนดีศรีเชียงราย`
- Store annual honor-roll data in Payload CMS
- Expose a public list page and a person-detail page in Next.js

## Front-end Routing
- List page: `/awards/khon-dee`
- Detail page: `/awards/khon-dee/[id]`

## Payload Schema Design

### 1. `AwardYears`
Used to store the event year, announcement date, ceremony details, and signatory for each cycle.

- `buddhistYear`: `number`, required, unique
- `announcementDate`: `date`
- `ceremonyDate`: `date`
- `location`: `text`
- `presidentName`: `text`

### 2. `AwardCategories`
Used to store the major award pillar and recipient subtype for filtering and grouping.

- `mainPillar`: `select`, required
  - `cultural-contributor` = `ด้านผู้ทำคุณประโยชน์ทางวัฒนธรรม`
  - `outstanding-cultural-achievement` = `ด้านผู้มีผลงานดีเด่นทางวัฒนธรรม`
- `subType`: `text`, required

### 3. `KhonDeeAwards`
Main collection for the award directory. Admin fields are grouped into tabs for easier entry.

#### Basic Profile
- `prefix`: `text`
- `fullName`: `text`, required
- `profileImage`: `upload -> media`
- `currentPosition`: `text`

#### Award & Contribution
- `year`: `relationship -> award-years`, required
- `category`: `relationship -> award-categories`, required
- `contributionTitle`: `text`, required
- `contributionDetail`: `richText`
- `impactArea`: `text`

#### Internal Data
- `contactPhone`: `text`
- `contactAddress`: `textarea`
- `nominatorName`: `text`

#### Publishing
- `isPublished`: `checkbox`

## Public UX Notes
- Navbar position: after `เกี่ยวกับเรา`
- List page layout: hero + filter form + responsive card grid
- Filters:
  - search by name / current position / contribution title
  - year filter from `AwardYears`
  - category filter from `AwardCategories`
- Detail page layout:
  - hero header
  - contribution title
  - rich contribution body
  - award metadata block
  - related awardees from the same year

## Reference Blueprint From Stakeholder Brief

### Collection Summary
```text
[ KhonDeeAwards ]
       |
       |---> [ AwardYears ]
       |
       |---> [ AwardCategories ]
```

### Field Intent Summary
- `AwardYears` stores annual ceremony context
- `AwardCategories` stores pillar + subtype
- `KhonDeeAwards` stores awardee profile and cultural contribution narrative

## Relational Schema Appendix
The attached planning note also proposed a more normalized relational model with 4 logical tables:

1. `Award_Years`
2. `Award_Categories`
3. `Awardees`
4. `Award_History`

For this repo, implementation stays aligned with Payload CMS and uses 3 collections instead:
- `award-years`
- `award-categories`
- `khon-dee-awards`

This keeps admin editing simpler while preserving the same user-facing information architecture.
