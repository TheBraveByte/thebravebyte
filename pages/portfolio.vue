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
</script>

<style scoped>
.portfolio-page {
  /* Ensure it inherits the dark theme */
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
