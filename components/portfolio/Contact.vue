<template>
  <section id="contact" class="py-24 bg-bg relative">
    <div class="container mx-auto px-6 max-w-4xl relative z-10">
      
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <h3 class="font-mono-label text-text-secondary mb-3 flex items-center justify-center gap-2">
          <span class="w-2 h-2 bg-accent animate-pulse"></span>
          INITIATE_UPLINK
        </h3>
        <h2 class="text-3xl md:text-4xl font-light text-text mb-6">
          Establish Connection
        </h2>
        <p class="text-lg text-text-secondary font-light max-w-2xl mx-auto">
          Ready to architect systems that define reliability. 
          <span class="font-mono text-xs text-accent">[ STATUS: OPEN_FOR_COLLABORATION ]</span>
        </p>
      </div>

      <!-- Main Actions -->
      <div class="grid md:grid-cols-2 gap-6 mb-16">
        <!-- Email Action -->
        <a href="mailto:ayaaakinleye@gmail.com"
          class="group relative bg-bg border border-border p-8 hover:border-accent transition-colors duration-200 text-center">
          <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-accent transition-colors duration-200"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-accent transition-colors duration-200"></div>
          
          <Icon name="lucide:mail" class="w-8 h-8 text-text mb-4 mx-auto group-hover:text-accent transition-colors" />
          <h3 class="font-mono text-sm text-text mb-2">DIRECT_MESSAGE</h3>
          <p class="text-sm text-text-secondary font-light">Send encrypted transmission</p>
        </a>

        <!-- Contra Action -->
        <a href="https://contra.com/yusuf_akinleye_bb35981b4" target="_blank"
          class="group relative bg-bg border border-border p-8 hover:border-accent transition-colors duration-200 text-center">
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-accent transition-colors duration-200"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-accent transition-colors duration-200"></div>

          <Icon name="lucide:briefcase" class="w-8 h-8 text-text mb-4 mx-auto group-hover:text-accent transition-colors" />
          <h3 class="font-mono text-sm text-text mb-2">CONTRACT_HIRE</h3>
          <p class="text-sm text-text-secondary font-light">Initiate project workflow</p>
        </a>
      </div>

      <!-- Network Links -->
      <div class="border-t border-border pt-12">
        <div class="font-mono-label text-center text-text-secondary mb-8">
          // NETWORK_PROTOCOLS
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <a v-for="contact in contacts" :key="contact.name" :href="contact.href" :target="contact.target"
            :rel="contact.rel"
            class="group flex items-center gap-3 px-6 py-3 border border-border hover:border-accent transition-colors duration-200 bg-bg">
            <Icon :name="contact.icon"
              class="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
            <span
              class="font-mono text-xs text-text group-hover:text-accent transition-colors">
              {{ contact.name.toUpperCase() }}
            </span>
          </a>
        </div>
      </div>

      <!-- Terminal Footer -->
      <div class="mt-16 text-center font-mono text-[10px] text-text-secondary opacity-60">
        <p>SECURE_CONNECTION_ESTABLISHED_V4.0</p>
        <p>END_OF_TRANSMISSION</p>
      </div>

    </div>
  </section>
</template>

<script lang="ts" setup>
const contacts = [
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
    name: 'X (Twitter)',
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
</script>