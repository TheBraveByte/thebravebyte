# Information architecture: yusuf.foldlabs.pro

## Summary

The site is Yusuf's personal engineering home. GitHub holds the code; FoldLabs
(foldlabs.pro) is where clients hire the studio; this site holds the narrative:
what I've built, how I think about it, and my history. Three sections, one
URL pattern per content type, and the engineering notes come from one source of
truth shared with the GitHub profile.

## Audience and what they came for

| Reader | Arrives from | Wants within 10 seconds |
|---|---|---|
| Hiring engineer or recruiter | LinkedIn, GitHub, a CV | Role, domain, strongest work, CV |
| Senior engineer | GitHub README, a shared note | How I reason about failures and trade-offs |
| Founder or client | foldlabs.pro, Contra | Proof of backend depth, then a way to FoldLabs |

Mental model: people look for **work**, **writing** and **about/CV**. Nobody
looks for "process" or "architecture notes" as a separate place; those belong
inside work and writing.

## Sitemap

Flat. Everything is one click from home.

```
/                     Home: intro, selected work, recent writing, contact
/work                 All projects, grouped: products I own · client and employer work
/writing              Engineering notes, plus articles listed from Hashnode
/writing/[slug]       One note (articles open on Hashnode)
/about                Short bio, timeline, CV download
```

Removed: `/process` (its useful content moves into `/work` entries and notes),
`/blog` and `/article/[slug]` (renamed, see redirects), `/cv` (merged into
`/about` with a PDF link).

Articles live on Hashnode (ayaacodes.hashnode.dev), the only article CMS. The site
reads the blog's RSS feed and links straight to each post; the old Go/Mongo CMS and
its admin were removed on 2026-10-03.

## URL rules

- One pattern per type: `/writing/[slug]`, lowercase, hyphenated, no dates.
- Note slugs match the filenames in the repo's `stories/` folder, so GitHub and
  the site point to the same piece by the same name.
- Redirects (301, in nuxt.config routeRules): `/blog` → `/writing`, `/process` → `/work`,
  `/cv` → `/about`; the two articles that lived here (`/article/` and `/writing/`
  slugs) → their Hashnode posts; any other `/article/*` → `/writing`.

## Navigation

- **Primary:** Work · Writing · About. Three items; the name links home.
- **Utility:** theme toggle. Search is dropped: with about ten pages, it adds
  chrome without helping anyone find anything.
- **Footer:** email, GitHub, LinkedIn, Hashnode, with brand icons. One line.
- **FoldLabs:** one quiet link under the home intro, "Building with FoldLabs".
- No breadcrumbs; the hierarchy is never more than two levels deep.

## Content types and metadata

| Type | Source | Fields |
|---|---|---|
| Project | `data/projects.ts` in the repo | name, year, one-line summary, what I did, stack, links (repo/demo), visibility (public / private / client), group |
| Engineering note | `stories/*.md` in the repo | title, context line, the seven-part body |
| Article | CMS (Mongo via the Go API) | existing fields |

Writing merges notes and CMS articles into one list sorted by date. No
categories or tags: with fewer than twenty pieces, they would be empty
scaffolding. Revisit at around twenty.

## Labels

| Use | Not |
|---|---|
| Work | Projects, Portfolio, Case studies |
| Writing | Blog, Articles, Insights, Resources |
| About | Story, Journey, CV (as a nav label) |
| Engineering notes | Developer stories (fine in prose, too long for a heading) |

## Relationship to other surfaces

- **GitHub profile:** same selected work, same notes. The README links here for
  the longer write-ups.
- **foldlabs.pro:** linked from the intro and the footer as "where I take on
  client work". The site does not sell services.
- **Hashnode:** not linked until it is confirmed reachable; its posts can be
  re-published under `/writing`.

## Content rules

Every fact and figure must exist in the engineering-contributions claim store.
Not supported, so removed: "2,100+ concurrent users", "ten-feature model",
"nightly reconciliation against Stripe". Status lines follow LinkedIn: no "Open
to work". Copy follows [voice.md](voice.md).

## Gaps

No card sort or tree test was run; the structure follows the conventions of the
engineering sites studied (brandur, simonw, jvns) and the three-reader table
above. The cheapest check after launch: ask two engineers to find "how he handled
retries" and "his CV" and watch the first click.
