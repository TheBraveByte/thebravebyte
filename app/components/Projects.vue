<template>
  <section id="projects" class="py-24 bg-bg dark:bg-bg relative">
    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      
      <!-- Section Header -->
      <div class="mb-16 flex items-end justify-between border-b border-border dark:border-border-dark pb-6">
        <div>
          <h3 class="font-mono-label text-text-secondary dark:text-text-secondary-dark mb-2 flex items-center gap-2">
            <span class="w-2 h-2 bg-accent dark:bg-accent-dark"></span>
            SYSTEM_MODULES
          </h3>
          <h2 class="text-3xl md:text-4xl font-light text-text dark:text-text">
            Active Services
          </h2>
        </div>
        <div class="hidden md:block font-mono text-xs text-text-secondary dark:text-text-secondary-dark text-right">
          <div>TOTAL_MODULES: {{ projects.length }}</div>
          <div>STATUS: ALL_SYSTEMS_OPERATIONAL</div>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-4 py-2 font-mono text-xs transition-colors duration-200 border',
          selectedCategory === cat
            ? 'bg-text dark:bg-white text-bg dark:text-black border-text dark:border-white'
            : 'bg-transparent border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent dark:hover:border-accent-dark'
        ]">
          [{{ cat.toUpperCase() }}]
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(project, index) in displayedProjects" :key="project.id"
          class="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark hover:border-accent dark:hover:border-accent-dark transition-colors duration-200 flex flex-col group relative">
          
          <!-- Technical Corner Markers -->
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-accent dark:group-hover:border-accent-dark transition-colors duration-200"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-accent dark:group-hover:border-accent-dark transition-colors duration-200"></div>

          <!-- Project Header -->
          <div class="p-6 flex-grow">
            <div class="flex justify-between items-start mb-4">
              <span class="font-mono-label text-accent dark:text-accent-dark">
                [ SERVICE_{{ String(index + 1).padStart(2, '0') }} ]
              </span>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span class="font-mono text-[10px] text-green-500">RUNNING</span>
              </div>
            </div>

            <h3 class="text-lg font-normal text-text dark:text-text mb-3 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
              {{ project.title }}
            </h3>

            <p class="text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-6 font-light border-l border-border dark:border-border-dark pl-3">
              {{ project.description }}
            </p>

            <!-- Metrics Grid -->
            <div class="bg-gray-50 dark:bg-white/5 border border-border dark:border-border-dark p-3 mb-4">
              <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                <div v-for="metric in project.metrics" :key="metric.label">
                  <div class="font-mono text-[10px] text-text-secondary dark:text-text-secondary-dark uppercase">{{ metric.label }}</div>
                  <div class="font-mono text-xs text-text dark:text-text">{{ metric.value }}</div>
                </div>
              </div>
            </div>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag"
                class="font-mono text-[10px] px-2 py-1 border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark">
                {{ tag }}
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- Load More / Show Less Buttons -->
      <div class="flex justify-center gap-4 mt-12">
        <button v-if="hasMoreProjects" @click="loadMore"
          class="px-6 py-3 border border-border dark:border-border-dark text-text dark:text-text hover:border-accent dark:hover:border-accent-dark transition-colors duration-200 font-mono text-xs">
          [ LOAD_MORE_DATA ]
        </button>
        <button v-if="visibleCount > 3" @click="showLess"
          class="px-6 py-3 text-text-secondary dark:text-text-secondary-dark hover:text-text dark:hover:text-text transition-colors font-mono text-xs">
          [ COLLAPSE_VIEW ]
        </button>
      </div>

      <!-- CTA -->
      <div class="text-center mt-20 border-t border-border dark:border-border-dark pt-12">
        <p class="font-mono text-xs text-text-secondary dark:text-text-secondary-dark mb-4">:: SYSTEM_READY_FOR_DEPLOYMENT</p>
        <NuxtLink to="#contact"
          class="inline-flex items-center gap-3 px-8 py-4 bg-text dark:bg-white text-bg dark:text-black hover:bg-accent dark:hover:bg-accent-dark hover:text-white transition-colors duration-200 font-mono text-sm group">
          <span>[ INITIATE_COLLABORATION ]</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

const projects = [
  {
    id: 1,
    title: "Scalable Media Processing Pipeline",
    description: "Concurrent media pipeline for adaptive-quality video streaming and instant image conversion. Zero buffering on peak traffic spikes.",
    impact: "API handles peak traffic without slowdown—fast and reliable content delivery",
    tags: ["Golang", "FFmpeg", "Redis", "PostgreSQL"],
    category: "Media & Streaming",
    metrics: [
      { label: "THROUGHPUT", value: "10GB/s" },
      { label: "LATENCY", value: "<50ms" },
    ],
  },
  {
    id: 2,
    title: "EasyFit — Freelance Fashion Platform",
    description: "Real-time messaging and secure payment flows for designer-client communication. <1s chat latency with 99.9% uptime.",
    impact: "Messages arrive instantly—no lost conversations or missed opportunities",
    tags: ["Golang", "MongoDB", "Docker", "WebSockets", "VPS"],
    category: "E-Commerce",
    metrics: [
      { label: "MSG_LATENCY", value: "<100ms" },
      { label: "UPTIME", value: "99.99%" },
    ],
  },
  {
    id: 3,
    title: "Secure Digital Gift Card Platform",
    description: "Bank-grade secure platform handling 1,000+ daily transactions. 40% faster checkout with zero security incidents since launch.",
    impact: "40% faster checkout and zero security incidents—quick and safe purchases",
    tags: ["Golang", "JWT", "Docker", "PostgreSQL"],
    category: "Fintech",
    metrics: [
      { label: "TPS", value: "1000+" },
      { label: "SECURITY", value: "0 INCIDENTS" },
    ],
  },
  {
    id: 4,
    title: "BiTraq — Real-time Crypto Arbitrage Engine",
    description: "High-frequency arbitrage monitoring multiple exchanges with simulated strategies and cross-exchange execution. Integrated risk management.",
    impact: "Detects and executes arbitrage in <200ms with >98% success during volatility",
    tags: ["Golang", "Redis", "MongoDB", "Docker", "WebSockets", "Ethereum"],
    category: "Fintech & Blockchain",
    metrics: [
      { label: "EXEC_TIME", value: "<200ms" },
      { label: "SUCCESS_RATE", value: "98.5%" },
    ],
  },
  {
    id: 5,
    title: "Unified Campus — Attendance & Audit Platform",
    description: "Multi-tenant attendance platform with RFID/NFC, mobile check-ins, real-time audit logs, RBAC, and notification pipelines.",
    impact: "Sub-second check-ins at peak load with strict RBAC and compliance logs",
    tags: ["Golang", "PostgreSQL", "Redis", "WebSockets", "SQLC", "JWT", "Expo"],
    category: "Enterprise & SaaS",
    metrics: [
      { label: "REQ/MIN", value: "5000+" },
      { label: "AUTH_TIME", value: "<10ms" },
    ],
  },
  {
    id: 6,
    title: "High-Performance Rider Matching System",
    description: "Geo-based rider matching for instant driver assignment. 60% faster matching with 50%+ infrastructure cost reduction.",
    impact: "Customers matched 60% faster while reducing infrastructure spend by 50%+",
    tags: ["Golang", "MongoDB", "Google Maps API"],
    category: "Mobility & Logistics",
    metrics: [
      { label: "MATCH_TIME", value: "<500ms" },
      { label: "COST_REDUCTION", value: "50%" },
    ],
  },
  {
    id: 7,
    title: "Enterprise Ride-Hailing Platform",
    description: "Real-time trip booking and GPS tracking serving 2,300+ daily riders. Seamless booking, payment, and driver tracking.",
    impact: "Platform stays online 99.9% of the time—customers can always book rides",
    tags: ["Golang", "Docker", "AWS"],
    category: "Mobility & Logistics",
    metrics: [
      { label: "DAU", value: "2300+" },
      { label: "AVAILABILITY", value: "99.9%" },
    ],
  },
  {
    id: 8,
    title: "Healthcare Complaint Management",
    description: "HIPAA-compliant patient feedback system processing 500+ daily submissions with instant analytics for healthcare staff.",
    impact: "Patient satisfaction tracking improved 35%—faster response to patient needs",
    tags: ["Golang", "MongoDB", "Healthcare", "HIPAA"],
    category: "Healthcare & Compliance",
    metrics: [
      { label: "DATA_VOL", value: "500/DAY" },
      { label: "COMPLIANCE", value: "HIPAA" },
    ],
  },
  {
    id: 9,
    title: "AI-Powered IoT Fire Detection",
    description: "Early fire detection with smoke pattern recognition and instant alerts. Protects homes and businesses before fires spread.",
    impact: "86% accurate fire detection with instant alerts—faster warnings, safer evacuations",
    tags: ["Python", "PyTorch", "IoT", "MQTT"],
    category: "AI & IoT",
    metrics: [
      { label: "ACCURACY", value: "86%" },
      { label: "LATENCY", value: "REAL-TIME" },
    ],
  },
];

const selectedCategory = ref('All Projects');
const visibleCount = ref(3);

const categories = computed(() => {
  const cats = ['All Projects', ...new Set(projects.map(p => p.category))];
  return cats;
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All Projects') {
    return projects;
  }
  return projects.filter(p => p.category === selectedCategory.value);
});

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, visibleCount.value);
});

const hasMoreProjects = computed(() => {
  return visibleCount.value < filteredProjects.value.length;
});

const loadMore = () => {
  visibleCount.value += 3;
};

const showLess = () => {
  visibleCount.value = 3;
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

watch(selectedCategory, () => {
  visibleCount.value = 3;
});
</script>