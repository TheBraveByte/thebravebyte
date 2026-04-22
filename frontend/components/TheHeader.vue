<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
    :class="[
      scrolled
        ? 'bg-bg/95 backdrop-blur-sm border-b-[1.5px] border-ink'
        : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-18 md:h-20">
        <!-- Wordmark -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <span
            class="inline-flex items-center justify-center w-8 h-8 border-[1.5px] border-ink bg-bg font-serif text-lg leading-none pt-0.5"
          >
            Y
          </span>
          <div class="hidden sm:flex flex-col leading-tight">
            <span class="font-serif text-[1.05rem] text-text">
              Yusuf Akinleye
            </span>
            <span
              class="font-mono text-[9.5px] font-medium text-text-muted uppercase tracking-[0.22em] mt-0.5"
            >
              Backend / Systems
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-10">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-link font-mono text-[11px] font-medium tracking-[0.18em] uppercase"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button
            @click="toggleTheme"
            class="w-10 h-10 border-[1.5px] border-ink bg-bg text-text hover:bg-ink hover:text-bg transition-colors flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <Icon :name="themeIcon" class="w-4 h-4" />
          </button>

          <div v-if="isAuthenticated" class="hidden sm:flex items-center gap-2">
            <NuxtLink to="/admin/dashboard" class="btn-primary py-2! px-4! text-xs!">
              Dashboard
            </NuxtLink>
            <button
              @click="logout"
              class="w-10 h-10 border-[1.5px] border-ink bg-bg text-text hover:bg-ink hover:text-bg transition-colors flex items-center justify-center"
              aria-label="Logout"
            >
              <Icon name="lucide:log-out" class="w-4 h-4" />
            </button>
          </div>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden w-10 h-10 border-[1.5px] border-ink bg-bg text-text flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div
          v-if="mobileMenuOpen"
          class="lg:hidden py-6 border-t-[1.5px] border-ink bg-bg absolute left-0 right-0 top-full px-6"
        >
          <nav class="flex flex-col gap-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              @click="mobileMenuOpen = false"
              class="mobile-nav-link font-mono text-xs tracking-[0.18em] uppercase py-3 border-b border-ink/20"
            >
              {{ item.label }}
            </NuxtLink>

            <template v-if="isAuthenticated">
              <NuxtLink
                to="/admin/dashboard"
                @click="mobileMenuOpen = false"
                class="mobile-nav-link font-mono text-xs tracking-[0.18em] uppercase py-3 border-b border-ink/20"
              >
                Dashboard
              </NuxtLink>
              <button
                @click="logout"
                class="mobile-nav-link font-mono text-xs tracking-[0.18em] uppercase py-3 text-left"
              >
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
import { ref, computed, onMounted, onUnmounted } from "vue";

const colorMode = useColorMode();
const hasMounted = ref(false);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const themeIcon = computed(() => {
  if (!hasMounted.value) return "lucide:moon";
  return colorMode.value === "dark" ? "lucide:sun" : "lucide:moon";
});

const navItems = [
  { to: "/", label: "Index" },
  { to: "/#about", label: "About" },
  { to: "/#work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/blog", label: "Writing" },
  { to: "/#contact", label: "Contact" },
];

const scrolled = ref(false);
const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  hasMounted.value = true;
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const mobileMenuOpen = ref(false);
const isAuthenticated = ref(false);

const { useApiFetch } = await import("~/composables/useApi");

const logout = async () => {
  const token = useCookie("auth_token");
  token.value = null;
  await useApiFetch("/auth/logout", { method: "POST" });
  isAuthenticated.value = false;
  await navigateTo("/");
  mobileMenuOpen.value = false;
};

onMounted(async () => {
  const token = useCookie("auth_token");
  if (token.value) {
    try {
      const { data } = await useApiFetch("/auth/me");
      if (data.value) isAuthenticated.value = true;
    } catch (err) {
      isAuthenticated.value = false;
    }
  }
});
</script>

<style scoped>
.nav-link {
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
  position: relative;
  padding: 4px 0;
}
.nav-link:hover {
  color: var(--color-text);
}
.nav-link.router-link-active {
  color: var(--color-text);
}
.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-ink);
}
.mobile-nav-link {
  color: var(--color-text);
  transition: color 0.15s ease;
}
.mobile-nav-link:hover {
  color: var(--color-text-muted);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
