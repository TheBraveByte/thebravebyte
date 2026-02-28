<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300" 
          :class="[scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent border-transparent']">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <LogoYA />
          <div class="hidden sm:flex items-center gap-1">
            <span class="text-xl font-bold tracking-tight text-text">Yusuf Akinleye</span>
          </div>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="nav-link font-sans text-sm font-medium tracking-wide uppercase">Home</NuxtLink>
          <NuxtLink to="/blog" class="nav-link font-sans text-sm font-medium tracking-wide uppercase">Blog</NuxtLink>
          <NuxtLink to="/#about" class="nav-link font-sans text-sm font-medium tracking-wide uppercase">About</NuxtLink>
          <NuxtLink to="/process" class="nav-link font-sans text-sm font-medium tracking-wide uppercase">Process</NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-full border border-border text-text hover:bg-bg-secondary transition-colors duration-300 flex items-center justify-center group"
            aria-label="Toggle theme"
          >
            <Icon 
              :name="$colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" 
              class="w-5 h-5 group-hover:text-accent transition-colors duration-300"
            />
          </button>

          <!-- Admin Access -->
          <div v-if="isAuthenticated" class="hidden sm:flex items-center gap-2">
            <NuxtLink 
              to="/admin/dashboard"
              class="px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent-hover transition-all text-xs font-sans tracking-widest uppercase font-semibold shadow-lg shadow-accent/20"
            >
              Dashboard
            </NuxtLink>
            <button 
              @click="logout"
              class="p-2.5 rounded-full text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
              aria-label="Logout"
            >
              <Icon name="lucide:log-out" class="w-5 h-5" />
            </button>
          </div>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-full border border-border text-text hover:bg-bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden py-6 border-t border-border bg-bg/95 backdrop-blur-xl absolute left-0 right-0 top-full px-6 shadow-xl">
          <nav class="flex flex-col gap-4">
            <NuxtLink to="/" @click="mobileMenuOpen = false" class="mobile-nav-link text-lg font-serif">Home</NuxtLink>
            <NuxtLink to="/blog" @click="mobileMenuOpen = false" class="mobile-nav-link text-lg font-serif">Blog</NuxtLink>
            <NuxtLink to="/#about" @click="mobileMenuOpen = false" class="mobile-nav-link text-lg font-serif">About</NuxtLink>
            <NuxtLink to="/process" @click="mobileMenuOpen = false" class="mobile-nav-link text-lg font-serif">Process</NuxtLink>
            
            <template v-if="isAuthenticated">
              <div class="h-px w-full bg-border my-3"></div>
              <NuxtLink to="/admin/dashboard" @click="mobileMenuOpen = false" class="mobile-nav-link text-lg font-serif text-accent flex items-center gap-3">
                <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
                Dashboard
              </NuxtLink>
              <button @click="logout" class="mobile-nav-link text-lg font-serif text-error text-left flex items-center gap-3">
                <Icon name="lucide:log-out" class="w-5 h-5" />
                Logout
              </button>
            </template>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const scrolled = ref(false);
const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const mobileMenuOpen = ref(false);
const isAuthenticated = ref(false);

const { useApiFetch } = await import('~/composables/useApi');

const logout = async () => {
  const token = useCookie('auth_token');
  token.value = null;
  await useApiFetch('/auth/logout', { method: 'POST' });
  isAuthenticated.value = false;
  await navigateTo('/');
  mobileMenuOpen.value = false;
};

// Check authentication status
onMounted(async () => {
  const token = useCookie('auth_token');
  if (token.value) {
    try {
      const { data } = await useApiFetch('/auth/me');
      if (data.value) {
        isAuthenticated.value = true;
      }
    } catch (err) {
      isAuthenticated.value = false;
    }
  }
});
</script>

<style scoped>
.nav-link {
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
  position: relative;
}
.nav-link:hover {
  color: var(--color-text);
}
.nav-link.router-link-active {
  color: var(--color-accent);
}
.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
}
.mobile-nav-link {
  color: var(--color-text);
  transition: color 0.3s ease;
}
.mobile-nav-link:hover {
  color: var(--color-accent);
}
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
