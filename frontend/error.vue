<template>
  <NuxtLayout>
    <div class="page pt-14 md:pt-20">
      <div class="offset">
        <p class="font-mono text-[13px] text-text-muted">{{ error?.statusCode ?? 404 }}</p>
        <h1 class="mt-2 text-[28px] font-semibold tracking-[-0.035em] md:text-[32px]">
          {{ error?.statusCode === 404 ? 'This page isn\'t here.' : 'Something went wrong.' }}
        </h1>
        <p class="mt-4 text-text-secondary">
          Try the <NuxtLink to="/work" class="quiet-link text-text">work</NuxtLink> or
          <NuxtLink to="/writing" class="quiet-link text-text">writing</NuxtLink> pages.
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
useSeoMeta({ title: 'Not found | Yusuf Akinleye', robots: 'noindex' })
</script>
