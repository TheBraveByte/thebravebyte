<template>
  <section id="clients" class="py-10">
    <div class="container">
      <h2 class="text-sm font-medium text-text-muted mb-4">Worked with</h2>

      <ul class="grid grid-cols-3 sm:grid-cols-4 gap-px bg-border border border-border rounded-md overflow-hidden">
        <li
          v-for="c in companies"
          :key="c.name"
          class="bg-bg aspect-[5/2] flex items-center justify-center p-3 group relative"
          :title="c.name"
        >
          <img
            v-if="c.logo"
            :src="c.logo"
            :alt="c.name"
            class="max-h-6 max-w-full object-contain grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all"
          />
          <span v-else class="text-sm font-medium text-text-muted">{{ c.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Company {
  name: string;
  logo?: string;
}

const companies: Company[] = [
  { name: 'RIXL', logo: '/img/brands/rixl.png' },
  { name: 'Wayg', logo: '/img/brands/wayg.svg' },
  { name: '1Go', logo: '/img/brands/1go.jpg' },
  { name: 'EazyFit', logo: '/img/brands/eazyfit.png' },
  { name: 'Toptech', logo: '/img/brands/toptech.png' },
  { name: 'BiTraq', logo: '/img/brands/bitraq.svg' },
  { name: 'Contra', logo: '/img/brands/contra.svg' },
  { name: 'SQE', logo: '/img/brands/sqe.svg' },
];
</script>
