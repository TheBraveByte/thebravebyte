<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
    <div class="flex items-center gap-4">
      <div class="media aspect-square w-14 shrink-0 rounded-full">
        <Media name="yusuf" alt="Yusuf Akinleye" :width="800" :height="758" :widths="[480]" sizes="56px" position="object-[50%_18%]" eager />
      </div>
      <h1 class="text-[28px] font-semibold tracking-[-0.015em] md:text-[32px]">It started with a fire alarm</h1>
    </div>

    <div class="mt-8 space-y-4 text-text-secondary">
      <p>
        My final-year engineering project at the University of Ilorin was a fire detector on an
        8-bit board. The hard part wasn't the model. It was deciding when to sound the alarm,
        because a missed fire costs far more than a false one.
      </p>
      <p class="text-text">
        I've been answering the same question since, with more at stake: what should a system
        do when it isn't sure?
      </p>
      <p>
        In payments it means a payout with no answer is marked unsure, so nobody is paid twice.
        I've written production code since 2019, Go backends for most of it. I'm based in
        Lagos, Nigeria, and run <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>.
      </p>
    </div>
    </div>

    <section class="rail mt-12" aria-labelledby="experience">
      <h2 id="experience" class="rail-label">Where I've worked</h2>
      <ul>
        <li v-for="r in roles" :key="r.org + r.title" class="grid grid-cols-[6.5rem_1fr] gap-4 py-1.5 text-[17px] sm:grid-cols-[7.5rem_1fr]">
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
  description: 'From a fire detector on an 8-bit board to payment systems: what a system should do when it isn\'t sure.',
})
</script>
