<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg/90 bg-bg/90 backdrop-blur-xl border-b border-border">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="flex items-center gap-1">
            <span class="text-xl font-bold  tracking-tight">The Brave Byte</span>
            <span class="text-2xl text-text font-bold leading-none">.</span>
          </div>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink to="/" class="nav-link">
            <span>Home</span>
          </NuxtLink>
          <NuxtLink to="/blog" class="nav-link">
            <span>Blog</span>
          </NuxtLink>
          <NuxtLink to="/#about" class="nav-link">
            <span>About</span>
          </NuxtLink>
          <NuxtLink to="/process" class="nav-link">
            <span>Process</span>
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-bg-secondary dark:hover: transition-colors"
            aria-label="Toggle theme"
          >
            <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="w-5 h-5" />
            <Icon v-else name="lucide:moon" class="w-5 h-5" />
          </button>

          <!-- Admin Access (only shown when authenticated) -->
          <div v-if="isAuthenticated" class="hidden sm:flex items-center gap-2">
            <NuxtLink 
              to="/admin/dashboard"
              class="px-4 py-2 rounded-lg bg-bg-secondary border border-border text-text hover:bg-bg-tertiary transition-colors text-sm font-mono"
            >
              DASHBOARD
            </NuxtLink>
            <button 
              @click="logout"
              class="p-2 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-500/10 transition-colors"
              aria-label="Logout"
            >
              <Icon name="lucide:log-out" class="w-5 h-5" />
            </button>
          </div>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg  hover:bg-bg-secondary dark:hover: transition-colors"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-border">
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/" @click="mobileMenuOpen = false" class="mobile-nav-link">
              <Icon name="lucide:home" class="w-5 h-5" />
              <span>Home</span>
            </NuxtLink>
            <NuxtLink to="/blog" @click="mobileMenuOpen = false" class="mobile-nav-link">
              <Icon name="lucide:book-open" class="w-5 h-5" />
              <span>Blog</span>
            </NuxtLink>
            <NuxtLink to="/#about" @click="mobileMenuOpen = false" class="mobile-nav-link">
              <Icon name="lucide:user" class="w-5 h-5" />
              <span>About</span>
            </NuxtLink>
            <NuxtLink to="/process" @click="mobileMenuOpen = false" class="mobile-nav-link">
              <Icon name="lucide:git-branch" class="w-5 h-5" />
              <span>Process</span>
            </NuxtLink>
            
            <template v-if="isAuthenticated">
              <div class="border-t border-border my-2"></div>
              
              <NuxtLink to="/admin/dashboard" @click="mobileMenuOpen = false" class="mobile-nav-link">
                <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
                <span>Dashboard</span>
              </NuxtLink>
              <button @click="logout" class="mobile-nav-link text-left">
                <Icon name="lucide:log-out" class="w-5 h-5" />
                <span>Logout</span>
              </button>
            </template>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
const colorMode = useColorMode();
const mobileMenuOpen = ref(false);
const isAuthenticated = ref(false);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

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
  position: relative;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  font-weight: 400;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  border-radius: 0.5rem;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.nav-link.router-link-active {
  color: var(--accent-primary);
  font-weight: 500;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background: var(--accent-primary);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.mobile-nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.mobile-nav-link.router-link-active {
  color: var(--accent-primary);
  background: var(--bg-secondary);
}

/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
