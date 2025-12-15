<template>
  <section id="home" class="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left Column: System Identity (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Identity Card -->
          <div class="bg-bg border border-border p-6 relative group">
            <!-- Technical Corners -->
            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"></div>
            <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent"></div>
            <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"></div>

            <!-- Profile Image -->
            <div class="aspect-square w-full bg-bg-secondary mb-6 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
              <NuxtImg src="/img/yusuf.jpg" alt="Yusuf Akinleye" class="w-full h-full object-cover" />
              <!-- Scanline Overlay -->
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            <!-- Identity Data -->
            <div class="space-y-3">
              <div class="flex justify-between items-center border-b border-border pb-2">
                <span class="font-mono-label text-text-secondary">ID</span>
                <span class="font-mono text-sm text-text">YUSUF.AKINLEYE</span>
              </div>
              <div class="flex justify-between items-center border-b border-border pb-2">
                <span class="font-mono-label text-text-secondary">ROLE</span>
                <span class="font-mono text-sm text-text">SOFTWARE_ENGINEER</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-mono-label text-text-secondary">STATUS</span>
                <span class="font-mono text-sm text-success flex items-center gap-2">
                  <span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          <!-- Telemetry / Quick Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div class="border border-border p-4 bg-bg">
              <div class="font-mono-label text-text-secondary mb-1">LOCATION</div>
              <div class="font-mono text-sm text-text">LAGOS, NG</div>
            </div>
            <div class="border border-border p-4 bg-bg">
              <div class="font-mono-label text-text-secondary mb-1">TIMEZONE</div>
              <div class="font-mono text-sm text-text">GMT+1</div>
            </div>
          </div>
        </div>

        <!-- Right Column: Main Interface (8 cols) -->
        <div class="lg:col-span-8 flex flex-col justify-center h-full pt-8 lg:pt-0">
          <!-- Header Status Line -->
          <div class="flex items-center gap-4 mb-8 font-mono text-xs text-text-secondary">
            <span>:: SYSTEM_INIT</span>
            <span class="flex-grow h-px bg-border"></span>
            <span>V 3.0</span>
          </div>

          <!-- Main Headline -->
          <h1 class="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
            <span class="text-accent">Architecting</span> <br />
            <span class="text-text">Intelligent Systems</span>
          </h1>

          <!-- Terminal Description -->
          <div class="border-l-2 border-accent pl-6 mb-10">
            <p class="text-lg md:text-xl text-text font-light leading-relaxed max-w-2xl">
              I build high-performance backend infrastructure and AI-powered systems that power millions of transactions. 
              <span class="text-text-secondary">
                Specializing in distributed architectures, scalable APIs, ML pipelines, and production-grade AI integration.
              </span>
            </p>
          </div>

          <!-- Action Modules -->
          <div class="flex flex-wrap gap-4 mb-16">
            <NuxtLink to="#projects"
              class="group px-6 py-3 bg-accent text-white font-mono text-sm hover:bg-accent-hover transition-colors duration-200 flex items-center gap-3">
              <span>[ VIEW_PROJECTS ]</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <NuxtLink to="#contact"
              class="px-6 py-3 border border-border text-text font-mono text-sm hover:border-accent hover:text-accent transition-colors duration-200">
              [ INITIATE_CONTACT ]
            </NuxtLink>
          </div>

          <!-- Tech Stack / Loaded Modules -->
        <div class="mb-12">
          <div class="font-mono text-[10px] text-text-muted mb-4 uppercase tracking-widest flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            @ LOADED_MODULES
          </div>
          <div class="flex flex-wrap gap-6">
            <Icon name="logos:go" class="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            <Icon name="logos:python" class="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            <Icon name="logos:docker-icon" class="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            <Icon name="logos:nuxt-icon" class="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            <Icon name="logos:postgresql" class="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            <Icon name="logos:mongodb-icon" class="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>

      </div>
    </div>
  </div>
  </section>
</template>

<script lang="ts" setup>
</script>