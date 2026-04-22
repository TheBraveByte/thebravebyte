<template>
  <section id="skills" class="py-24 bg-bg border-b-[1.5px] border-ink">
    <div class="container mx-auto px-6">
      <!-- Section marker -->
      <div class="flex items-baseline justify-between mb-14 pb-4 border-b-[1.5px] border-ink flex-wrap gap-4">
        <div>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-2">
            § 02 / Toolkit
          </p>
          <h2 class="font-serif text-4xl md:text-6xl text-text leading-none">
            A quiet stack,<br /><em class="italic text-text-secondary">picked on purpose.</em>
          </h2>
        </div>
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] max-w-xs md:text-right">
          Depth &gt; breadth. The tools change;<br />the principles don't.
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <!-- Skills list -->
        <div class="lg:col-span-8">
          <div class="border-[1.5px] border-ink">
            <div class="grid grid-cols-[auto_1fr_auto] px-5 py-3 border-b-[1.5px] border-ink bg-bg-secondary font-mono text-[10px] text-text uppercase tracking-[0.22em] gap-6">
              <span>#</span>
              <span>Tool</span>
              <span>Use</span>
            </div>
            <ul class="divide-y-[1.5px] divide-ink">
              <li
                v-for="(skill, i) in skills"
                :key="skill.name"
                class="skill-item grid grid-cols-[auto_1fr_auto] gap-6 px-5 py-4 items-center hover:bg-bg-secondary transition-colors"
              >
                <span class="font-mono text-[11px] text-text-muted w-8">
                  {{ (i + 1).toString().padStart(2, '0') }}
                </span>
                <span class="font-serif text-lg text-text">{{ skill.name }}</span>
                <span class="font-mono text-[11px] text-text-muted uppercase tracking-[0.18em]">
                  {{ skill.category }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Side context -->
        <aside class="lg:col-span-4 space-y-6">
          <div class="border-[1.5px] border-ink p-6">
            <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-3">
              Full-stack context
            </p>
            <p class="font-serif text-xl text-text leading-snug mb-3">
              Backend-first, full-stack fluent.
            </p>
            <p class="font-sans text-sm text-text-secondary leading-relaxed">
              Go and Python carry the weight. Typescript/Vue/React where the
              work crosses the wire — enough to keep type safety and
              architecture coherent end-to-end.
            </p>
          </div>
          <div class="border-[1.5px] border-ink p-6 bg-ink text-bg">
            <p class="font-mono text-[10px] uppercase tracking-[0.22em] mb-3 opacity-70">
              Continuous evolution
            </p>
            <p class="font-serif text-xl leading-snug mb-3">
              Tools change. Principles endure.
            </p>
            <p class="font-sans text-sm leading-relaxed opacity-80">
              Go for concurrency, Python for ML, Rust when it earns its weight.
              I pick the right primitive for the problem, not the other way
              around.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const skills = [
  { name: 'Go (Golang)', category: 'Backend core' },
  { name: 'Python', category: 'Data · ML' },
  { name: 'PostgreSQL', category: 'Relational' },
  { name: 'MongoDB', category: 'Document' },
  { name: 'Redis', category: 'Cache · Queues' },
  { name: 'Kafka', category: 'Event streams' },
  { name: 'gRPC', category: 'RPC / APIs' },
  { name: 'Docker', category: 'Containers' },
  { name: 'AWS', category: 'Cloud infra' },
  { name: 'ClickHouse', category: 'OLAP' },
  { name: 'Linux', category: 'Runtime' },
  { name: 'Git', category: 'Versioning' },
];

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    '.skill-item',
    { y: 14, opacity: 0 },
    {
      scrollTrigger: { trigger: '#skills', start: 'top 85%' },
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.out',
    }
  );
});
</script>
