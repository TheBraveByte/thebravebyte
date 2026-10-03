<template>
  <a :href="href" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5">
    <Icon v-if="brand" :name="brand" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    <span>{{ label }}</span>
    <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
  </a>
</template>

<script setup lang="ts">
// An external link. Brand destinations get the brand's own mark; everything else is text.
const props = defineProps<{ href: string, label: string }>()
const brands: [RegExp, string][] = [
  [/github\.com/, 'simple-icons:github'],
  [/apps\.apple\.com/, 'simple-icons:appstore'],
  [/play\.google\.com/, 'simple-icons:googleplay'],
  [/hashnode\.dev|hashnode\.com/, 'simple-icons:hashnode'],
  [/linkedin\.com/, 'simple-icons:linkedin'],
]
const brand = computed(() => brands.find(([re]) => re.test(props.href))?.[1])
</script>
