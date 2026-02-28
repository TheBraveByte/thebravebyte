<template>
    <section id="about" class="py-24 bg-bg border-b border-border">
        <div class="container mx-auto px-6 relative z-10">
            
            <!-- Section Header -->
            <div class="section-header mb-16 border-b border-border pb-6 origin-left">
                <h3 class="font-sans-label text-accent mb-2">
                    CORE PHILOSOPHY
                </h3>
                <h2 class="text-4xl md:text-5xl font-semibold text-text tracking-tight">
                    Intelligence is the Ability to <span class="text-accent">Adapt.</span>
                </h2>
            </div>

            <div class="grid lg:grid-cols-12 gap-16 items-start">
                
                <!-- Left Column: Narrative (7 cols) -->
                <div class="lg:col-span-8 space-y-12">
                    
                    <!-- Bio -->
                    <div class="prose prose-lg text-text-secondary leading-relaxed relative">
                        <!-- Floating Image -->
                        <figure class="about-reveal float-right ml-8 mb-6 w-48 md:w-56 group">
                            <div class="overflow-hidden border border-border rounded-sm shadow-sm bg-bg-secondary">
                                <img src="/img/yusuf.jpg" alt="Yusuf Akinleye" class="w-full grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                            </div>
                            <figcaption class="mt-3 text-[10px] font-sans text-text-muted text-center uppercase tracking-widest border-b border-border pb-2">
                                Yusuf Akinleye, Software Engineer
                            </figcaption>
                        </figure>

                        <p class="about-reveal text-xl text-text font-medium mb-6">
                            Great engineering cultures don't just value the languages you know; they value the ability to acquire knowledge and apply it. I believe "genius" is often just dedication and consistency in disguise.
                        </p>
                        <p class="about-reveal mt-4">
                            Technology is always moving. I don't just write code; I adapt. Whether it's Go, Python, or the next paradigm, I bring the dedication to learn quickly and the consistency to deliver robust, scalable systems in any environment.
                        </p>
                        <div class="clear-both"></div>
                    </div>

                    <!-- Capabilities List -->
                    <div class="pt-8">
                        <h4 class="font-sans-label text-text-muted mb-6 border-b border-border pb-2">Capabilities</h4>
                        <div class="space-y-6">
                            <div v-for="(cap, i) in capabilities" :key="i" class="about-reveal group grid sm:grid-cols-3 gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-bg-secondary transition-all duration-300">
                                <div class="col-span-1 flex items-center gap-3">
                                    <div class="w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                                    <h4 class="text-base font-semibold text-text group-hover:text-accent transition-colors">{{ cap.title }}</h4>
                                </div>
                                <div class="col-span-2">
                                    <p class="text-sm text-text-secondary">{{ cap.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resume Download -->
                    <div class="about-reveal pt-8 mt-8 border-t border-border">
                        <a href="https://drive.google.com/file/d/13GTqHs-pQZamtD9SI3-Qth8Y1hg9C2nH/view?usp=sharing"
                            class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border text-sm font-sans font-medium text-text hover:bg-text hover:text-bg transition-all duration-300 group">
                            <Icon name="lucide:arrow-down-to-line" class="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                            <span>Download Engineering Resume</span>
                        </a>
                    </div>
                </div>

                <!-- Right Column: Philosophy Sidebar (4 cols) -->
                <div class="lg:col-span-4 sticky top-24">
                    <div class="p-8 rounded-2xl bg-bg border border-border">
                        <h3 class="font-sans-label text-text-muted mb-6">Engineering Values</h3>

                        <div class="space-y-8">
                            <div v-for="(item, i) in philosophy" :key="i" class="about-stat group">
                                <div class="mb-3 flex items-center justify-between">
                                    <span class="text-sm font-semibold text-text group-hover:text-accent transition-colors">{{ item.label }}</span>
                                    <span class="font-sans text-[10px] text-accent bg-accent/10 px-2 py-1 rounded-full uppercase tracking-wide">
                                        {{ item.value }}
                                    </span>
                                </div>
                                <p class="text-sm text-text-secondary leading-relaxed">
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
    { label: 'Clean Code', value: 'Maintainable', description: 'Code is read more than it is written. I optimize for clarity and simplicity.' },
    { label: 'Performance', value: 'Efficient', description: 'Premature optimization is the root of evil. I measure first, optimize later.' },
    { label: 'Reliability', value: 'Robust', description: 'Errors are expected. Systems must recover gracefully and fail predictably.' }
];

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('#about .section-header', 
        { y: 50, opacity: 0, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: '#about',
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

    gsap.utils.toArray('.about-reveal').forEach((el: any) => {
        gsap.fromTo(el, 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }
        );
    });

    gsap.fromTo('.about-stat', 
        { y: 30, opacity: 0, x: 20 },
        {
            scrollTrigger: {
                trigger: '.lg\\:col-span-4',
                start: 'top 85%',
            },
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.2)'
        }
    );
});
</script>
