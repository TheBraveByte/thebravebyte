<template>
  <section
    id="trust"
    class="py-20 bg-bg border-b-[1.5px] border-ink"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-baseline justify-between mb-10 pb-4 border-b-[1.5px] border-ink flex-wrap gap-4">
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
          ⌁ Engagements · trust network
        </p>
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
          {{ companies.length }} organizations · 4 continents
        </p>
      </div>
    </div>

    <div class="relative w-full overflow-hidden mask-gradient border-y-[1.5px] border-ink bg-bg-secondary">
      <div class="flex gap-0 items-stretch animate-marquee whitespace-nowrap">
        <template
          v-for="(company, index) in [...companies, ...companies]"
          :key="`${company.name}-${index}`"
        >
          <div
            class="flex items-center gap-4 px-8 py-6 border-r-[1.5px] border-ink bg-bg min-w-[220px]"
          >
            <div class="w-10 h-10 border-[1.5px] border-ink flex items-center justify-center bg-bg-secondary overflow-hidden">
              <img
                v-if="company.brandImg"
                :src="company.brandImg"
                :alt="`${company.name} logo`"
                class="w-7 h-7 object-contain grayscale"
              />
              <span v-else class="font-serif text-lg">{{ company.name.charAt(0) }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-serif text-base text-text leading-tight">
                {{ company.name }}
              </span>
              <span class="font-mono text-[9.5px] text-text-muted uppercase tracking-[0.2em] mt-0.5">
                {{ company.role || 'Engineering' }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Company {
  name: string;
  brandImg?: string;
  role?: string;
}

const companies: Company[] = [
  { name: 'Rexall', role: 'Software Eng' },
  { name: 'RiXL', brandImg: '/img/brands/rixl.png', role: 'Cloud media' },
  { name: 'Wayg', brandImg: '/img/brands/wayg.svg', role: 'Logistics' },
  { name: '1Go Technologies', brandImg: '/img/brands/1go.jpg', role: 'Mobility' },
  { name: 'EazyFit', brandImg: '/img/brands/eazyfit.png', role: 'Marketplace' },
  { name: 'Toptech', brandImg: '/img/brands/toptech.png', role: 'Infra' },
  { name: 'BiTraq', brandImg: '/img/brands/bitraq.svg', role: 'Fintech' },
  { name: 'Contra', brandImg: '/img/brands/contra.svg', role: 'Contract' },
  { name: 'SQE', brandImg: '/img/brands/sqe.svg', role: 'Enterprise' },
];
</script>

<style scoped>
.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 50s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
