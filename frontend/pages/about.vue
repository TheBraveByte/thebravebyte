<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset md:grid md:grid-cols-[minmax(0,1fr)_11rem] md:gap-10">
      <div class="enter">
        <h1 class="text-[28px] font-semibold tracking-[-0.035em] md:text-[32px]">About</h1>
        <div class="mt-6 space-y-4 text-text-secondary">
          <p class="text-[17px] leading-snug text-text">
            I build reliable software for startups and businesses. Since 2019, I've built the systems
            their products depend on, and made sure they keep working as they grow.
          </p>
          <p>
            I also research AI, robotics and automation. I built a machine-learning fire detection
            system that runs on a Raspberry Pi 4.
          </p>
          <p>
            I run <a href="https://foldlabs.pro" target="_blank" rel="noopener" class="quiet-link">FoldLabs</a>,
            a small studio that designs and builds products for clients, and I'm currently learning
            <a href="https://ziglang.org/learn/" target="_blank" rel="noopener" class="quiet-link">Zig</a>.
          </p>
        </div>
      </div>
      <figure class="portrait enter mt-10 w-44 self-start md:mt-1 md:w-full" style="--i: 2">
        <span class="portrait-frame" aria-hidden="true" />
        <div class="portrait-photo">
          <Media name="yusuf-sq" alt="Yusuf Akinleye" :width="800" :height="800" :widths="[480, 800]" sizes="(min-width: 768px) 176px, 176px" eager />
        </div>
      </figure>
    </div>

    <section class="rail mt-14" aria-labelledby="experience">
      <h2 id="experience" class="rail-label" data-reveal>Where I've worked</h2>
      <ul>
        <li v-for="(r, i) in roles" :key="r.org + r.title" data-reveal :style="{ '--i': Math.min(i, 8) }" class="grid grid-cols-[6.5rem_1fr] gap-4 py-1.5 text-[15px] sm:grid-cols-[7.5rem_1fr]">
          <span class="pt-1 font-mono text-[12px] tabular-nums text-text-muted">{{ r.when }}</span>
          <span class="text-text">{{ r.title }}, <span class="text-text-secondary">{{ r.org }}</span></span>
        </li>
      </ul>
    </section>

    <section class="rail mt-10" aria-labelledby="education">
      <h2 id="education" class="rail-label" data-reveal>Education</h2>
      <p data-reveal style="--i: 1" class="grid grid-cols-[6.5rem_1fr] gap-4 py-1.5 text-[15px] sm:grid-cols-[7.5rem_1fr]">
        <span class="pt-1 font-mono text-[12px] tabular-nums text-text-muted">2018 to 2024</span>
        <span class="text-text">B.Eng. Electrical and Electronics Engineering, <span class="text-text-secondary">University of Ilorin</span></span>
      </p>
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
]

useSeoMeta({
  title: 'About | Yusuf Akinleye',
  description: 'I build reliable software for startups and businesses.',
})
</script>

<style scoped>
/* Square, grey portrait on the right. On hover an orange line scans down it once, like a
   sensor sweep, while the photo eases in and its offset frame steps out. */
.portrait { position: relative; }
.portrait-frame {
  position: absolute; inset: 0; border: 1px solid var(--color-border); border-radius: 6px;
  transform: translate(8px, 8px); transition: transform 500ms var(--ease-out), border-color 300ms ease;
}
.portrait-photo { position: relative; aspect-ratio: 1; overflow: hidden; border-radius: 6px; background: var(--color-bg-secondary); }
.portrait-photo :deep(img) { transition: transform 900ms var(--ease-out); }
.portrait-photo::after {
  content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px;
  background: var(--color-accent); box-shadow: 0 0 12px var(--color-accent);
  opacity: 0; transform: translateY(-4px); pointer-events: none;
}
@media (hover: hover) and (pointer: fine) {
  .portrait:hover .portrait-frame { transform: translate(12px, 12px); border-color: var(--color-accent); }
  .portrait:hover .portrait-photo :deep(img) { transform: scale(1.04); }
  .portrait:hover .portrait-photo::after { animation: scan 1100ms var(--ease-out) forwards; }
}
@keyframes scan {
  0% { opacity: 0; transform: translateY(-4px); }
  10% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translateY(var(--scan-end, 176px)); }
}
@media (prefers-reduced-motion: reduce) {
  .portrait-frame, .portrait-photo :deep(img) { transition: none; }
  .portrait:hover .portrait-photo::after { animation: none; }
}
</style>
