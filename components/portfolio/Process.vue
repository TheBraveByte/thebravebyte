<template>
  <section id="process" class="py-24 bg-bg relative overflow-hidden border-b border-border">
    <!-- Background Grid -->
    <div class="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="mb-24 text-center max-w-2xl mx-auto">
        <h3 class="font-mono-label text-text-secondary mb-4 flex items-center justify-center gap-2">
          <span class="w-2 h-2 bg-text-secondary animate-pulse"></span>
          // ENGINEERING_METHODOLOGY
        </h3>
        <h2 class="text-4xl md:text-5xl font-bold text-text mb-6 tracking-tight">
          System Architecture <span class="text-text-secondary font-light">&</span> Workflow
        </h2>
        <p class="font-mono text-xs text-text-secondary uppercase tracking-widest">
          CHAOS_TO_CLARITY_V2.0
          <br>
          PRECISION_ENGINEERING_AT_SCALE
        </p>
      </div>

      <!-- Process Cards Grid -->
      <div class="grid md:grid-cols-3 gap-8 relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-border z-0">
          <div class="absolute inset-0 bg-text-secondary opacity-20 w-full h-full"></div>
        </div>

        <!-- Step 1 -->
        <div class="group relative bg-bg border border-border p-8 hover:border-text transition-all duration-500 hover:-translate-y-2 z-10">
          <!-- Connector Dot -->
          <div class="hidden md:block absolute top-16 -right-4 w-8 h-px bg-border group-hover:bg-text-secondary transition-colors duration-500"></div>
          
          <div class="absolute -top-8 left-6 font-mono text-7xl font-bold text-border select-none pointer-events-none group-hover:text-text/10 transition-colors duration-500">
            01
          </div>
          
          <div class="relative z-10">
            <div class="w-16 h-16 bg-bg-secondary border border-border flex items-center justify-center mb-8 group-hover:border-text transition-colors duration-500">
              <Icon name="lucide:layers" class="w-8 h-8 text-text-secondary group-hover:text-text transition-colors duration-500" />
            </div>
            
            <h4 class="font-mono text-sm font-bold text-text mb-4 transition-colors">
              [ BUSINESS_FIRST ]
            </h4>
            <p class="text-sm text-text-secondary leading-relaxed font-light">
              Every architecture decision starts with <strong class="text-text font-medium">"who is this for?"</strong> From EazyFit (stylists + customers) to OmonAI (compliance officers)—I design systems that solve real business problems, not just technical puzzles.
            </p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="group relative bg-bg border border-border p-8 hover:border-text transition-all duration-500 hover:-translate-y-2 z-10">
          <!-- Connector Dots -->
          <div class="hidden md:block absolute top-16 -left-4 w-8 h-px bg-border group-hover:bg-text-secondary transition-colors duration-500"></div>
          <div class="hidden md:block absolute top-16 -right-4 w-8 h-px bg-border group-hover:bg-text-secondary transition-colors duration-500"></div>

          <div class="absolute -top-8 left-6 font-mono text-7xl font-bold text-border select-none pointer-events-none group-hover:text-text/10 transition-colors duration-500">
            02
          </div>
          
          <div class="relative z-10">
            <div class="w-16 h-16 bg-bg-secondary border border-border flex items-center justify-center mb-8 group-hover:border-text transition-colors duration-500">
              <Icon name="lucide:scale" class="w-8 h-8 text-text-secondary group-hover:text-text transition-colors duration-500" />
            </div>
            
            <h4 class="font-mono text-sm font-bold text-text mb-4 transition-colors">
              [ TRADE-OFF_ANALYSIS ]
            </h4>
            <p class="text-sm text-text-secondary leading-relaxed font-light">
              Engineering is about <strong class="text-text font-medium">trade-offs</strong>. Eventual consistency vs. immediate? Multi-tenant vs. isolated? I document why each decision was made—so future you (or your team) understands the reasoning.
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="group relative bg-bg border border-border p-8 hover:border-text transition-all duration-500 hover:-translate-y-2 z-10">
          <!-- Connector Dot -->
          <div class="hidden md:block absolute top-16 -left-4 w-8 h-px bg-border group-hover:bg-text-secondary transition-colors duration-500"></div>

          <div class="absolute -top-8 left-6 font-mono text-7xl font-bold text-border select-none pointer-events-none group-hover:text-text/10 transition-colors duration-500">
            03
          </div>
          
          <div class="relative z-10">
            <div class="w-16 h-16 bg-bg-secondary border border-border flex items-center justify-center mb-8 group-hover:border-text transition-colors duration-500">
              <Icon name="lucide:trending-up" class="w-8 h-8 text-text-secondary group-hover:text-text transition-colors duration-500" />
            </div>
            
            <h4 class="font-mono text-sm font-bold text-text mb-4 transition-colors">
              [ MEASURABLE_IMPACT ]
            </h4>
            <p class="text-sm text-text-secondary leading-relaxed font-light">
              Results matter. <strong class="text-text font-medium">60% fewer false positives</strong> in fraud detection. <strong class="text-text font-medium">98.5% arbitrage capture rate</strong>. <strong class="text-text font-medium">183% conversion increase</strong>. Every system ships with metrics that prove its value.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center">
        <NuxtLink to="/process"
          class="inline-flex items-center gap-3 px-8 py-4 border border-text text-text hover:bg-text hover:text-bg hover:bg-text hover:text-bg transition-all duration-300 group">
          <span class="font-mono text-xs font-bold tracking-wider">EXPLORE_FULL_BLUEPRINTS</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>