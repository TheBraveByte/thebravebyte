<template>
  <div class="relative flex items-center justify-center p-1 group cursor-pointer">
    
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative z-10 transition-transform duration-500 group-hover:scale-110">
      <defs>
        <filter id="ya-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Minimal Outer Circle -->
      <circle cx="32" cy="32" r="30" stroke="var(--color-border)" stroke-width="1.5" class="transition-colors duration-500 group-hover:stroke-[var(--color-accent)]" fill="transparent"/>

      <g stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <!-- Letter Y Background -->
        <path d="M 20 20 L 32 36 L 32 50" stroke="currentColor" class="text-text transition-all duration-500 group-hover:text-accent opacity-80" />
        <path d="M 44 20 L 32 36" stroke="currentColor" class="text-text transition-all duration-500 group-hover:text-accent opacity-80" />
        
        <!-- Letter A Foreground (Overlap) -->
        <path d="M 44 50 L 32 18 L 20 50" stroke="var(--color-accent)" style="filter: url(#ya-glow);" class="transition-all duration-500 opacity-90 group-hover:opacity-100" />
        <path d="M 25 40 L 39 40" stroke="var(--color-accent)" class="transition-all duration-500" />
        
        <!-- Nodes -->
        <circle cx="20" cy="20" r="2.5" fill="var(--color-accent)" class="transition-all duration-500 transform origin-center group-hover:scale-150" />
        <circle cx="44" cy="20" r="2.5" fill="var(--color-accent)" class="transition-all duration-500 transform origin-center group-hover:scale-150" />
        <circle cx="32" cy="18" r="2.5" fill="var(--color-text)" class="transition-all duration-500 group-hover:fill-[var(--color-accent)]" />
      </g>
    </svg>
  </div>
</template>
