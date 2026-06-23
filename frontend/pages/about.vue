<template>
  <div class="pt-16 md:pt-20 pb-16">
    <div class="container">
      <header class="mb-10">
        <h1 class="text-2xl font-bold tracking-tight text-text mb-4">About</h1>
        <p class="text-[15px] text-text-secondary font-serif leading-[1.75]">
          Hi, I'm Yusuf Akinleye, a software engineer from Ilorin, Nigeria. Below is a rough
          chronology — school, work, and a few things in between — with more detail on my CV.
        </p>
        <NuxtLink to="/cv" class="inline-flex items-center gap-1.5 text-sm text-text hover:underline underline-offset-4 mt-3">
          Full CV
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </NuxtLink>
      </header>

      <!-- Timeline -->
      <div class="relative border-l border-border ml-3 md:ml-32 space-y-12">
        <div v-for="item in timeline" :key="item.title" class="relative pl-6 md:pl-8 group">
          <!-- Dot -->
          <div class="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full border border-border bg-bg group-hover:border-text transition-colors duration-200"></div>

          <!-- Year -->
          <div class="md:absolute md:-left-36 md:top-1 md:w-28 md:text-right font-mono text-[11px] text-text-muted select-none group-hover:text-text transition-colors duration-200 mb-2 md:mb-0">
            {{ item.year }}
          </div>

          <!-- Content -->
          <div>
            <h3 class="text-sm font-semibold text-text mb-1 flex items-center gap-2">
              {{ item.title }}
              <span v-if="item.badge" class="font-mono text-[9px] font-medium tracking-wider uppercase px-1.5 py-0.5 rounded border border-success/30 text-success bg-success/5">
                {{ item.badge }}
              </span>
            </h3>
            <p v-if="item.company" class="text-xs text-text-muted mb-1">
              <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer" class="hover:underline underline-offset-2">{{ item.company }}</a>
              <span v-else>{{ item.company }}</span>
            </p>
            <p class="text-xs text-text-secondary leading-[1.65] font-serif">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About | Yusuf Akinleye',
  description: 'About Yusuf Akinleye — software engineer from Ilorin, Nigeria.',
});

const timeline = [
  {
    year: '2018',
    title: 'Started programming',
    description: 'Got curious about how things worked behind the software I used every day — that curiosity never stopped.',
  },
  {
    year: 'Nov 2018 — Aug 2024',
    title: 'B.Eng. Electrical & Electronics Engineering',
    company: 'University of Ilorin',
    description: 'CGPA 4.37/5.00 (Second Class Upper). Thesis: Design and Implementation of a Logistic Regression-Based Fire Detection System deployed on 8-bit hardware.',
  },
  {
    year: '2019 — 2021',
    title: 'Python Freelancer',
    company: 'Fiverr',
    description: 'Built desktop automation tools and GUI apps for international clients. Where I first learned to ship software people actually use.',
  },
  {
    year: 'Apr 2022 — Sep 2024',
    title: 'Founding Software Engineer',
    company: '1go Technologies',
    url: 'https://1goride.com/',
    description: 'Built GoRide and Travas from zero — geospatial tracking systems scaling to 2,100+ concurrent users, and multi-gateway payment reconciliation.',
  },
  {
    year: '2022 — Present',
    title: 'Co-founder',
    badge: 'Co-founder',
    company: 'Eazyfit',
    url: 'https://www.eazyfitfashion.com',
    description: 'Digital fashion marketplace turning phone photos into measurements via computer vision. Won $5,000 pre-seed at the Ilorin Innovation Challenge.',
  },
  {
    year: '2023 — 2024',
    title: 'Technical Writer',
    company: 'Earthly Technologies',
    url: 'https://earthly.dev/blog/mail-server-api-goroutines-gmail/',
    description: 'Published Go concurrency tutorials covering goroutines, channels, and concurrent mail server design.',
  },
  {
    year: 'Aug 2023 — Jun 2024',
    title: 'Senior Software Engineer (Contract)',
    company: 'NHIA',
    description: 'Built a healthcare complaint-handling API serving 1,000+ daily requests. Structured logging that cut root-cause analysis from hours to minutes.',
  },
  {
    year: 'Sep 2023 — Dec 2024',
    title: 'Applied ML Researcher (Part-time)',
    company: 'SQE.io, Boston (Remote)',
    description: 'Built PyTorch classification models for document security (75% accuracy) and noisy sensor data (20% thresholding gain).',
  },
  {
    year: 'Jul 2024 — Nov 2024',
    title: 'Backend Engineer (Contract)',
    company: 'Volomn',
    url: 'https://volomn.com/',
    description: 'Go APIs for loyalty transactions. Integrated Paystack webhooks, optimized DB layer for 40% latency reduction.',
  },
  {
    year: 'Jan 2025 — Apr 2025',
    title: 'Backend Engineer (Contract)',
    company: 'Paymax',
    description: 'Built a Go modular monolith for logistics and ride-hailing. Real-time driver dispatch over WebSockets and Redis pub/sub.',
  },
  {
    year: 'May 2025 — Present',
    title: 'Backend Engineer / Co-Lead',
    badge: 'Current',
    company: 'Rixl',
    url: 'https://docs.rixl.com',
    description: 'Video streaming infrastructure — H.265/HLS transcoding, usage-based billing on Stripe Meters, and a multi-language developer SDK.',
  },
];
</script>
