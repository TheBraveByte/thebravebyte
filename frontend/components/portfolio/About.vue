<template>
    <section id="about" class="py-32 bg-bg relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute right-0 top-1/4 w-1/3 h-1/2 bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="container mx-auto px-6 max-w-6xl relative z-10">
            
            <!-- Section Header -->
            <div class="mb-20">
                <h3 class="font-mono text-xs text-accent tracking-widest mb-4 flex items-center gap-2">
                    <span class="w-8 h-px bg-accent"></span>
                    CORE PHILOSOPHY
                </h3>
                <h2 class="section-title text-4xl md:text-5xl font-bold text-text mb-6 tracking-tight">
                    Intelligence is the <br />
                    <span class="text-text-secondary">Ability to Adapt.</span>
                </h2>
            </div>

            <div class="grid lg:grid-cols-12 gap-16 items-start">
                
                <!-- Left Column: Narrative (7 cols) -->
                <div class="lg:col-span-7 space-y-12">
                    
                    <!-- Profile Image & Bio -->
                    <div class="flex flex-col md:flex-row gap-8 items-start">
                         <div class="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-border/50">
                            <NuxtImg src="/img/yusuf.jpg" alt="Yusuf Akinleye" class="w-full h-full object-cover" />
                         </div>
                         <div class="prose prose-lg prose-invert text-text-secondary font-light leaning-relaxed">
                            <p class="about-reveal translate-y-8 opacity-0">
                                <span class="text-text font-medium">Great engineering cultures</span> don't just value the languages you know; they value the ability to acquire knowledge and apply it. 
                                I believe "genius" is often just dedication and consistency in disguise.
                            </p>
                            <p class="text-text-secondary leading-relaxed">
                                Technology is always moving. I don't just write code; I adapt. Whether it's Go, Python, or the next paradigm, I bring the dedication to learn quickly and the consistency to deliver robust, scalable systems in any environment.
                            </p>
                        </div>
                    </div>

                    <!-- Capabilities Grid -->
                    <div class="grid sm:grid-cols-2 gap-6 pt-8">
                        <div v-for="(cap, i) in capabilities" :key="i"
                            class="about-reveal translate-y-8 opacity-0 glass p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                            <h4 class="text-lg font-medium text-text mb-2">{{ cap.title }}</h4>
                            <p class="text-sm text-text-secondary leading-relaxed font-light">{{ cap.description }}</p>
                        </div>
                    </div>

                    <!-- Resume Download -->
                    <div class="about-reveal translate-y-8 opacity-0 pt-4">
                        <a href="https://drive.google.com/file/d/10n3WSqvp81oE9miaPANJV1h6U6Wi3zw7/view?usp=sharing"
                            class="inline-flex items-center gap-3 text-sm font-medium text-text hover:text-accent transition-colors pb-1 border-b border-border hover:border-accent">
                            <Icon name="lucide:download" class="w-4 h-4" />
                            <span>Download Engineering Resume</span>
                        </a>
                    </div>
                </div>

                <!-- Right Column: Philosophy Stats (5 cols) -->
                <div class="lg:col-span-5 sticky top-24">
                    <div class="glass-card p-8 rounded-3xl relative overflow-hidden">
                        <!-- Decorative Gradient -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>

                        <h3 class="font-mono text-xs text-text-muted mb-8 uppercase tracking-widest">Engineering Values</h3>

                        <div class="space-y-8">
                            <div v-for="(item, i) in philosophy" :key="i" class="about-stat translate-y-4 opacity-0 group">
                                <div class="flex justify-between items-end mb-2">
                                    <span class="text-sm font-medium text-text-secondary group-hover:text-text transition-colors">{{ item.label }}</span>
                                    <span class="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">{{ item.value }}</span>
                                </div>
                                <div class="w-full h-px bg-border group-hover:bg-accent/30 transition-colors"></div>
                                <p class="text-xs text-text-muted mt-2 leading-relaxed">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const capabilities = [
    { title: 'Backend Architecture', description: 'Designing distributed systems that handle high throughput with low latency.' },
    { title: 'API Design', description: 'Crafting intuitive, self-documenting APIs (REST & gRPC) for developer happiness.' },
    { title: 'Database Internals', description: 'Optimizing schemas and queries for data integrity and performance.' },
    { title: 'Cloud Infrastructure', description: 'Deploying immutable infrastructure with Docker and modern CI/CD.' }
];

const philosophy = [
    { label: 'Clean Code', value: 'MAINTAINABLE', description: 'Code is read more than it is written. I optimize for clarity.' },
    { label: 'Performance', value: 'EFFICIENT', description: 'Premature optimization is the root of evil. I measure first.' },
    { label: 'Reliability', value: 'ROBUST', description: 'Errors are expected. Systems must recover gracefully.' }
];

onMounted(() => {
    // Animate Text Reveals
    gsap.utils.toArray('.about-reveal').forEach((el: any) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Stagger Stats
    gsap.to('.about-stat', {
        scrollTrigger: {
            trigger: '.glass-card',
            start: 'top 80%'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
});
</script>