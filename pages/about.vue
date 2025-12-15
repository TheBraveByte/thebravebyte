<template>
  <div class="pt-24 pb-16 bg-bg min-h-screen">
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="max-w-4xl mx-auto mb-16 text-center">
        <h3
          class="text-sm uppercase tracking-widest text-accent mb-3 font-light flex items-center justify-center gap-3">
          <span class="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_currentColor]"></span>
          About The Brave Byte
        </h3>
        <h1 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
          Engineering <span class="text-secondary">The Future</span>
        </h1>
        <p class="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          A technical journal documenting the journey of building scalable, production-grade distributed systems.
        </p>
      </div>

      <div class="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 items-start">
        <!-- Main Content -->
        <div class="md:col-span-8 space-y-8">
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-gray-600 font-light leading-relaxed">
              Welcome to <strong>The Brave Byte</strong>. I'm Yusuf Akinleye, a backend engineer obsessed with the "how" and "why" of software architecture.
            </p>
            <p class="text-gray-600 font-light leading-relaxed">
              In a world of quick hacks and surface-level tutorials, this space is dedicated to the deep dive. Here, I explore the complexities of distributed systems, the nuances of database optimization, and the rigors of maintaining high-availability production environments.
            </p>
          </div>

          <!-- Topics Grid -->
          <div class="grid sm:grid-cols-2 gap-4 pt-6">
             <div v-for="(topic, idx) in topics" :key="idx" class="p-6 rounded-xl bg-bg-secondary border border-border hover:border-secondary transition-colors group">
                <Icon :name="topic.icon" class="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">{{ topic.title }}</h3>
                <p class="text-sm text-gray-500 font-light">{{ topic.description }}</p>
             </div>
          </div>

          <!-- CTA -->
           <div class="pt-8 flex gap-4">
            <NuxtLink to="/" 
              class="px-8 py-3 bg-gray-900 bg-text text-white text-bg rounded-lg hover:shadow-lg transition-all duration-300 font-light flex items-center gap-2">
              <Icon name="lucide:arrow-left" class="w-4 h-4" />
              <span>Back to Portfolio</span>
            </NuxtLink>
            <a href="https://github.com/thebravebyte" target="_blank"
              class="px-8 py-3 border border-border text-gray-700 rounded-lg hover:bg-bg-secondary transition-all duration-300 font-light flex items-center gap-2">
              <Icon name="simple-icons:github" class="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <!-- Sidebar / Meta -->
        <div class="md:col-span-4 space-y-6">
           <!-- Author Card -->
           <div class="p-6 rounded-2xl bg-bg-secondary border border-gray-100 border-text/10 shadow-sm">
              <div class="w-20 h-20 bg-gray-200 rounded-full mb-4 overflow-hidden">
                 <!-- Placeholder for Avatar -->
                 <Icon name="lucide:user" class="w-full h-full p-4 text-gray-400" />
              </div>
              <h3 class="text-xl font-medium text-gray-900">Yusuf Akinleye</h3>
              <p class="text-sm text-accent mb-4">Backend Engineer</p>
              <div class="space-y-3 text-sm text-gray-600 font-light">
                 <div class="flex items-center gap-2">
                    <Icon name="lucide:map-pin" class="w-4 h-4" />
                    <span>Lagos, Nigeria</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <Icon name="lucide:code-2" class="w-4 h-4" />
                    <span>Go, Python, TypeScript</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <Icon name="lucide:server" class="w-4 h-4" />
                    <span>Distributed Systems</span>
                 </div>
              </div>
           </div>

           <!-- System Stats -->
           <div class="p-6 rounded-2xl bg-secondary/5 bg-bg-secondary border border-secondary/10 border-text/10">
              <h4 class="text-xs font-mono uppercase tracking-wider text-accent mb-4">System Status</h4>
              <div class="space-y-4">
                 <div v-for="stat in stats" :key="stat.label">
                    <div class="flex justify-between text-xs mb-1">
                       <span class="text-gray-500">{{ stat.label }}</span>
                       <span class="text-gray-900 font-mono">{{ stat.value }}</span>
                    </div>
                    <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
                       <div class="h-full bg-accent rounded-full" :style="{ width: stat.percent + '%' }"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About | The Brave Byte',
  meta: [
    { name: 'description', content: 'About The Brave Byte - Technical insights on backend engineering and distributed systems by Yusuf Akinleye' }
  ]
});

const topics = [
  { title: 'Backend Architecture', description: 'Design patterns for resilient APIs', icon: 'lucide:layers' },
  { title: 'Distributed Systems', description: 'Consensus, replication, and sharding', icon: 'lucide:network' },
  { title: 'Database Internals', description: 'Optimization and storage engines', icon: 'lucide:database' },
  { title: 'DevOps & Infra', description: 'CI/CD, Docker, and Kubernetes', icon: 'lucide:container' },
];

const stats = [
  { label: 'Uptime', value: '99.99%', percent: 99 },
  { label: 'Code Quality', value: 'A+', percent: 95 },
  { label: 'Coffee', value: '∞', percent: 100 },
];
</script>
