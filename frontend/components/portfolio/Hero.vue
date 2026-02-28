<template>
  <section id="home" class="min-h-screen flex text-center items-center py-20 bg-bg border-b border-border relative overflow-hidden">
    <!-- Abstract background glow -->
    <div class="hero-bg absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none transform-origin-center">
      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-hover rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10 hero-content transform-origin-center">
      <div class="max-w-4xl mx-auto flex flex-col items-center">
        
        <!-- Status Label -->
        <div class="hero-reveal mb-8 px-4 py-2 bg-bg-secondary border border-border rounded-full flex items-center gap-3">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span class="font-sans text-[11px] font-semibold text-text uppercase tracking-widest">Available for New Projects</span>
        </div>

        <!-- Main Headline -->
        <h1 class="hero-title text-6xl md:text-7xl lg:text-8xl font-semibold text-text mb-8 leading-[1.1] tracking-tight">
          Building the <br />
          Backbone of Software.
        </h1>

        <!-- Subtext -->
        <p class="hero-reveal text-lg md:text-xl text-text-secondary mb-12 max-w-2xl font-serif">
          I am Yusuf Akinleye. I engineer high-performance backend systems and scalable APIs.
          Focused on distributed architectures that drive business growth.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-reveal flex flex-col sm:flex-row items-center gap-6 mb-20">
          <NuxtLink to="#projects" 
            class="group px-8 py-4 bg-text text-bg text-sm font-sans font-medium rounded-full hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-accent/25 hover:-translate-y-1">
            View Case Studies
            <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          
          <NuxtLink to="#contact"
            class="px-8 py-4 bg-transparent border border-border rounded-full text-text text-sm font-sans font-medium hover:border-text hover:bg-bg-secondary transition-all duration-300">
            Let's Talk
          </NuxtLink>
        </div>

        <!-- Tech Stack -->
        <div class="hero-reveal pt-10 border-t border-border mt-12 w-full">
          <p class="font-sans-label text-text-muted mb-6">Core Competencies</p>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">Go (Golang)</span>
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">Python</span>
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">PostgreSQL</span>
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">AWS</span>
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">Docker</span>
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">Microservices</span>
            <span class="text-sm font-sans font-medium text-text-secondary hover:text-accent transition-colors duration-300">REST & gRPC</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();

  // Entrance animations
  tl.fromTo('.hero-title',
    { y: 50, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.1 }
  )
  .fromTo('.hero-reveal', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
    "-=0.6"
  );

  // Parallax / Zoom scroll animations
  gsap.to('.hero-bg', {
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    scale: 0.7,
    opacity: 0,
    ease: 'none'
  });

  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    scale: 1.15,
    y: 50,
    opacity: 0,
    ease: 'none'
  });
});
</script>
