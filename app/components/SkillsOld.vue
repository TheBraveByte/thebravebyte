<template>
    <section id="skills" class="py-24 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-6">
            <div class="mb-16">
                <h3 class="text-xl uppercase tracking-widest text-primary mb-2 font-semibold flex items-center gap-3">
                    <span class="w-2 h-2 bg-secondary rounded-full"></span>
                    <span class="relative inline-block">
                        Core Technology <span class="hidden md:inline">& System Toolkit</span>
                        <span class="absolute bottom-0 left-0 w-[80%] h-0.5 bg-secondary"></span>
                    </span>
                </h3>
                <p class="font-light text-gray-600 dark:text-gray-300">The foundation for high-performance, resilient
                    systems. I don't just use these tools, I orchestrate them to deliver speed and stability.</p>
            </div>

            <div class="flex flex-wrap justify-center gap-6">
                <div v-for="skill in skills" :key="skill.name"
                    class="group relative bg-tertiary dark:bg-tertiary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 hover:border-secondary dark:hover:border-secondary hover:shadow-lg transition-all duration-300 w-[165px] h-[165px] md:w-[155px] md:h-[155px] lg:w-[180px] lg:h-[180px]">
                    <div class="flex flex-col items-center gap-4">
                        <div
                            class="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon :name="skill.icon" class="w-10! h-10!" />
                        </div>
                        <div class="text-center">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white text-nowrap">{{ skill.name }}
                            </h3>
                            <!-- <p class="text-xs text-gray-500 mt-1">{{ skill.category }}</p> -->
                        </div>

                    </div>
                    <div
                        class="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    </div>
                </div>
            </div>

            <!-- Additional info section -->
            <div class="mt-20 text-center max-w-3xl mx-auto">
                <div
                    class="bg-tertiary dark:bg-tertiary-dark border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <Icon name="lucide:zap" class="w-6 h-6 text-secondary" />
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Future-Proof Engineering</h3>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Commitment to the Edge I guarantee that all delivered solutions benefit from the latest
                        advancements in distributed systems and cloud architecture. My commitment to continuous learning
                        ensures future-proof, cutting-edge technology integration.
                    </p>
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
        category: 'Backend Development'
    },
    {
        name: 'Python',
        icon: 'devicon:python',
        category: 'Scripting & APIs'
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
        category: 'Containerization'
    },
    {
        name: 'Kafka',
        icon: 'devicon:apachekafka',
        category: 'Message Queue'
    },
    {
        name: 'MongoDB',
        icon: 'devicon:mongodb',
        category: 'NoSQL Database'
    },
    {
        name: 'Rust',
        icon: 'devicon:rust',
        category: 'Systems Programming'
    },
    {
        name: 'Git',
        icon: 'devicon:git',
        category: 'Version Control'
    },
    {
        name: 'GitHub',
        icon: 'devicon:github',
        category: 'Collaboration'
    },
    {
        name: 'Google Cloud',
        icon: 'devicon:googlecloud',
        category: 'Cloud Platform'
    }
];
</script>
