<template>
  <ul class="flex flex-wrap gap-x-5 gap-y-2">
    <li>
      <a href="mailto:ayaaakinleye@gmail.com" class="inline-flex items-center gap-1.5 hover:text-text">
        <Icon name="lucide:mail" class="h-3.5 w-3.5" aria-hidden="true" />ayaaakinleye@gmail.com
      </a>
    </li>
    <li v-for="l in links" :key="l.href"><OutLink v-bind="l" class="hover:text-text" /></li>
  </ul>
</template>

<script setup lang="ts">
const links = [
  { label: 'GitHub', href: 'https://github.com/TheBraveByte' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/' },
  { label: 'Hashnode', href: 'https://ayaacodes.hashnode.dev' },
]
</script>
