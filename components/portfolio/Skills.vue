<template>
    <section id="skills" class="py-32 bg-bg relative">
        <div class="container mx-auto px-6 max-w-6xl relative z-10">
            
            <!-- Section Header -->
            <div class="mb-20">
                <h3 class="font-mono text-xs text-accent tracking-widest mb-4 flex items-center gap-2">
                    <span class="w-8 h-px bg-accent"></span>
                    TECHNICAL PROFICIENCY
                </h3>
                <h2 class="section-title text-4xl md:text-5xl font-bold text-text mb-6">
                    Core Technologies
                </h2>
            </div>
            
            <div class="grid lg:grid-cols-12 gap-12 items-start">
                
                <!-- Left Column: Skills Grid (7 cols) -->
                <div class="lg:col-span-7">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div v-for="(skill, i) in skills" :key="i"
                            class="skill-card opacity-0 translate-y-4 group p-4 rounded-xl border border-border/50 bg-bg-secondary/30 hover:bg-bg-secondary hover:border-accent/30 transition-all duration-300">
                             
                             <div class="flex items-center gap-3 mb-3">
                                <Icon :name="skill.icon" class="w-6 h-6 text-text-muted group-hover:text-accent transition-colors" />
                                <span class="text-sm font-medium text-text">{{ skill.name }}</span>
                             </div>
                             
                             <div class="w-full bg-border h-1 rounded-full overflow-hidden">
                                <div class="h-full bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                             </div>
                             
                             <p class="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {{ skill.category }}
                             </p>

                        </div>
                    </div>
                </div>

                <!-- Right Column: Context/Philosophy (5 cols) -->
                <div class="lg:col-span-5 sticky top-24">
                    <div class="glass p-8 rounded-3xl relative overflow-hidden">
                         <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>
                         
                         <div class="flex items-start gap-4 mb-6">
                            <div class="p-3 rounded-full bg-accent/10 text-accent">
                                <Icon name="lucide:layers" class="w-6 h-6" />
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-text mb-1">Full-Stack Mastery</h3>
                                <p class="text-xs font-mono text-text-secondary">DEPTH_OVER_BREADTH</p>
                            </div>
                         </div>

                         <p class="text-text-secondary leading-relaxed mb-6 font-light">
                            My stack is chosen for <span class="text-text font-medium">performance</span> and <span class="text-text font-medium">scalability</span>. 
                            While I specialize in Go and Python for the backend, I maintain full proficiency in modern frontend frameworks to ensure end-to-end type safety and architectural consistency.
                         </p>

                         <div class="p-4 rounded-xl bg-bg/50 border border-border/50">
                            <h4 class="font-mono text-xs text-accent uppercase tracking-wide mb-2">Continuous Evolution</h4>
                            <p class="text-sm text-text-muted">
                                Tools change. Principles endure. I pick the right tool for the job—whether it's Go for concurrency, Python for ML, or the next breakthrough technology.
                            </p>
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

const skills = [
    { name: 'Go (Golang)', icon: 'logos:go', category: 'Backend Performance' },
    { name: 'Python', icon: 'logos:python', category: 'Data & ML' },
    { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'Relational DB' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon', category: 'NoSQL DB' },
    { name: 'Docker', icon: 'logos:docker-icon', category: 'Containerization' },
    { name: 'AWS', icon: 'logos:aws', category: 'Cloud Infra' },
    { name: 'gRPC', icon: 'logos:grpc', category: 'High-Perf API' },
    { name: 'Redis', icon: 'logos:redis', category: 'Caching' },
    { name: 'ClickHouse', icon: 'logos:clickhouse', category: 'OLAP DB' },
    { name: 'Kafka', icon: 'logos:kafka-icon', category: 'Event Streaming' },
    { name: 'Git', icon: 'logos:git-icon', category: 'Version Control' },
    { name: 'VPS Hostinger', icon: 'lucide:server', category: 'Infrastructure' }
];

onMounted(() => {
    gsap.to('.skill-card', {
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%'
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.2)'
    });
});
</script>
