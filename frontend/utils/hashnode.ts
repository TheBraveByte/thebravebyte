// Articles live on Hashnode; the site lists them and links out. Hashnode's GraphQL API
// needs a paid plan since May 2026, so the list comes from the blog's public RSS feed.

export const HASHNODE_BLOG = 'https://ayaacodes.hashnode.dev'

export interface Article { title: string, excerpt: string, date: string, href: string }

const decode = (s: string) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, '\'')
  .replace(/&amp;/g, '&')
  .trim()

const tag = (item: string, name: string) => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '')

// One or two sentences, cut at a word boundary.
function excerpt(text: string, max = 170) {
  // The feed's brief starts with the article's first heading when it has one: a short
  // first line with no closing punctuation. Skip it.
  const lines = text.replace(/<[^>]+>/g, ' ').trim().split('\n')
  if (lines.length > 1 && lines[0].length < 60 && !/[.!?:"]$/.test(lines[0].trim())) lines.shift()
  const plain = lines.join(' ').replace(/\s+/g, ' ').trim()
  if (plain.length <= max) return plain
  return `${plain.slice(0, plain.lastIndexOf(' ', max)).replace(/[,.;:]$/, '')}…`
}

export function parseFeed(xml: string): Article[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    title: tag(item, 'title'),
    excerpt: excerpt(tag(item, 'description')),
    date: new Date(tag(item, 'pubDate')).toISOString(),
    href: tag(item, 'link'),
  })).filter(a => a.title && a.href.startsWith(HASHNODE_BLOG))
}
