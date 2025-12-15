<template>
  <footer class="bg-bg border-t border-border py-12 relative overflow-hidden">
    <!-- Background Grid -->
    <div class="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid md:grid-cols-4 gap-12 mb-12">
        <!-- System ID -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-2 h-2 bg-accent"></div>
            <span class="font-mono text-sm font-bold text-text tracking-tight">YA_SYSTEM_V4</span>
          </div>
          <p class="font-mono text-xs text-text-accent leading-relaxed mb-6 max-w-md">
            // SYSTEM_DESCRIPTION<br>
            Backend Engineer specializing in distributed architectures and high-performance APIs.
            Optimized for scale and reliability.
          </p>
          <div class="flex gap-4">
            <a v-for="social in socialLinks" :key="social.name" :href="social.href" :target="social.target"
              :rel="social.rel" :aria-label="social.name"
              class="w-8 h-8 border border-border flex items-center justify-center hover:border-accent hover:text-accent hover:text-accent transition-colors duration-200 bg-bg">
              <Icon :name="social.icon" class="w-4 h-4 text-text-secondary" />
            </a>
          </div>
        </div>

        <!-- Navigation Protocols -->
        <div>
          <h3 class="font-mono text-[10px] text-text-accent uppercase tracking-wider mb-4 border-b border-border pb-2 inline-block">
            NAV_PROTOCOLS
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink :to="link.href"
                class="font-mono text-xs text-text-accent hover:text-accent hover:text-accent transition-colors flex items-center gap-2 group">
                <span class="opacity-0 group-hover:opacity-100 transition-opacity">></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Status Block -->
        <div>
          <h3 class="font-mono text-[10px] text-text-accent uppercase tracking-wider mb-4 border-b border-border pb-2 inline-block">
            SYSTEM_STATUS
          </h3>
          <div class="space-y-3 font-mono text-xs text-text-secondary">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>OPERATIONAL</span>
            </div>
            <div>LOC: REMOTE</div>
            <div>TZ: UTC+1</div>
            <div>LAT: < 50ms</div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-mono text-[10px] text-text-secondary">
          © {{ currentYear }} YUSUF_AKINLEYE. ALL_RIGHTS_RESERVED.
        </p>
        <div class="font-mono text-[10px] text-text-accent flex items-center gap-4">
          <span>BUILD: PRODUCTION</span>
          <span>V4.0.1</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'devicon:github',
    href: 'https://github.com/TheBraveByte',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'LinkedIn',
    icon: 'devicon:linkedin',
    href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'X',
    icon: 'simple-icons:x',
    href: 'https://x.com/_iamyak',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'Blog',
    icon: 'simple-icons:hashnode',
    href: 'https://ayaacodes.hashnode.dev',
    target: '_blank',
    rel: 'noopener noreferrer'
  }
];

const quickLinks = [
  { name: 'STATUS', href: '#home' },
  { name: 'SPECS', href: '#about' },
  { name: 'TOOLKIT', href: '#skills' },
  { name: 'MODULES', href: '#projects' },
  { name: 'UPLINK', href: '#contact' }
];
</script>