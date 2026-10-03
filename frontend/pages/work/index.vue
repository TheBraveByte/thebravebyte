<template>
  <div class="mx-auto max-w-[736px] px-4 pt-16 md:px-8 md:pt-24">
    <p class="label">Project index</p>
    <h1 class="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Work</h1>
    <p class="mt-5 max-w-[58ch] text-text-secondary">
      Products I own, and work for clients and employers. Most of it lives in private
      repositories, so code and demos are linked only where they are public.
    </p>
    <div class="mt-14">
      <WorkIndex :items="work" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'

useSeoMeta({
  title: 'Work | Yusuf Akinleye',
  description: 'Backend systems I have built: payments, ledgers, compliance, media pipelines and APIs, in Go.',
})
</script>
