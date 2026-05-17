# GitHub backend setup (admin + content)

## 1) GitHub branch for content
- Create branch `content` in this repository (or set another branch in env `GITHUB_CONTENT_BRANCH`).
- API stores JSON files in that branch under `content/*.json`.

## 2) GitHub token
- Create classic PAT or fine-grained token with repo contents write permissions.
- Set env vars on hosting (and locally if needed):
  - `GITHUB_OWNER`
  - `GITHUB_REPO`
  - `GITHUB_TOKEN`
  - `GITHUB_CONTENT_BRANCH=content`

## 3) Admin auth
- Set:
  - `ADMIN_LOGIN`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET` (random long string)
- Admin uses cookie session (`httpOnly`), no Supabase auth required.

## 4) Leads email duplication
- Optional vars for `/api/lead`:
  - `RESEND_API_KEY`
  - `RESEND_FROM`
  - `LEADS_TO_EMAIL`

## Notes
- Public pages read data via `/api/content` and only show published rows.
- Admin panel writes through `/api/admin/*` and commits changes into GitHub content branch.
- Supabase migrations can stay in repo as legacy, but are not required for this mode.

