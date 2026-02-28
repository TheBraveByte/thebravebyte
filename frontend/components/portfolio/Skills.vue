<template>
    <section id="skills" class="py-24 bg-bg border-b border-border">
        <div class="container mx-auto px-6 relative z-10">
            
            <!-- Section Header -->
            <div class="section-header mb-16 border-b border-border pb-6 origin-left">
                <h3 class="font-sans-label text-text-muted mb-2">
                    TECHNICAL PROFICIENCY
                </h3>
                <h2 class="text-4xl md:text-5xl font-semibold text-text tracking-tight">
                    Core Technologies
                </h2>
            </div>
            
            <div class="grid lg:grid-cols-12 gap-12 items-start">
                
                <!-- Left Column: Skills Grid (8 cols) -->
                <div class="lg:col-span-8">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div v-for="(skill, i) in skills" :key="i"
                            class="skill-item flex items-center justify-between p-4 rounded-xl border border-border bg-bg hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                             
                             <div class="flex items-center gap-3">
                                <Icon :name="skill.icon" class="w-6 h-6 text-text-secondary group-hover:text-accent transition-colors duration-300" />
                                <span class="font-sans text-sm font-medium text-text">{{ skill.name }}</span>
                             </div>
                             
                        </div>
                    </div>
                </div>

                <!-- Right Column: Context/Philosophy (4 cols) -->
                <div class="lg:col-span-4 sticky top-24 border-l border-border pl-8">
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-text mb-2 border-b border-border pb-2">Full-Stack Context</h3>
                        <p class="text-sm font-sans text-text-secondary mt-2 uppercase tracking-wide">Depth Over Breadth</p>
                    </div>

                    <p class="text-base text-text-secondary leading-relaxed mb-6">
                        My stack is chosen for performance and scalability. While I specialize in Go and Python for the backend, I maintain full proficiency in modern frontend frameworks to ensure end-to-end type safety and architectural consistency.
                    </p>

                    <div class="pt-6 border-t border-border mt-8">
                        <h4 class="font-sans text-xs text-text uppercase tracking-wider mb-3">Continuous Evolution</h4>
                        <p class="text-sm text-text-secondary leading-relaxed">
                            Tools change. Principles endure. I pick the right tool for the job—whether it's Go for concurrency, Python for ML, or the next breakthrough technology.
                        </p>
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

const skills = [
    { name: 'Go (Golang)', icon: 'logos:go', category: 'Backend' },
    { name: 'Python', icon: 'logos:python', category: 'Data & ML' },
    { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'RDBMS' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon', category: 'NoSQL' },
    { name: 'Docker', icon: 'logos:docker-icon', category: 'Containers' },
    { name: 'AWS', icon: 'logos:aws', category: 'Cloud Infra' },
    { name: 'gRPC', icon: 'logos:grpc', category: 'API' },
    { name: 'Redis', icon: 'logos:redis', category: 'Caching' },
    { name: 'ClickHouse', icon: 'logos:clickhouse', category: 'OLAP DB' },
    { name: 'Kafka', icon: 'logos:kafka-icon', category: 'Events' },
    { name: 'Git', icon: 'logos:git-icon', category: 'VCS' },
    { name: 'Linux', icon: 'lucide:server', category: 'Infrastructure' }
];

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('#skills .section-header', 
        { y: 50, opacity: 0, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: '#skills',
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

    gsap.fromTo('.skill-item', 
        { y: 30, opacity: 0, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.2)'
        }
    );
});
</script>
