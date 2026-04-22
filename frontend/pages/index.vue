<template>
  <div class="portfolio-page">
    <PortfolioHero />
    <PortfolioTestimonials />
    <PortfolioAbout />
    <PortfolioSkills />
    <PortfolioProcess />
    <PortfolioProjects />
    <PortfolioContact />
  </div>
</template>

<script setup>
// Components are auto-imported by Nuxt if in components/ dir, 
// but since I moved them to components/portfolio, I might need to rename them or configure auto-import.
// Nuxt 3 auto-imports nested components as DirectoryComponent.
// So components/portfolio/Hero.vue -> <PortfolioHero />

const config = useRuntimeConfig();

useSeoMeta({
  title: 'Yusuf Akinleye | Software Engineer & Backend Architect',
  ogTitle: 'Yusuf Akinleye | Software Engineer & Backend Architect',
  description: 'Portfolio of Yusuf Akinleye (The Brave Byte). Specializing in high-performance backend systems, distributed architectures, Go, and Python.',
  ogDescription: 'Portfolio of Yusuf Akinleye (The Brave Byte). Specializing in high-performance backend systems, distributed architectures, Go, and Python.',
  ogImage: `${config.public.siteUrl}/og-image.jpg`,
  twitterCard: 'summary_large_image',
  twitterImage: `${config.public.siteUrl}/og-image.jpg`,
});
</script>

<style scoped>
.portfolio-page {
  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>
