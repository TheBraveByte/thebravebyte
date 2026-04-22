<template>
  <section
    id="home"
    class="relative pt-32 md:pt-36 pb-20 bg-bg border-b-[1.5px] border-ink overflow-hidden"
  >
    <div class="absolute inset-0 nb-grid-bg opacity-60 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Eyebrow row -->
      <div class="hero-reveal flex items-center justify-between mb-10 md:mb-14 flex-wrap gap-4">
        <div class="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">
          <span class="inline-block w-1.5 h-1.5 bg-success"></span>
          <span>Available for engagements</span>
        </div>
        <div class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] hidden sm:block">
          Portfolio · Edition 05 · {{ year }}
        </div>
      </div>

      <!-- Main Headline -->
      <div class="max-w-5xl">
        <h1
          class="hero-title font-serif text-text tracking-tight leading-[0.95] text-[clamp(3rem,10vw,8.5rem)]"
        >
          Backend<br />
          &amp; the <em class="italic font-serif text-text-secondary">quiet</em><br />
          systems<br />
          <span class="inline-block">
            <span class="inline-block align-middle w-[0.85em] h-[0.08em] bg-ink mr-3"></span>
            <span class="align-middle">behind them.</span>
          </span>
        </h1>
      </div>

      <!-- Meta grid -->
      <div class="hero-reveal mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pt-10 border-t-[1.5px] border-ink">
        <div class="md:col-span-4">
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-3">
            01 — Engineer
          </p>
          <p class="font-sans text-[15px] text-text leading-relaxed">
            Yusuf Akinleye. Building backend services, APIs, and distributed
            architectures for companies scaling from pre-seed to enterprise.
          </p>
        </div>

        <div class="md:col-span-4">
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-3">
            02 — Focus
          </p>
          <p class="font-sans text-[15px] text-text leading-relaxed">
            High-throughput services in Go and Python. Event-driven systems,
            payment infrastructure, observability, and measured performance.
          </p>
        </div>

        <div class="md:col-span-4 flex flex-col gap-4">
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">
            03 — Engage
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="#work" class="btn-primary">
              View work
              <Icon name="lucide:arrow-down-right" class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink to="#contact" class="btn-secondary">
              Get in touch
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Stack strip -->
      <div class="hero-reveal mt-14 pt-8 border-t-[1.5px] border-ink">
        <div class="flex items-baseline justify-between mb-5 flex-wrap gap-4">
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
            / Primary stack
          </p>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
            07 languages, 12+ services in production
          </p>
        </div>
        <div class="flex flex-wrap gap-0 border-[1.5px] border-ink divide-x-[1.5px] divide-ink">
          <span
            v-for="(item, i) in techStack"
            :key="item"
            :class="[
              'flex-1 text-center px-4 py-4 font-mono text-xs tracking-wide',
              i % 2 === 0 ? 'bg-bg' : 'bg-bg-secondary'
            ]"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

const year = new Date().getFullYear();

const techStack = [
  "Go",
  "Python",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "Docker",
  "AWS",
];

onMounted(() => {
  const tl = gsap.timeline();

  tl.fromTo(
    ".hero-title",
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
  ).fromTo(
    ".hero-reveal",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
    "-=0.5"
  );
});
</script>
