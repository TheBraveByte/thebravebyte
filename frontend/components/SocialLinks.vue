<template>
  <ul class="flex flex-wrap gap-x-5 gap-y-2">
    <li class="inline-flex items-center gap-1.5">
      <Icon name="lucide:mail" class="h-3.5 w-3.5" aria-hidden="true" />
      <!-- Cloudflare's email obfuscation rewrites addresses in the HTML, which breaks Vue
           hydration and the link without JS. It skips anything inside email_off comments;
           Vue strips template comments, so the link goes in as raw HTML. -->
      <span v-html="email" />
    </li>
    <li v-for="l in links" :key="l.href"><OutLink v-bind="l" class="hover:text-text" /></li>
  </ul>
</template>

<script setup lang="ts">
const address = 'ayaaakinleye@gmail.com'
const email = `<!--email_off--><a href="mailto:${address}" class="hover:text-text">${address}</a><!--/email_off-->`
const links = [
  { label: 'GitHub', href: 'https://github.com/TheBraveByte' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/' },
  { label: 'Hashnode', href: 'https://ayaacodes.hashnode.dev' },
]
</script>
