<template>
  <section id="testimonials" class="py-24 bg-bg relative overflow-hidden border-b border-border">
    <!-- Background Grid -->
    <div class="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="mb-16">
        <h3 class="font-mono-label text-text-secondary mb-3 flex items-center gap-2">
          <span class="w-2 h-2 bg-text-secondary"></span>
          // TRUSTED_NETWORKS
        </h3>
        <p class="font-mono text-xs text-text-secondary max-w-xl">
          ESTABLISHED_UPLINKS_WITH_VISIONARY_ENTITIES.
          <br>
          SCALING_SOLUTIONS_GLOBALLY.
        </p>
      </div>

      <!-- Marquee Container -->
      <div class="relative w-full overflow-hidden mask-gradient border-y border-border bg-gray-50/50 bg-bg-secondary">
        <div class="flex gap-12 items-center animate-marquee whitespace-nowrap py-8">
          <!-- Render companies twice for seamless loop -->
          <template v-for="(company, index) in [...companies, ...companies]" :key="`${company.name}-${index}`">
            <div
              class="flex items-center gap-4 px-6 py-3 border border-border bg-bg hover:border-text transition-colors duration-200 group cursor-default min-w-[200px]">
              
              <!-- Tech Marker -->
              <div class="w-1 h-full bg-border group-hover:bg-text-secondary transition-colors duration-200"></div>

              <div :class="[
                'w-10 h-10 overflow-hidden flex items-center justify-center rounded-sm transition-colors',
                'bg-gray-100 bg-text/10',
                company.hoverBg
              ]">
                <img v-if="company.brandImg" :src="company.brandImg" :alt="`${company.name} logo`"
                  class="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                <Icon v-else :name="company.icon" :class="[
                  'w-5 h-5',
                  'text-text-secondary',
                  company.hoverColor
                ]" />
              </div>
              <span
                class="font-mono text-sm font-bold text-text-secondary group-hover:text-text transition-colors">
                {{ company.name.toUpperCase() }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Company {
  name: string;
  icon: string;
  brandImg?: string;
  hoverBg: string;
  hoverColor: string;
}

const companies: Company[] = [
  {
    name: 'RIXL',
    icon: 'lucide:rocket',
    brandImg: '/img/brands/rixl.png',
    hoverBg: 'group-hover:bg-gray-50 dark:group-hover:bg-gray-950',
    hoverColor: 'group-hover:text-gray-600 dark:group-hover:text-gray-400'
  },
  {
    name: 'Wayg',
    icon: 'lucide:truck-delivery',
    brandImg: '/img/brands/wayg.svg',
    hoverBg: 'group-hover:bg-yellow-50 dark:group-hover:bg-yellow-950',
    hoverColor: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400'
  },
  {
    name: '1Go Technologies',
    icon: 'lucide:car-taxi-front',
    brandImg: '/img/brands/1go.jpg',
    hoverBg: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-950',
    hoverColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
  },
  {
    name: 'EazyFit',
    icon: 'lucide:shirt',
    brandImg: '/img/brands/eazyfit.png',
    hoverBg: 'group-hover:bg-pink-50 dark:group-hover:bg-pink-950',
    hoverColor: 'group-hover:text-pink-600 dark:group-hover:text-pink-400'
  },
  {
    name: 'Toptech',
    icon: 'lucide:monitor',
    brandImg: '/img/brands/toptech.png',
    hoverBg: 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950',
    hoverColor: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
  },
  {
    name: 'BiTraq',
    icon: 'lucide:bitcoin',
    brandImg: '/img/brands/bitraq.svg',
    hoverBg: 'group-hover:bg-orange-50 dark:group-hover:bg-orange-950',
    hoverColor: 'group-hover:text-orange-600 dark:group-hover:text-orange-400'
  },
  {
    name: 'Contra',
    icon: 'lucide:briefcase',
    brandImg: '/img/brands/contra.svg',
    hoverBg: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-950',
    hoverColor: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
  },
  {
    name: 'SQE',
    icon: 'lucide:building',
    brandImg: '/img/brands/sqe.svg',
    hoverBg: 'group-hover:bg-green-50 dark:group-hover:bg-green-950',
    hoverColor: 'group-hover:text-green-600 dark:group-hover:text-green-400'
  }
];
</script>

<style scoped>
.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
