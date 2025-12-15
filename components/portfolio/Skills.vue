<template>
    <section id="skills" class="py-24 bg-bg relative">
        <div class="container mx-auto px-6 max-w-6xl relative z-10">
            
            <!-- Section Header -->
            <div class="mb-16 flex items-end justify-between border-b border-border pb-6">
                <div>
                    <h3 class="font-mono-label text-text-secondary mb-2 flex items-center gap-2">
                        <span class="w-2 h-2 bg-accent"></span>
                        SYSTEM_TOOLKIT
                    </h3>
                    <h2 class="text-3xl md:text-4xl font-light text-text">
                        Core Stack
                    </h2>
                </div>
                <div class="hidden md:block font-mono text-xs text-text-secondary text-right">
                    <div>MODULES_LOADED: {{ skills.length }}</div>
                    <div>OPTIMIZED_FOR: PERFORMANCE</div>
                </div>
            </div>

            <!-- Skills Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div v-for="skill in skills" :key="skill.name"
                    class="group relative bg-bg border border-border p-4 hover:border-accent transition-colors duration-200 flex flex-col items-center justify-center gap-3 h-[140px]">
                    
                    <!-- Technical Corners -->
                    <div class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-transparent group-hover:border-accent transition-colors duration-200"></div>
                    <div class="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-transparent group-hover:border-accent transition-colors duration-200"></div>

                    <div class="w-10 h-10 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                        <Icon :name="skill.icon" class="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" />
                    </div>
                    
                    <div class="text-center">
                        <h3 class="font-mono text-xs text-text mb-1">{{ skill.name }}</h3>
                        <p class="font-mono text-[10px] text-text-secondary uppercase tracking-wider">{{ skill.category }}</p>
                    </div>

                    <!-- Status Indicator -->
                    <div v-if="skill.learning" class="absolute top-2 right-2 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>

            <!-- Additional Info Box -->
            <div class="mt-16 border border-dashed border-border p-6 bg-bg-secondary">
                <div class="flex items-start gap-4">
                    <div class="p-2 border border-border bg-bg">
                        <Icon name="lucide:zap" class="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 class="font-mono text-sm text-text mb-2 uppercase tracking-wide">Future-Proof Engineering</h3>
                        <p class="text-sm text-text-secondary leading-relaxed font-light max-w-3xl">
                            My commitment to the Edge ensures that all delivered solutions benefit from the latest
                            advancements in distributed systems and cloud architecture. I continuously integrate cutting-edge technologies to keep your infrastructure ahead of the curve.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const skills = [
    {
        name: 'Golang',
        icon: 'devicon:go-wordmark',
        category: 'Backend'
    },
    {
        name: 'Python',
        icon: 'devicon:python',
        category: 'Scripting'
    },
    {
        name: 'PostgreSQL',
        icon: 'devicon:postgresql',
        category: 'Database'
    },
    {
        name: 'Redis',
        icon: 'devicon:redis',
        category: 'Caching'
    },
    {
        name: 'Docker',
        icon: 'devicon:docker',
        category: 'Container'
    },
    {
        name: 'Kafka',
        icon: 'devicon:apachekafka',
        category: 'Messaging'
    },
    {
        name: 'MongoDB',
        icon: 'devicon:mongodb',
        category: 'NoSQL'
    },
    {
        name: 'Rust',
        icon: 'devicon:rust',
        category: 'Systems',
        learning: true
    },
    {
        name: 'Git',
        icon: 'devicon:git',
        category: 'VCS'
    },
    {
        name: 'GitHub',
        icon: 'devicon:github',
        category: 'Collaboration'
    },
    {
        name: 'AWS',
        icon: 'devicon:amazonwebservices-wordmark',
        category: 'Cloud'
    },
    {
        name: 'Hostinger',
        icon: 'lucide:server',
        category: 'VPS'
    }
];
</script>
