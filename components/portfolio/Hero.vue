<template>
  <section id="home" class="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-bg">
    <!-- Premium Ambient Background -->
    <div class="absolute inset-0 pointer-events-none">
       <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-pulse-slow"></div>
       <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px] animate-pulse-slow delay-700"></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Status Badge -->
        <div class="hero-reveal opacity-0 translate-y-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border mb-8">
           <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
           <span class="font-mono text-xs font-medium text-text-secondary tracking-wide">AVAILABLE FOR NEW PROJECTS</span>
        </div>

        <!-- Main Headline -->
        <h1 class="hero-reveal opacity-0 translate-y-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text mb-8 leading-[1.1]">
          Building the <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-text via-text-secondary to-text-muted">
            Backbone of Software
          </span>
        </h1>

        <!-- Subtext -->
        <p class="hero-reveal opacity-0 translate-y-4 text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-2xl mx-auto mb-12">
          I am <span class="text-text font-medium">Yusuf Akinleye</span>. I engineer high-performance backend systems and scalable APIs.
          <br class="hidden md:block" />
          Focused on distributed architectures that drive business growth.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-reveal opacity-0 translate-y-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <NuxtLink to="#projects" 
            class="group relative px-8 py-4 bg-text text-bg rounded-full text-sm font-medium hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]">
            <span>View Case Studies</span>
            <Icon name="lucide:arrow-right" class="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          
          <NuxtLink to="#contact"
            class="px-8 py-4 rounded-full border border-border text-text text-sm font-medium hover:bg-bg-secondary transition-colors duration-300">
            Let's Talk
          </NuxtLink>
        </div>

        <!-- Tech Stack Scroller -->
        <div class="hero-reveal opacity-0 pt-8 border-t border-border/50">
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-6">Create with the best tools</p>
          <div class="flex flex-wrap justify-center gap-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <Icon name="logos:go" class="w-8 h-8" />
             <Icon name="logos:python" class="w-8 h-8" />
             <Icon name="logos:postgresql" class="w-8 h-8" />
             <Icon name="logos:docker-icon" class="w-8 h-8" />
             <Icon name="logos:aws" class="w-8 h-8" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
  const tl = gsap.timeline();

  tl.to('.hero-reveal', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.2
  });
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}
</style>