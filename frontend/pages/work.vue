<template>
  <div class="container-wide pt-12 pb-24 md:pt-20 md:pb-32">
    <header class="max-w-[60ch]">
      <h1 class="text-4xl font-semibold tracking-tight md:text-5xl">Work</h1>
      <p class="mt-5 text-lg leading-relaxed text-text-secondary">
        Products I built and own, then work for clients and employers. Most of it lives in
        private repositories, so I link code and demos only where they are public.
      </p>
    </header>

    <section v-for="group in groups" :key="group.key" class="mt-16 md:mt-20" :aria-labelledby="`g-${group.key}`">
      <h2 :id="`g-${group.key}`" class="text-2xl font-semibold tracking-tight">{{ group.title }}</h2>

      <article
        v-for="item in group.items"
        :id="item.slug"
        :key="item.slug"
        class="grid gap-4 border-t border-border py-10 first-of-type:mt-6 md:grid-cols-12 md:gap-8"
      >
        <div class="md:col-span-4">
          <h3 class="text-xl font-semibold tracking-tight">{{ item.name }}</h3>
          <p class="mt-1 text-sm text-text-muted">{{ item.role }}</p>
          <p class="font-mono text-xs text-text-muted">{{ item.years }}</p>
          <p v-if="item.links.length" class="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              v-for="l in item.links"
              :key="l.href"
              :href="l.href"
              :target="l.href.startsWith('http') ? '_blank' : undefined"
              :rel="l.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-hover transition-colors"
            >
              {{ l.label }}
              <Icon v-if="l.href.startsWith('http')" name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
            </a>
          </p>
        </div>

        <div class="md:col-span-8">
          <p class="text-lg leading-relaxed">{{ item.summary }}</p>
          <ul class="mt-4 space-y-2 text-text-secondary">
            <li v-for="p in item.points" :key="p" class="pl-4 relative before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-text-muted">
              {{ p }}
            </li>
          </ul>
          <p class="mt-4 font-mono text-xs text-text-muted">{{ item.stack }}</p>
          <div v-if="item.media || item.diagram" class="media-frame mt-6 aspect-[16/10]">
            <Media
              v-if="item.media"
              :name="item.media.name"
              :alt="item.media.alt"
              :width="item.media.width"
              :height="item.media.height"
              :widths="item.media.widths"
              sizes="(min-width: 1024px) 700px, 100vw"
            />
            <div v-else class="ambient flex h-full items-center justify-center p-6 sm:p-10"><PipelineDiagram /></div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'

const groups = [
  { key: 'own', title: 'Products I built', items: work.filter(w => w.group === 'own') },
  { key: 'client', title: 'Client and employer work', items: work.filter(w => w.group === 'client') },
]

useSeoMeta({
  title: 'Work | Yusuf Akinleye',
  description: 'Backend systems I have built: payments, compliance, media pipelines and APIs, in Go.',
})
</script>
