<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
    <div class="enter flex items-center gap-4">
      <div class="media aspect-square w-14 shrink-0 rounded-full">
        <Media name="yusuf" alt="Yusuf Akinleye" :width="800" :height="758" :widths="[480]" sizes="56px" position="object-[50%_18%]" eager />
      </div>
      <h1 class="text-[28px] font-semibold tracking-[-0.035em] md:text-[32px]">About</h1>
    </div>

    <div class="enter mt-8 space-y-4 text-text-secondary" style="--i: 2">
      <p class="text-[17px] leading-snug text-text">
        I'm a backend software and platform engineer, building production systems since 2019, mostly
        for payment and media products. I design for what goes wrong first: a provider that never
        answers, a worker that dies mid-job, a request that arrives twice.
      </p>
      <p>
        I also do research in AI, robotics and automation. It's where I started: one of the first
        systems I built was an automated fire detector on an 8-bit microcontroller.
      </p>
      <p>
        I run <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>,
        a small studio that designs and builds products for clients, and I'm currently learning Zig.
      </p>
    </div>
    </div>

    <section class="rail mt-12" aria-labelledby="experience">
      <h2 id="experience" class="rail-label" data-reveal>Where I've worked</h2>
      <ul>
        <li v-for="(r, i) in roles" :key="r.org + r.title" data-reveal :style="{ '--i': Math.min(i, 8) }" class="grid grid-cols-[6.5rem_1fr] gap-4 py-1.5 text-[15px] sm:grid-cols-[7.5rem_1fr]">
          <span class="pt-1 font-mono text-[12px] tabular-nums text-text-muted">{{ r.when }}</span>
          <span class="text-text">{{ r.title }}, <span class="text-text-secondary">{{ r.org }}</span></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
// Roles and dates as the owner lists them. Facts beyond these come from the
// engineering-contributions claim store only.
const roles = [
  { when: '2026 to now', title: 'Founder', org: 'FoldLabs' },
  { when: '2025 to 2026', title: 'Software engineer, backend (contract)', org: 'Rixl' },
  { when: '2025 to 2026', title: 'Principal backend engineer', org: 'Eazyfit' },
  { when: '2025 to 2026', title: 'Backend engineer (contract)', org: 'Paymax' },
  { when: '2024', title: 'Backend engineer (contract)', org: 'Volomn' },
  { when: '2023 to 2024', title: 'Senior software engineer (contract)', org: 'NHIA' },
  { when: '2023 to 2024', title: 'Applied ML researcher (part-time)', org: 'SQE.io' },
  { when: '2023 to 2024', title: 'Technical writer', org: 'Earthly' },
  { when: '2022 to 2024', title: 'Founding software engineer', org: '1go Technologies' },
  { when: '2019 to 2021', title: 'Python freelancer', org: 'Fiverr' },
  { when: '2018 to 2024', title: 'B.Eng. Electrical and Electronics Engineering', org: 'University of Ilorin' },
]

useSeoMeta({
  title: 'About | Yusuf Akinleye',
  description: 'Backend software and platform engineer. I build reliable systems.',
})
</script>
