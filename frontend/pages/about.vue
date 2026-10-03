<template>
  <div class="container-wide pt-12 pb-24 md:pt-20 md:pb-32">
    <div class="grid gap-10 md:grid-cols-12">
      <header class="md:col-span-7">
        <h1 class="text-4xl font-semibold tracking-tight md:text-5xl">About</h1>
        <div class="mt-6 space-y-4 text-lg leading-relaxed text-text-secondary">
          <p>
            I'm Yusuf Akinleye, a software engineer. I've written production code for more than
            five years, starting with paid Python work in 2019 and moving to Go backends.
          </p>
          <p>
            Most of my work is the part of a product that handles money and state: payment flows,
            ledgers, job queues, multi-tenant APIs. I care most about what happens when a vendor
            times out, a worker dies or a request arrives twice.
          </p>
          <p>
            I studied Electrical and Electronics Engineering at the University of Ilorin. I run
            <a href="https://foldlabs.pro" class="prose-link text-text" target="_blank" rel="noopener noreferrer">FoldLabs</a>,
            a small studio that designs and builds products for clients.
          </p>
        </div>
      </header>
      <div class="md:col-span-4 md:col-start-9">
        <div class="media-frame aspect-[4/5] max-w-xs md:max-w-none">
          <Media name="yusuf" alt="Yusuf Akinleye" :width="800" :height="758" :widths="[480, 800]" sizes="(min-width: 768px) 360px, 80vw" position="object-[50%_20%]" eager />
        </div>
      </div>
    </div>

    <section class="mt-20" aria-labelledby="experience">
      <h2 id="experience" class="text-2xl font-semibold tracking-tight">Experience</h2>
      <ol class="mt-6">
        <li
          v-for="item in timeline"
          :key="item.title + item.org"
          class="grid gap-1 border-t border-border py-6 md:grid-cols-12 md:gap-8"
        >
          <span class="font-mono text-xs text-text-muted md:col-span-3 md:pt-1.5">{{ item.when }}</span>
          <div class="md:col-span-9">
            <h3 class="text-lg font-semibold tracking-tight">
              {{ item.title }},
              <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer" class="prose-link">{{ item.org }}</a>
              <span v-else>{{ item.org }}</span>
            </h3>
            <p class="mt-1 text-text-secondary">{{ item.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="mt-16 flex flex-wrap items-center gap-3" aria-label="Links">
      <a href="mailto:ayaaakinleye@gmail.com" class="btn-primary">Email</a>
      <a href="https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/" target="_blank" rel="noopener noreferrer" class="btn-secondary">LinkedIn</a>
      <a href="https://github.com/TheBraveByte" target="_blank" rel="noopener noreferrer" class="btn-secondary">GitHub</a>
    </section>
  </div>
</template>

<script setup lang="ts">
// Roles and dates only. Figures appear only where the engineering-contributions
// claim store backs them.
const timeline = [
  { when: '2026 to now', title: 'Founder', org: 'FoldLabs', url: 'https://foldlabs.pro', text: 'A studio that designs and builds products for clients. I lead the engineering.' },
  { when: '2025 to 2026', title: 'Development Lead (contract)', org: 'Rixl', url: 'https://docs.rixl.com', text: 'Led backend development for a video and media platform: the gRPC services, transcoding pipeline, shared library and SDKs in eight languages.' },
  { when: '2025 to 2026', title: 'Principal backend engineer', org: 'Eazyfit', url: 'https://www.eazyfitfashion.com', text: 'Wrote most of the core API for a fashion-tailoring marketplace, including escrow payments and the photo-to-measurement pipeline.' },
  { when: '2025 to 2026', title: 'Backend engineer (contract)', org: 'Paymax', text: 'One of the two largest contributors on a multi-domain platform. Owned delivery, transport, voting and health-insurance domains.' },
  { when: '2024', title: 'Backend engineer (contract)', org: 'Volomn', url: 'https://volomn.com/', text: 'Go APIs for loyalty transactions, with Paystack webhooks.' },
  { when: '2023 to 2024', title: 'Senior software engineer (contract)', org: 'NHIA', text: 'A complaint-handling API for the National Health Insurance Authority.' },
  { when: '2023 to 2024', title: 'Applied ML researcher (part-time)', org: 'SQE.io', text: 'PyTorch classification models for document security and noisy sensor data.' },
  { when: '2023 to 2024', title: 'Technical writer', org: 'Earthly', url: 'https://earthly.dev/blog/mail-server-api-goroutines-gmail/', text: 'Published Go concurrency tutorials.' },
  { when: '2022 to 2024', title: 'Founding software engineer', org: '1go Technologies', url: 'https://1goride.com/', text: 'Built the ride-booking and transport backends, including live location tracking and payments.' },
  { when: '2019 to 2021', title: 'Python freelancer', org: 'Fiverr', text: 'Desktop automation tools and GUI apps for clients.' },
  { when: '2018 to 2024', title: 'B.Eng. Electrical and Electronics Engineering', org: 'University of Ilorin', text: 'Thesis: a logistic-regression fire-detection system running on 8-bit hardware.' },
]

useSeoMeta({
  title: 'About | Yusuf Akinleye',
  description: 'Yusuf Akinleye, software engineer. Go backends for payments, ledgers, job queues and multi-tenant APIs.',
})
</script>
