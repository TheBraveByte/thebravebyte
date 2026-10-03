<template>
  <div class="page pt-14 md:pt-20">
    <h1 class="sr-only">About</h1>
    <!-- The portrait sits in the label rail, the column every section name uses, so the
         page reads as one grid rather than a profile card. -->
    <section class="rail" aria-label="About Yusuf Akinleye">
      <figure class="portrait-wrap enter mb-8 flex items-end gap-4 md:mb-0 md:block">
        <div class="portrait w-24 shrink-0 md:w-full">
          <span class="portrait-frame" aria-hidden="true" />
          <div class="portrait-photo">
            <Media name="yusuf-sq" alt="Yusuf Akinleye" :width="800" :height="800" :widths="[480, 800]" sizes="(min-width: 768px) 144px, 96px" eager />
          </div>
        </div>
        <figcaption class="font-mono text-[13px] leading-snug text-text-muted md:mt-5">Yusuf<br class="md:hidden"> Akinleye</figcaption>
      </figure>
      <div class="enter space-y-4 text-text-secondary" style="--i: 2">
        <p class="text-[20px] leading-snug tracking-[-0.01em] text-text md:text-[22px]">
          For startups and businesses, I build the part of a product people never see, and I build
          it to hold up when things go wrong.
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
    </section>

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
  description: 'For startups and businesses, I build the part of a product people never see, and I build it to hold up when things go wrong.',
})
</script>

<style scoped>
/* Square, grey portrait in the label rail. On hover an orange line scans down it once, like a
   sensor sweep, while the photo eases in and its offset frame steps out. */
.portrait { position: relative; }
.portrait-frame {
  position: absolute; inset: 0; border: 1px solid var(--color-border); border-radius: 6px;
  transform: translate(8px, 8px); transition: transform 500ms var(--ease-out), border-color 300ms ease;
}
.portrait-photo { position: relative; aspect-ratio: 1; overflow: hidden; border-radius: 6px; background: var(--color-bg-secondary); }
.portrait-photo :deep(img) { transition: transform 900ms var(--ease-out); }
.portrait-photo::after {
  /* Full-height layer with the scan line on its bottom edge and a faint trail above it;
     sliding the layer moves the line from the top of the photo to the bottom. */
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to bottom, transparent 70%, color-mix(in srgb, var(--color-accent) 18%, transparent) calc(100% - 2px), var(--color-accent) calc(100% - 2px));
  opacity: 0; transform: translateY(-100%);
}
@media (hover: hover) and (pointer: fine) {
  .portrait:hover .portrait-frame { transform: translate(12px, 12px); border-color: var(--color-accent); }
  .portrait:hover .portrait-photo :deep(img) { transform: scale(1.04); }
  .portrait:hover .portrait-photo::after { animation: scan 1100ms var(--ease-out) forwards; }
}
@keyframes scan {
  0% { opacity: 0; transform: translateY(-100%); }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { opacity: 0; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .portrait-frame, .portrait-photo :deep(img) { transition: none; }
  .portrait:hover .portrait-photo::after { animation: none; }
}
</style>
