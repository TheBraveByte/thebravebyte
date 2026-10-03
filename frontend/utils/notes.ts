// Engineering notes are the markdown files in the repo's top-level stories/ folder,
// the same files the GitHub profile README links to. One source, two surfaces.

const files = import.meta.glob('../../stories/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Publication dates, in display order (newest first). Add a line when a note is added.
const published: Record<string, string> = {
  'unsure-is-not-failed': '2026-10-03',
  'explicit-work-not-polling': '2026-10-03',
  'collapsing-early-microservices': '2026-10-03',
  'a-small-bot-that-takes-money': '2026-10-03',
}

export interface Note {
  slug: string
  title: string
  context: string
  body: string
  // First sentence of the note's "What I learned" section.
  lesson: string
  // Title before the colon: "Unsure" is not "failed", for short lists.
  short: string
  date: string
}

function parse(slug: string, raw: string): Note {
  const lines = raw.split('\n')
  const titleLine = lines.findIndex(l => l.startsWith('# '))
  const title = lines[titleLine]?.slice(2).trim() ?? slug
  const contextLine = lines.findIndex((l, i) => i > titleLine && /^\*[^*].*\*$/.test(l.trim()))
  const context = contextLine >= 0 ? lines[contextLine].trim().slice(1, -1) : ''
  // Drop the title and the italic context line; the page renders them itself.
  // Keep the rest, including the "Longer write-up" link where a note has one.
  const body = lines
    .filter((_, i) => i !== titleLine && i !== contextLine)
    .join('\n')
    .replace(/\(https:\/\/thebravebyte\.pages\.dev(\/[^)]*)\)/g, '($1)')
    .trim()
  const learned = raw.split(/^### What I learned\s*$/m)[1]?.trim().replace(/\s+/g, ' ') ?? ''
  const lesson = learned.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? learned
  return { slug, title, context, body, lesson, short: title.split(':')[0], date: published[slug] ?? '2026-10-03' }
}

export const notes: Note[] = Object.entries(files)
  .map(([path, raw]) => parse(path.split('/').pop()!.replace(/\.md$/, ''), raw))
  .sort((a, b) => order(a.slug) - order(b.slug))

function order(slug: string) {
  const i = Object.keys(published).indexOf(slug)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}

export function findNote(slug: string): Note | undefined {
  return notes.find(n => n.slug === slug)
}
