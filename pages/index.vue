<template>
  <div class="portfolio-page">
    <PortfolioHero />
    <PortfolioTestimonials />
    <PortfolioAbout />
    <PortfolioProcess />
    <PortfolioSkills />
    <PortfolioProjects />
    <PortfolioContact />
  </div>
</template>

<script setup>
// Components are auto-imported by Nuxt if in components/ dir, 
// but since I moved them to components/portfolio, I might need to rename them or configure auto-import.
// Nuxt 3 auto-imports nested components as DirectoryComponent.
// So components/portfolio/Hero.vue -> <PortfolioHero />

useHead({
  title: 'Yusuf Akinleye | Software Engineer & Backend Architect',
  meta: [
    { name: 'description', content: 'Portfolio of Yusuf Akinleye (The Brave Byte). Specializing in high-performance backend systems, distributed architectures, Go, and Python.' },
    { name: 'keywords', content: 'Software Engineer, Backend Developer, Go, Python, Distributed Systems, Yusuf Akinleye, The Brave Byte' }
  ]
})
</script>

<style scoped>
.portfolio-page {
  /* Ensure it inherits the dark theme */
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
