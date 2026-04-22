<template>
  <section id="about" class="py-24 bg-bg border-b-[1.5px] border-ink">
    <div class="container mx-auto px-6">
      <!-- Section marker -->
      <div class="flex items-baseline justify-between mb-14 pb-4 border-b-[1.5px] border-ink flex-wrap gap-4">
        <div>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-2">
            § 01 / About
          </p>
          <h2 class="font-serif text-4xl md:text-6xl text-text leading-none">
            Engineer, adapter, operator.
          </h2>
        </div>
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
          Currently in Lagos → Rexall
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <!-- Narrative -->
        <div class="lg:col-span-8 space-y-10">
          <!-- Portrait panel -->
          <figure class="about-reveal border-[1.5px] border-ink bg-bg-secondary">
            <div class="flex flex-col md:flex-row">
              <div class="relative md:w-[260px] md:border-r-[1.5px] border-ink overflow-hidden">
                <img
                  src="/img/yusuf.jpg"
                  alt="Yusuf Akinleye"
                  class="w-full h-full object-cover grayscale"
                />
              </div>
              <figcaption class="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
                <div>
                  <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-3">
                    File · Operator profile
                  </p>
                  <p class="font-serif text-2xl md:text-[1.65rem] text-text leading-snug">
                    “Great engineering cultures don't just value the languages
                    you know — they value the ability to acquire knowledge and
                    apply it.”
                  </p>
                </div>
                <dl class="grid grid-cols-2 gap-4 text-[11px] font-mono uppercase tracking-[0.18em]">
                  <div>
                    <dt class="text-text-muted">Role</dt>
                    <dd class="text-text mt-1 normal-case tracking-normal font-sans text-sm">Software Engineer</dd>
                  </div>
                  <div>
                    <dt class="text-text-muted">Stack</dt>
                    <dd class="text-text mt-1 normal-case tracking-normal font-sans text-sm">Go · Python</dd>
                  </div>
                  <div>
                    <dt class="text-text-muted">Born</dt>
                    <dd class="text-text mt-1 normal-case tracking-normal font-sans text-sm">Nigeria</dd>
                  </div>
                  <div>
                    <dt class="text-text-muted">Years</dt>
                    <dd class="text-text mt-1 normal-case tracking-normal font-sans text-sm">5+ in production</dd>
                  </div>
                </dl>
              </figcaption>
            </div>
          </figure>

          <div class="about-reveal space-y-6 max-w-2xl">
            <p class="font-serif text-xl md:text-2xl text-text leading-snug">
              I engineer backend services that do what they say on the tin —
              return predictable results, fail loudly when they can't, and stay
              cheap to operate under load.
            </p>
            <p class="font-sans text-[15px] text-text-secondary leading-relaxed">
              My work sits close to the database and the network: queues,
              payments, idempotency, observability, and the careful choices
              between throughput and correctness. I treat &quot;genius&quot; as
              dedication in disguise — pick the right primitive, document the
              trade-off, measure the outcome.
            </p>
          </div>

          <!-- Capabilities ledger -->
          <div class="about-reveal border-[1.5px] border-ink">
            <div class="flex items-center justify-between px-5 py-3 border-b-[1.5px] border-ink bg-bg-secondary">
              <p class="font-mono text-[10px] text-text uppercase tracking-[0.22em]">
                Capabilities
              </p>
              <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
                04 lines
              </p>
            </div>
            <ul class="divide-y-[1.5px] divide-ink">
              <li
                v-for="(cap, i) in capabilities"
                :key="cap.title"
                class="grid grid-cols-[auto_1fr_2fr] gap-6 px-5 py-5 items-baseline"
              >
                <span class="font-mono text-[11px] text-text-muted">
                  0{{ i + 1 }}
                </span>
                <span class="font-serif text-lg text-text">
                  {{ cap.title }}
                </span>
                <span class="font-sans text-sm text-text-secondary leading-relaxed">
                  {{ cap.description }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Resume -->
          <div class="about-reveal">
            <a
              href="https://drive.google.com/file/d/13GTqHs-pQZamtD9SI3-Qth8Y1hg9C2nH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
            >
              Download résumé
              <Icon name="lucide:arrow-down" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Side panel: principles -->
        <aside class="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div class="border-[1.5px] border-ink">
            <div class="px-5 py-3 border-b-[1.5px] border-ink bg-ink text-bg">
              <p class="font-mono text-[10px] uppercase tracking-[0.22em]">
                / Engineering principles
              </p>
            </div>
            <ul class="divide-y-[1.5px] divide-ink">
              <li
                v-for="item in philosophy"
                :key="item.label"
                class="about-stat px-5 py-5"
              >
                <div class="flex items-baseline justify-between mb-2">
                  <span class="font-serif text-lg text-text">{{ item.label }}</span>
                  <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.18em]">
                    {{ item.value }}
                  </span>
                </div>
                <p class="font-sans text-sm text-text-secondary leading-relaxed">
                  {{ item.description }}
                </p>
              </li>
            </ul>
          </div>
          <div class="nb-ticks w-full"></div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const capabilities = [
  { title: 'Backend architecture', description: 'Distributed services that handle high throughput with predictable tail latency.' },
  { title: 'API design', description: 'Versioned, self-documenting APIs over REST and gRPC, built around the caller.' },
  { title: 'Data systems', description: 'Schema design, query optimization, and idempotent pipelines that preserve integrity.' },
  { title: 'Cloud infrastructure', description: 'Immutable deployments with Docker, CI/CD, and observability from day one.' },
];

const philosophy = [
  { label: 'Clean code', value: 'Read ≫ Write', description: 'Code is read more than it is written. Clarity compounds over time.' },
  { label: 'Performance', value: 'Measure first', description: 'Premature optimization is taxation on readers. Measure, then optimize.' },
  { label: 'Reliability', value: 'Fail loudly', description: 'Errors are expected. Systems should recover gracefully and fail predictably.' },
];

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 24, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  });

  gsap.fromTo(
    '.about-stat',
    { y: 20, opacity: 0 },
    {
      scrollTrigger: { trigger: '#about aside', start: 'top 88%' },
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
    }
  );
});
</script>
