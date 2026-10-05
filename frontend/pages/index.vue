<template>
  <div class="page pt-12 md:pt-20">
    <div class="offset">
      <p class="enter font-mono text-[14px] text-text-muted">Yusuf Akinleye</p>
      <h1 class="rise-words mt-4 max-w-[16ch] text-[38px] font-semibold leading-[1.05] tracking-[-0.045em] md:text-[56px]" aria-label="Backend Software & Platform Engineer">
        <template v-for="(word, i) in headline" :key="i"><span class="w" aria-hidden="true"><span :style="{ '--i': i }">{{ word }}</span></span>{{ ' ' }}</template>
      </h1>
      <p class="enter mt-5 max-w-[34ch] text-[18px] leading-snug text-text-secondary md:text-[20px]" style="--i: 6">I build backend systems for payments, identity and safe deployments.</p>
      <p class="enter mt-5 flex flex-wrap items-center gap-x-7 font-medium" style="--i: 7">
        <a href="#selected" class="act">Explore my work <Icon name="lucide:arrow-down" class="h-4 w-4" aria-hidden="true" /></a>
        <a href="#contact" class="act">Get in touch <Icon name="lucide:arrow-right" class="arrow-r h-4 w-4" aria-hidden="true" /></a>
      </p>
    </div>

    <section class="rail mt-14 md:mt-16" aria-labelledby="selected">
      <h2 id="selected" class="rail-label" data-reveal>Selected work</h2>
      <div>
        <article data-reveal style="--i: 1">
          <h3 class="flex flex-wrap items-baseline gap-x-3">
            <NuxtLink :to="`/work/${featured.slug}`" class="quiet-link text-[26px] font-semibold leading-tight tracking-[-0.03em] md:text-[30px]">{{ featured.name }}</NuxtLink>
            <span class="status">{{ featured.status }}</span>
          </h3>
          <p class="mt-2 text-[18px] leading-snug text-text md:text-[20px]">{{ featured.what }}</p>
          <figure v-if="featured.shot" class="mt-5">
            <button type="button" class="media block aspect-[1600/969] w-full cursor-zoom-in" aria-label="Enlarge the screenshot" @click="zoom?.showModal()">
              <Media v-bind="featured.shot" :class="{ 'shot-light': featured.shotDark }" :sizes="shotSizes" />
              <Media v-if="featured.shotDark" v-bind="featured.shotDark" class="shot-dark" :sizes="shotSizes" />
            </button>
            <dialog v-if="featured.shotFull" ref="zoom" class="zoom" aria-label="The babit console, enlarged" @click="zoom?.close()">
              <button type="button" class="zoom-close font-mono text-[14px]" autofocus>Close</button>
              <div class="zoom-frame">
                <Media v-bind="featured.shotFull" :class="{ 'shot-light': featured.shotFullDark }" sizes="(min-width: 1500px) 1440px, 96vw" />
                <Media v-if="featured.shotFullDark" v-bind="featured.shotFullDark" class="shot-dark" sizes="(min-width: 1500px) 1440px, 96vw" />
              </div>
            </dialog>
            <figcaption class="mt-2 font-mono text-[14px] text-text-muted">{{ featured.shotCaption }}</figcaption>
          </figure>
          <dl class="mt-6 space-y-3">
            <div v-for="row in brief(featured)" :key="row.k" class="brief">
              <dt>{{ row.k }}</dt>
              <dd>{{ row.v }}</dd>
            </div>
          </dl>
          <p class="mt-3 flex flex-wrap gap-x-6 font-mono text-[14px]">
            <NuxtLink :to="`/work/${featured.slug}`" class="act">Read the case study <Icon name="lucide:arrow-right" class="arrow-r h-3.5 w-3.5" aria-hidden="true" /></NuxtLink>
            <OutLink v-for="l in featured.links" :key="l.href" v-bind="l" class="act" />
          </p>
        </article>

        <article v-for="(w, i) in secondary" :key="w.slug" class="mt-12" data-reveal :style="{ '--i': i + 1 }">
          <h3 class="flex flex-wrap items-baseline gap-x-3">
            <NuxtLink :to="`/work/${w.slug}`" class="quiet-link text-[19px] font-semibold tracking-[-0.02em]">{{ w.name }}</NuxtLink>
            <span class="status">{{ w.status }}</span>
          </h3>
          <p class="mt-1 text-text">{{ w.what }}</p>
          <p class="mt-1 text-text-secondary">{{ w.myRole }}</p>
          <p class="mt-1 flex flex-wrap gap-x-6 font-mono text-[14px]">
            <NuxtLink :to="`/work/${w.slug}`" class="act">Read the case study <Icon name="lucide:arrow-right" class="arrow-r h-3.5 w-3.5" aria-hidden="true" /></NuxtLink>
            <OutLink v-for="l in w.links" :key="l.href" v-bind="l" class="act" />
          </p>
        </article>
      </div>
    </section>

    <section class="rail mt-16" aria-labelledby="experience">
      <h2 id="experience" class="rail-label" data-reveal>Experience</h2>
      <ul class="space-y-8">
        <li v-for="(w, i) in experience" :key="w.slug" data-reveal :style="{ '--i': i + 1 }">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 class="flex flex-wrap items-baseline gap-x-3">
              <NuxtLink :to="`/work/${w.slug}`" class="quiet-link text-[17px] font-semibold">{{ w.name }}</NuxtLink>
              <span v-if="w.status" class="status">{{ w.status }}</span>
            </h3>
            <span class="font-mono text-[14px] tabular-nums text-text-muted">{{ w.years }}</span>
          </div>
          <p class="mt-1 text-text-secondary">{{ w.what }} {{ w.myRole }}</p>
          <ul v-if="w.owned" class="mt-2 space-y-1 text-text-secondary">
            <li v-for="o in w.owned.slice(0, 4)" :key="o" class="grid grid-cols-[1rem_1fr]"><span class="text-text-muted" aria-hidden="true">–</span><span>{{ o }}</span></li>
          </ul>
          <p class="mt-1 flex flex-wrap gap-x-6 font-mono text-[14px]">
            <NuxtLink :to="`/work/${w.slug}`" class="act">How I built it <Icon name="lucide:arrow-right" class="arrow-r h-3.5 w-3.5" aria-hidden="true" /></NuxtLink>
            <OutLink v-for="l in w.links" :key="l.href" v-bind="l" class="act" />
          </p>
        </li>
      </ul>
      <p class="mt-6 text-text-muted md:col-start-2" data-reveal>
        I've also built private systems for clients: payments, compliance, trading and commerce.
      </p>
    </section>

    <section class="rail mt-16" aria-labelledby="stories">
      <h2 id="stories" class="rail-label" data-reveal>Developer stories</h2>
      <ul class="space-y-4">
        <li v-for="(n, i) in notes.slice(0, 3)" :key="n.slug" data-reveal :style="{ '--i': i + 1 }">
          <NuxtLink :to="`/writing/${n.slug}`" class="group block">
            <span class="quiet-link text-text">{{ n.short }}</span>
            <span class="mt-0.5 block text-[16px] text-text-secondary">{{ n.lesson }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="rail mt-16" aria-labelledby="contact">
      <h2 id="contact" class="rail-label" data-reveal>Contact</h2>
      <div data-reveal style="--i: 1">
        <p class="text-[18px] leading-snug text-text md:text-[20px]">I'm available for roles and contract work. Email me.</p>
        <SocialLinks class="mt-2 font-mono text-[14px] text-text-secondary" />
        <p class="font-mono text-[14px]">
          <OutLink href="https://foldlabs.pro" label="Building with FoldLabs" class="act-quiet" />
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { work, type WorkItem } from '~/data/work'
import { notes } from '~/utils/notes'

const zoom = ref<HTMLDialogElement>()
const headline = ['Backend', 'Software', '&', 'Platform', 'Engineer']
const featured = work.find(w => w.slug === 'babit')!
const secondary = [work.find(w => w.slug === 'bloom-parser')!]
const experience = ['rixl', 'eazyfit'].map(slug => work.find(w => w.slug === slug)!)

const shotSizes = '(min-width: 840px) 592px, (min-width: 768px) calc(100vw - 248px), 100vw'

const brief = (w: WorkItem) => [
  { k: 'Problem', v: w.problem },
  { k: 'What I built', v: w.built },
  { k: 'Evidence', v: w.evidence },
].filter(row => row.v)

const tagline = 'Backend software and platform engineer. I build backend systems for payments, identity and safe deployments.'
useSeoMeta({
  title: 'Yusuf Akinleye, backend software and platform engineer',
  description: tagline,
  ogTitle: 'Yusuf Akinleye, backend software and platform engineer',
  ogDescription: tagline,
})
</script>
