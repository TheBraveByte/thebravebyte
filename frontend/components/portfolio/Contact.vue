<template>
  <section id="contact" class="py-24 bg-bg">
    <div class="container mx-auto px-6 max-w-4xl relative z-10">
      
      <!-- Section Header -->
      <div class="section-header mb-16 text-center border-b-2 border-accent/30 pb-8 origin-center">
        <h3 class="font-sans-label text-accent mb-3 flex items-center justify-center gap-2">
          <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          CONNECT
        </h3>
        <h2 class="text-4xl md:text-5xl font-semibold text-text mb-6">
          Get in <span class="text-accent">Touch</span>
        </h2>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto">
          Available for new projects, technical consulting, and collaborative engineering.
        </p>
      </div>

      <!-- Main Actions -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <!-- Email Action -->
        <a href="mailto:ayaaakinleye@gmail.com"
          class="contact-reveal group flex flex-col items-center justify-center p-12 bg-bg border border-border rounded-2xl hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
          <div class="p-4 bg-bg-secondary rounded-full mb-6 group-hover:bg-accent group-hover:text-white text-text-secondary transition-colors duration-300">
            <Icon name="lucide:mail" class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-text mb-2 text-xl group-hover:text-accent transition-colors">Direct Email</h3>
          <p class="text-sm font-sans text-text-secondary">ayaaakinleye@gmail.com</p>
        </a>

        <!-- Contra Action -->
        <a href="https://contra.com/yusuf_akinleye_bb35981b4" target="_blank"
          class="contact-reveal group flex flex-col items-center justify-center p-12 bg-bg border border-border rounded-2xl hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
          <div class="p-4 bg-bg-secondary rounded-full mb-6 group-hover:bg-accent group-hover:text-white text-text-secondary transition-colors duration-300">
            <Icon name="lucide:briefcase" class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-text mb-2 text-xl group-hover:text-accent transition-colors">Contract & Hire</h3>
          <p class="text-sm font-sans text-text-secondary">View Profile on Contra</p>
        </a>
      </div>

      <!-- Network Links -->
      <div class="flex flex-wrap justify-center gap-6 pt-8">
        <a v-for="contact in contacts" :key="contact.name" :href="contact.href" :target="contact.target"
          :rel="contact.rel"
          class="contact-reveal group flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-bg-secondary text-sm font-sans text-text-secondary hover:text-text hover:border-accent hover:bg-accent/5 transition-all duration-300">
          <Icon :name="contact.icon" class="w-4 h-4 group-hover:text-accent transition-colors" />
          <span class="font-medium tracking-wide">{{ contact.name }}</span>
        </a>
      </div>

    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const contacts = [
  {
    name: 'GitHub',
    icon: 'devicon:github',
    href: 'https://github.com/TheBraveByte',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'LinkedIn',
    icon: 'devicon:linkedin',
    href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'X (Twitter)',
    icon: 'simple-icons:x',
    href: 'https://x.com/thebravebyte',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'Blog',
    icon: 'simple-icons:hashnode',
    href: 'https://ayaacodes.hashnode.dev',
    target: '_blank',
    rel: 'noopener noreferrer'
  }
];

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo('#contact .section-header', 
      { y: 50, opacity: 0, scale: 0.95 },
      {
          scrollTrigger: {
              trigger: '#contact',
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none'
      }
  );

  gsap.fromTo('.contact-reveal', 
    { y: 40, opacity: 0, scale: 0.95 },
    {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%',
      },
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)'
    }
  );
});
</script>
