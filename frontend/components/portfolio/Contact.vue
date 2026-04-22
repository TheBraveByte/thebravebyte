<template>
  <section id="contact" class="py-24 bg-bg">
    <div class="container mx-auto px-6">
      <!-- Section marker -->
      <div class="flex items-baseline justify-between mb-14 pb-4 border-b-[1.5px] border-ink flex-wrap gap-4">
        <div>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-2">
            § 05 / Contact
          </p>
          <h2 class="font-serif text-4xl md:text-6xl text-text leading-none">
            Let's build<br /><em class="italic text-text-secondary">something robust.</em>
          </h2>
        </div>
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] max-w-xs md:text-right">
          Open to contract, full-time,<br />and advisory engagements.
        </p>
      </div>

      <div class="grid md:grid-cols-2 border-[1.5px] border-ink">
        <a
          href="mailto:ayaaakinleye@gmail.com"
          class="contact-reveal group flex flex-col justify-between gap-10 p-10 md:border-r-[1.5px] border-b md:border-b-0 border-ink hover:bg-bg-secondary transition-colors"
        >
          <div>
            <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-3">
              01 — Direct line
            </p>
            <p class="font-serif text-3xl md:text-4xl text-text leading-tight">
              ayaaakinleye<span class="text-text-muted">@</span>gmail.com
            </p>
          </div>
          <div class="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            <span>Typical reply · 24h</span>
            <Icon name="lucide:arrow-up-right" class="w-5 h-5 text-text group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </a>

        <a
          href="https://contra.com/yusuf_akinleye_bb35981b4"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-reveal group flex flex-col justify-between gap-10 p-10 hover:bg-bg-secondary transition-colors"
        >
          <div>
            <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-3">
              02 — Contract &amp; hire
            </p>
            <p class="font-serif text-3xl md:text-4xl text-text leading-tight">
              Profile on Contra
            </p>
          </div>
          <div class="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            <span>Engagement tiers · availability</span>
            <Icon name="lucide:arrow-up-right" class="w-5 h-5 text-text group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </a>
      </div>

      <!-- Network row -->
      <div class="mt-10">
        <div class="flex items-center justify-between mb-4">
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
            / Elsewhere on the network
          </p>
          <div class="hidden md:block flex-1 mx-6 nb-ticks"></div>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
            {{ contacts.length }} endpoints
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 border-[1.5px] border-ink">
          <a
            v-for="(contact, i) in contacts"
            :key="contact.name"
            :href="contact.href"
            :target="contact.target"
            :rel="contact.rel"
            :class="[
              'contact-reveal group flex items-center justify-between px-5 py-5 hover:bg-bg-secondary transition-colors',
              i < contacts.length - 1 ? 'border-r-[1.5px] border-ink' : '',
            ]"
          >
            <span class="font-serif text-lg text-text">{{ contact.name }}</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-text-muted group-hover:text-text transition-colors" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const contacts = [
  { name: 'GitHub', href: 'https://github.com/TheBraveByte', target: '_blank', rel: 'noopener noreferrer' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/', target: '_blank', rel: 'noopener noreferrer' },
  { name: 'X / Twitter', href: 'https://x.com/thebravebyte', target: '_blank', rel: 'noopener noreferrer' },
  { name: 'Writing', href: 'https://ayaacodes.hashnode.dev', target: '_blank', rel: 'noopener noreferrer' },
];

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    '.contact-reveal',
    { y: 20, opacity: 0 },
    {
      scrollTrigger: { trigger: '#contact', start: 'top 85%' },
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power3.out',
    }
  );
});
</script>
