import { work } from '~/data/work'
import { published } from '~/utils/note-dates'

export default defineEventHandler((event) => {
  const site = useRuntimeConfig().public.siteUrl
  const paths = ['', '/work', '/writing', '/about', ...work.map(w => `/work/${w.slug}`), ...Object.keys(published).map(slug => `/writing/${slug}`)]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${site}${p}</loc></url>`).join('\n')}
</urlset>
`
})
