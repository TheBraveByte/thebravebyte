<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark">
    <div class="container mx-auto px-6 pt-32 pb-20">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-light text-text dark:text-text-dark mb-8">
          About <span class="text-accent dark:text-accent-dark">The Brave Byte</span>
        </h1>
        
        <div class="prose prose-invert max-w-none space-y-6">
          <p class="text-lg text-text dark:text-text-dark leading-relaxed">
            Welcome to The Brave Byte - a technical blog focused on backend engineering, 
            distributed systems, and production-grade software architecture.
          </p>
          
          <p class="text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
            I'm Yusuf Akinleye, a backend engineer specializing in building scalable systems 
            that handle millions of requests. This blog documents my journey, insights, and 
            learnings from working on real-world production systems.
          </p>

          <div class="mt-12 border-t border-border dark:border-border-dark pt-8">
            <h2 class="text-2xl font-normal text-text dark:text-text-dark mb-4">Topics I Cover</h2>
            <ul class="space-y-3 text-text-secondary dark:text-text-secondary-dark">
              <li class="flex items-start gap-3">
                <span class="text-accent dark:text-accent-dark">→</span>
                <span>Backend Architecture & Design Patterns</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-accent dark:text-accent-dark">→</span>
                <span>Distributed Systems & Scalability</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-accent dark:text-accent-dark">→</span>
                <span>Database Optimization & Performance</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-accent dark:text-accent-dark">→</span>
                <span>AI/ML Integration in Production</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-accent dark:text-accent-dark">→</span>
                <span>DevOps, CI/CD & Infrastructure</span>
              </li>
            </ul>
          </div>

          <div class="mt-12 flex gap-4">
            <NuxtLink to="/" 
              class="px-6 py-3 bg-accent dark:bg-accent-dark text-white hover:opacity-90 transition-opacity font-mono text-sm">
              [ VIEW_PORTFOLIO ]
            </NuxtLink>
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
</script>
