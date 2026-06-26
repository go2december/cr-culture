# Plan - Update Project Status and Documentation

This plan outlines the steps to update `STATUS.md` and `docs/01_Project_Core/Site_Map_and_Workflow.md` to reflect the implementation of the Awards & Honors modules, typography refresh, global page hero management, and footer text alignment.

## User Review Required

> [!NOTE]
> This is a documentation-only update. No application source code changes will be made during this task.

## Open Questions

None. The recently completed features are already fully built, tested, and pushed to the remote repository.

## Proposed Changes

We will modify the following documentation files to update the project status:

### Documentation

#### [MODIFY] [STATUS.md](file:///e:/web2026/CR-Culture/STATUS.md)
- Update the **Current Focus**, **Current Snapshot**, and **Next Steps** sections to reflect that the Awards & Honors features and Footer style tweaks are completed.
- Move completed items from current focus into the recent work history.

#### [MODIFY] [Site_Map_and_Workflow.md](file:///e:/web2026/CR-Culture/docs/01_Project_Core/Site_Map_and_Workflow.md)
- Update **Current Snapshot** and **Done Recently** sections.
- Update **Admin Scope** with the new Payload collections: `award-years`, `award-categories`, `khon-dee-awards`, `wisdom-awards`, `wisdom-categories`, `youth-award-histories`, `awardees`, `institutions`, and `award-galleries`.
- Add public route paths to the **Public Site Map** under the **Honors & Awards** category.

---

## Task Breakdown

### Task 1: Update STATUS.md
- **Agent**: `documentation-writer`
- **Priority**: P0
- **Dependencies**: None
- **INPUT**: Current `STATUS.md`
- **OUTPUT**: Updated `STATUS.md` with:
  - Footer formatting changes documented under "Recent Work" or merged into current snapshot.
  - Verification of dev server and build statuses.
- **VERIFY**: Open `STATUS.md` and read through the updated sections.

### Task 2: Update Site_Map_and_Workflow.md
- **Agent**: `documentation-writer`
- **Priority**: P1
- **Dependencies**: Task 1
- **INPUT**: `docs/01_Project_Core/Site_Map_and_Workflow.md`
- **OUTPUT**: Updated `Site_Map_and_Workflow.md` reflecting completed Awards features and new admin scopes.
- **VERIFY**: Read the file to ensure the list of collections, public routes, and "Done Recently" tasks match reality.

---

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure no linting warnings/errors are introduced in the workspace.

### Manual Verification
- Check all updated docs using Obsidian preview or code viewer.
- Validate that all markdown links in the files are valid and point to existing files.
