<template>
  <div class="page pt-16 md:pt-24">
    <div class="media aspect-square w-24 rounded-full">
      <Media name="yusuf" alt="Yusuf Akinleye" :width="800" :height="758" :widths="[480]" sizes="96px" position="object-[50%_18%]" eager />
    </div>
    <h1 class="mt-8 text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[52px]">It started with a fire alarm.</h1>

    <div class="mt-8 space-y-5 text-text-secondary">
      <p>
        My final-year project in Electrical and Electronics Engineering at the University of
        Ilorin was a fire detector: smoke, temperature and gas sensors, a small model, and an
        8-bit board to run it on.
      </p>
      <p>
        The model was the easy part. The hard part was deciding when to sound the alarm. A
        missed fire costs far more than a false alarm, so the threshold had to be set by what
        each mistake costs, and the model had to be one I could explain afterwards.
      </p>
      <p class="text-[21px] leading-snug text-text md:text-[22px]">
        I've been answering the same question ever since, with more at stake: what should a
        system do when it isn't sure?
      </p>
      <p>
        In a payment system it means a payout that never answers is marked unsure, not failed,
        so nobody is paid twice. In a job queue it means work a dead worker was holding goes
        back on the queue. In a model it means asking a question instead of guessing. The
        rule underneath is the same: a system that acts on uncertain input owes its operator
        an account of why, and a defined behaviour when it isn't sure.
      </p>
      <p>
        I've written production code since 2019, Python first and then Go backends: payments,
        ledgers, media pipelines, compliance and multi-tenant APIs. I live in the United
        Kingdom and run <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>,
        a small studio that designs and builds products for clients.
      </p>
    </div>

    <section class="mt-16" aria-labelledby="experience">
      <h2 id="experience" class="text-[15px] font-medium text-text-muted">Where I've worked</h2>
      <ul class="mt-4">
        <li v-for="r in roles" :key="r.org + r.title" class="grid grid-cols-[6.5rem_1fr] gap-4 py-2.5 sm:grid-cols-[8rem_1fr]">
          <span class="text-[15px] tabular-nums text-text-muted">{{ r.when }}</span>
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
  { when: '2025 to 2026', title: 'Development Lead (contract)', org: 'Rixl' },
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
