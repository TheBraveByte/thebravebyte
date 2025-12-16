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
                            I engineer backend systems designed for <span class="font-medium">resilience</span> and <span class="font-medium">scale</span>. 
                            My approach treats infrastructure as code and failure as an expected state to be managed, not feared.
                        </p>
                        <p class="text-text-secondary font-light leading-relaxed">
                            Specializing in distributed architectures, I build the invisible engines that power seamless user experiences. 
                            From high-concurrency payment gateways to real-time AI inference pipelines, I focus on systems that remain performant under pressure.
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
                        <a href="https://drive.google.com/file/d/1bhKFxFhO2uey5Tojg3fYfJs17NmEScgy/view?usp=sharing"
                            target="_blank"
                            class="px-6 py-3 bg-text text-bg font-mono text-sm hover:bg-text-secondary transition-colors duration-200 flex items-center gap-2">
                            <Icon name="lucide:file-text" class="w-4 h-4" />
                            [ VIEW_LOGS ]
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=1bhKFxFhO2uey5Tojg3fYfJs17NmEScgy"
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
                            <Icon name="lucide:bar-chart-2" class="w-4 h-4" />
                            PERFORMANCE_BENCHMARKS
                        </div>

                        <div class="space-y-6">
                            <div v-for="metric in metrics" :key="metric.label" class="group">
                                <div class="flex justify-between items-end mb-2">
                                    <span class="font-mono text-xs text-text-secondary">{{ metric.label }}</span>
                                    <span class="font-mono text-xl text-text transition-colors">{{ metric.value }}</span>
                                </div>
                                <div class="w-full h-1 bg-border overflow-hidden">
                                    <div class="h-full bg-text-secondary w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                                <p class="text-xs text-text-secondary mt-2 font-light leading-relaxed">
                                    {{ metric.description }}
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
        title: 'Scalability Engineering',
        description: 'Design distributed systems handling millions of requests daily using event-driven architecture and concurrency patterns.'
    },
    {
        title: 'Deployment & Infrastructure',
        description: 'Implement CI/CD pipelines and containerization strategies for reliable, zero-downtime deployments.'
    },
    {
        title: 'AI & ML Integration',
        description: 'Deploy machine learning models into production pipelines with optimized inference, real-time scoring, and intelligent automation.'
    },
    {
        title: 'Production Reliability',
        description: 'Build systems that fail gracefully. Error handling, monitoring, and recovery are first-class concerns.'
    }
];

const metrics = [
    {
        label: 'QUERY_PERFORMANCE',
        value: '2x FASTER',
        description: 'Database optimization and query tuning delivering consistent performance improvements.'
    },
    {
        label: 'SYSTEM_RELIABILITY',
        value: '99.9% UPTIME',
        description: 'Production uptime through monitoring, alerting, and automated recovery protocols.'
    },
    {
        label: 'TRAFFIC_CAPACITY',
        value: '10M+ REQ/DAY',
        description: 'Systems processing millions of daily requests with sub-50ms latency.'
    }
];
</script>