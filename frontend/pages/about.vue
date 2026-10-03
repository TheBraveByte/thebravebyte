<template>
  <div class="mx-auto max-w-[736px] px-4 pt-16 md:px-8 md:pt-24">
    <div class="flex gap-4 border-b border-border pb-3">
      <span class="label">Profile</span>
      <span class="label">Yusuf Akinleye</span>
    </div>

    <div class="mt-8 grid gap-8 sm:grid-cols-[1fr_9.5rem] sm:items-end">
      <div>
        <h1 class="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.045em] md:text-[52px]">
          I build the parts of a product that handle money and state.
        </h1>
        <p class="mt-6 text-[17px] leading-relaxed text-text-secondary">
          For more than five years I've written production backends: payment flows, ledgers,
          job queues and multi-tenant APIs, from the first schema to the system people depend on.
        </p>
      </div>
      <figure class="w-32 sm:w-full">
        <div class="media-frame aspect-[4/5] grayscale">
          <Media name="yusuf" alt="Yusuf Akinleye" :width="800" :height="758" :widths="[480, 800]" sizes="160px" position="object-[50%_20%]" eager />
        </div>
        <figcaption class="label mt-2 text-[10px]">Yusuf Akinleye</figcaption>
      </figure>
    </div>

    <dl class="mt-12 border-t border-border">
      <div v-for="row in facts" :key="row.k" class="grid grid-cols-[8rem_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[10rem_1fr]">
        <dt class="label pt-0.5">{{ row.k }}</dt>
        <dd class="font-mono text-[13px] text-text">{{ row.v }}</dd>
      </div>
    </dl>

    <section class="mt-14 grid gap-4 border-t border-border pt-6 sm:grid-cols-[10rem_1fr]">
      <h2 class="label">Practice</h2>
      <div class="space-y-5 text-[17px] leading-relaxed text-text-secondary">
        <p>
          Most of my work is the part nobody sees until it breaks: what happens when a vendor
          times out, a worker dies halfway through a job, or the same request arrives twice.
        </p>
        <p>
          I prefer a modular monolith on Postgres, split into services only when the workload
          asks for it, and I write down why a decision was made so the next engineer can undo it
          safely.
        </p>
      </div>
    </section>

    <section class="mt-16" aria-labelledby="experience">
      <div class="grid grid-cols-[1fr_auto] border-b border-border pb-3">
        <h2 id="experience" class="label">Experience</h2>
        <span class="label tabular-nums">{{ String(timeline.length).padStart(2, '0') }}</span>
      </div>
      <ol>
        <li v-for="item in timeline" :key="item.title + item.org" class="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <span class="font-mono text-[12px] tabular-nums text-text-muted">{{ item.when }}</span>
          <span>
            <span class="font-mono text-[14px] font-medium text-text">{{ item.title }}, {{ item.org }}</span>
            <span class="mt-1.5 block font-mono text-[13px] leading-relaxed text-text-secondary">{{ item.text }}</span>
          </span>
        </li>
      </ol>
    </section>

    <section class="mt-16 grid gap-4 border-t border-border pt-6 sm:grid-cols-[10rem_1fr]">
      <h2 class="label">Elsewhere</h2>
      <div class="flex flex-wrap gap-5">
        <a href="mailto:ayaaakinleye@gmail.com" class="text-link">Email ↗</a>
        <a href="https://github.com/TheBraveByte" target="_blank" rel="noopener noreferrer" class="text-link">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/" target="_blank" rel="noopener noreferrer" class="text-link">LinkedIn ↗</a>
        <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="text-link">FoldLabs ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Roles and dates only. Figures appear only where the engineering-contributions
// claim store backs them.
const facts = [
  { k: 'Role', v: 'Software engineer, founder of FoldLabs' },
  { k: 'Focus', v: 'Go · Postgres · Payments · APIs' },
  { k: 'Experience', v: '5+ years of production code' },
  { k: 'Based', v: 'United Kingdom' },
  { k: 'Selected work', v: 'Rixl · Eazyfit · Paymax' },
]

const timeline = [
  { when: '2026 to now', title: 'Founder', org: 'FoldLabs', text: 'A studio that designs and builds products for clients. I lead the engineering.' },
  { when: '2025 to 2026', title: 'Development Lead (contract)', org: 'Rixl', text: 'Backend development for a video and media platform: the gRPC services, transcoding pipeline, shared library and SDKs in eight languages.' },
  { when: '2025 to 2026', title: 'Principal backend engineer', org: 'Eazyfit', text: 'Most of the core API for a fashion-tailoring marketplace, including escrow payments and the photo-to-measurement pipeline.' },
  { when: '2025 to 2026', title: 'Backend engineer (contract)', org: 'Paymax', text: 'One of the two largest contributors on a multi-domain platform. Owned delivery, transport, voting and health insurance.' },
  { when: '2024', title: 'Backend engineer (contract)', org: 'Volomn', text: 'Go APIs for loyalty transactions, with Paystack webhooks.' },
  { when: '2023 to 2024', title: 'Senior software engineer (contract)', org: 'NHIA', text: 'A complaint-handling API for the National Health Insurance Authority.' },
  { when: '2023 to 2024', title: 'Applied ML researcher (part-time)', org: 'SQE.io', text: 'PyTorch classification models for document security and noisy sensor data.' },
  { when: '2023 to 2024', title: 'Technical writer', org: 'Earthly', text: 'Published Go concurrency tutorials.' },
  { when: '2022 to 2024', title: 'Founding software engineer', org: '1go Technologies', text: 'The ride-booking and transport backends, including live location tracking and payments.' },
  { when: '2019 to 2021', title: 'Python freelancer', org: 'Fiverr', text: 'Desktop automation tools and GUI apps for clients.' },
  { when: '2018 to 2024', title: 'B.Eng. Electrical and Electronics Engineering', org: 'University of Ilorin', text: 'Thesis: a logistic-regression fire-detection system running on 8-bit hardware.' },
]

useSeoMeta({
  title: 'About | Yusuf Akinleye',
  description: 'Yusuf Akinleye, software engineer. Go backends for payments, ledgers, job queues and multi-tenant APIs.',
})
</script>
