<template>
  <div>
    <!-- Hero: the claim on the left, the claim working on the right -->
    <section class="ambient -mt-16 overflow-hidden pt-16">
      <div class="container-wide grid items-center gap-12 pt-14 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div class="lg:col-span-6">
          <div class="flex items-center gap-3">
            <picture>
              <source type="image/avif" srcset="/img/work/yusuf-480.avif" />
              <img src="/img/work/yusuf-480.webp" alt="" width="480" height="455" class="h-10 w-10 rounded-full object-cover object-top" />
            </picture>
            <p class="text-sm text-text-secondary">Yusuf Akinleye, software engineer</p>
          </div>
          <h1 class="mt-7 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
            I build backend systems that stay correct when things fail.
          </h1>
          <p class="mt-6 max-w-[44ch] text-lg leading-relaxed text-text-secondary">
            Payments, ledgers and background jobs in Go. Switch the simulation to naive retry to see why that matters.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/work" class="btn-primary">See work</NuxtLink>
            <a href="mailto:ayaaakinleye@gmail.com" class="btn-secondary">Email</a>
          </div>
        </div>
        <div class="lg:col-span-6">
          <PayoutSim />
        </div>
      </div>
    </section>

    <!-- Selected work: media first -->
    <section class="relative border-t border-border bg-bg-secondary/60 py-20 lg:py-28" aria-labelledby="selected-work">
      <div class="container-wide">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="selected-work" class="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
          <NuxtLink to="/work" class="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover">
            See all work
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </NuxtLink>
        </div>
        <div class="mt-12 grid items-start gap-x-10 gap-y-16 lg:grid-cols-12">
          <WorkTile
            v-for="(item, i) in featuredWork"
            :key="item.slug"
            :item="item"
            :wide="i === 0 || i === 3"
            :class="layout[i]"
            data-reveal
          />
        </div>
      </div>
    </section>

    <!-- What the notes taught: the lesson leads, the story follows -->
    <section class="py-20 lg:py-28" aria-labelledby="notes">
      <div class="container-wide">
        <h2 id="notes" class="text-3xl font-semibold tracking-tight sm:text-4xl">Things I've learned the hard way</h2>
        <p class="mt-4 max-w-[52ch] text-text-secondary">
          Each line comes from a problem I worked through. Open one for the decision, the
          trade-offs and what was built.
        </p>
        <ol class="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2">
          <li v-for="note in notes" :key="note.slug" class="bg-bg" data-reveal>
            <NuxtLink :to="`/writing/${note.slug}`" class="group flex h-full flex-col justify-between gap-8 p-7 transition-colors duration-200 hover:bg-bg-secondary sm:p-9">
              <p class="text-xl font-medium leading-snug tracking-tight text-text sm:text-2xl">{{ note.lesson }}</p>
              <span class="flex items-end justify-between gap-4">
                <span>
                  <span class="block text-sm font-medium text-text-secondary group-hover:text-accent">{{ note.title }}</span>
                  <span class="mt-1 block font-mono text-xs text-text-muted">{{ note.context.split('.')[0] }}</span>
                </span>
                <Icon name="lucide:arrow-up-right" class="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </span>
            </NuxtLink>
          </li>
        </ol>
      </div>
    </section>

    <!-- About, briefly -->
    <section class="border-t border-border py-20 lg:py-28" aria-labelledby="about-short">
      <div class="container-wide grid items-center gap-10 md:grid-cols-12">
        <div class="md:col-span-4">
          <div class="media-frame aspect-[4/5] max-w-xs">
            <Media name="yusuf" alt="Yusuf Akinleye" :width="800" :height="758" :widths="[480, 800]" sizes="(min-width: 768px) 320px, 80vw" position="object-[50%_20%]" />
          </div>
        </div>
        <div class="md:col-span-7 md:col-start-6">
          <h2 id="about-short" class="text-3xl font-semibold tracking-tight sm:text-4xl">More than five years of production code.</h2>
          <p class="mt-5 max-w-[56ch] text-lg leading-relaxed text-text-secondary">
            Paid Python work from 2019, Go backends since. I've led backend development at Rixl,
            wrote most of Eazyfit's API, and now run FoldLabs, a small studio that designs and
            builds products for clients.
          </p>
          <NuxtLink to="/about" class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover">
            Experience and background
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Closing: the hero's light returns -->
    <section class="ambient overflow-hidden border-t border-border" aria-labelledby="contact">
      <div class="container-wide py-24 text-left lg:py-32">
        <h2 id="contact" class="max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          If your product moves money, I'd like to hear about it.
        </h2>
        <p class="mt-6 max-w-[52ch] text-lg text-text-secondary">
          Email me at
          <a href="mailto:ayaaakinleye@gmail.com" class="prose-link text-text">ayaaakinleye@gmail.com</a>.
          For a full product team, FoldLabs is at
          <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="prose-link text-text">foldlabs.pro</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { featuredWork } from '~/data/work'
import { notes } from '~/utils/notes'

// Wide and narrow alternate so the grid has rhythm; the narrow column sits lower.
const layout = ['lg:col-span-7', 'lg:col-span-5 lg:mt-20', 'lg:col-span-5', 'lg:col-span-7 lg:mt-20']

useSeoMeta({
  title: 'Yusuf Akinleye, software engineer',
  description: 'Backend systems in Go that stay correct when things fail: payments, ledgers and background jobs.',
  ogTitle: 'Yusuf Akinleye, software engineer',
  ogDescription: 'Backend systems in Go that stay correct when things fail: payments, ledgers and background jobs.',
})
</script>
