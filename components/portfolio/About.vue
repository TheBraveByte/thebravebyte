<template>
    <section id="about" class="py-24 bg-bg relative">
        <div class="container mx-auto px-6 max-w-6xl relative z-10">
            
            <!-- Section Header -->
            <div class="mb-16 flex items-end justify-between border-b border-border pb-6">
                <div>
                    <h3 class="font-mono-label text-text-secondary mb-2 flex items-center gap-2">
                        <span class="w-2 h-2 bg-text-secondary"></span>
                        SYSTEM_SPECS
                    </h3>
                    <h2 class="text-3xl md:text-4xl font-light text-text">
                        Technical Profile
                    </h2>
                </div>
                <div class="hidden md:block font-mono text-xs text-text-secondary text-right">
                    <div>KERNEL: SOFTWARE_ENG_V6</div>
                    <div>UPTIME: 6+ YEARS</div>
                </div>
            </div>

            <div class="grid lg:grid-cols-12 gap-12 items-start">
                
                <!-- Left Column: Architecture Overview (7 cols) -->
                <div class="lg:col-span-7 space-y-12">
                    
                    <!-- Bio / Architecture Overview -->
                    <div>
                        <div class="font-mono-label text-text-secondary mb-4 border-b border-border pb-2">
                            // ARCHITECTURE_OVERVIEW
                        </div>
                        <p class="text-lg text-text font-light leading-relaxed mb-6">
                            I engineer backend systems designed for <span class="font-medium">reliability</span>, <span class="font-medium">maintainability</span>, and <span class="font-medium">business impact</span>. 
                            My approach treats software as a long-term asset, focusing on clean architecture and pragmatic design decisions.
                        </p>
                        <p class="text-text-secondary font-light leading-relaxed">
                            Specializing in backend technologies, I build the invisible engines that power seamless user experiences. 
                            Whether it's optimizing database queries, designing RESTful APIs, or integrating complex third-party services, I focus on delivering code that works exceptionally well.
                        </p>
                    </div>

                    <!-- Core Components (Capabilities) -->
                    <div>
                        <div class="font-mono-label text-text-secondary mb-6 border-b border-border pb-2">
                            // CORE_COMPONENTS
                        </div>
                        <div class="grid sm:grid-cols-2 gap-6">
                            <div v-for="capability in capabilities" :key="capability.title"
                                class="border-l-2 border-border pl-4 hover:border-text transition-colors duration-200 group">
                                <h4 class="text-base font-normal text-text mb-2 transition-colors">
                                    {{ capability.title }}
                                </h4>
                                <p class="text-sm text-text-secondary leading-relaxed font-light">
                                    {{ capability.description }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Documentation / Resume -->
                    <div class="flex flex-wrap gap-4 pt-4">
                        <a href="https://drive.google.com/file/d/1iuvFjmPYCF7s5PSC43vzxzXlQNkJcA8l/view?usp=sharing"
                            target="_blank"
                            class="px-6 py-3 bg-text text-bg font-mono text-sm hover:bg-text-secondary transition-colors duration-200 flex items-center gap-2">
                            <Icon name="lucide:file-text" class="w-4 h-4" />
                            [ VIEW_LOGS ]
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=1iuvFjmPYCF7s5PSC43vzxzXlQNkJcA8l"
                            download
                            class="px-6 py-3 border border-border text-text font-mono text-sm hover:border-text hover:bg-bg-secondary transition-colors duration-200 flex items-center gap-2">
                            <Icon name="lucide:download" class="w-4 h-4" />
                            [ DOWNLOAD_CONFIG ]
                        </a>
                    </div>

                </div>

                <!-- Right Column: Performance Benchmarks (5 cols) -->
                <div class="lg:col-span-5 space-y-8">
                    
                    <!-- Metrics Table -->
                    <div class="bg-bg border border-border p-6 relative">
                        <!-- Technical Corners -->
                        <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-text-secondary"></div>
                        <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-text-secondary"></div>

                        <div class="font-mono-label text-text-secondary mb-6 flex items-center gap-2">
                            <Icon name="lucide:terminal" class="w-4 h-4" />
                            ENGINEERING_PHILOSOPHY
                        </div>

                        <div class="space-y-6">
                            <div v-for="item in philosophy" :key="item.label" class="group">
                                <div class="flex justify-between items-end mb-2">
                                    <span class="font-mono text-xs text-text-secondary">{{ item.label }}</span>
                                    <span class="font-mono text-base text-text transition-colors">{{ item.value }}</span>
                                </div>
                                <div class="w-full h-px bg-border overflow-hidden">
                                     <div class="h-full bg-text-secondary w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                                <p class="text-xs text-text-secondary mt-2 font-light leading-relaxed">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- System Status Box -->
                    <div class="border border-dashed border-border p-4 bg-bg-secondary">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                            <span class="font-mono text-xs text-success">ALL_SYSTEMS_OPERATIONAL</span>
                        </div>
                        <div class="font-mono text-[10px] text-text-secondary space-y-1">
                            <div>> CHECKING_DEPENDENCIES... OK</div>
                            <div>> VERIFYING_INTEGRITY... OK</div>
                            <div>> READY_FOR_PRODUCTION</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const capabilities = [
    {
        title: 'Backend Development',
        description: 'Building robust, scalable server-side applications using Go and Python.'
    },
    {
        title: 'API Design',
        description: 'Crafting intuitively designed, well-documented RESTful and gRPC APIs.'
    },
    {
        title: 'Database Management',
        description: 'Optimizing data schemas and queries for performance and integrity with PostgreSQL and MongoDB.'
    },
    {
        title: 'DevOps & Deployment',
        description: 'Streamlining development workflows with Docker, CI/CD, and cloud infrastructure.'
    }
];

const philosophy = [
    {
        label: 'CLEAN CODE',
        value: 'Maintainable',
        description: 'Writing code that is easy to read, test, and extend for future growth.'
    },
    {
        label: 'PERFORMANCE',
        value: 'Efficient',
        description: 'Optimizing for speed and resource usage without premature complication.'
    },
    {
        label: 'RELIABILITY',
        value: 'Robust',
        description: 'Building systems that handle errors gracefully and ensure data integrity.'
    }
];
</script>