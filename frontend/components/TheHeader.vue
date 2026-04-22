<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-150"
    :class="scrolled ? 'bg-bg/85 backdrop-blur border-b border-border' : 'bg-bg border-b border-transparent'"
  >
    <div class="container-wide">
      <div class="flex items-center justify-between h-14">
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <img src="/img/yusuf.jpg" alt="" class="w-7 h-7 rounded-full object-cover" />
          <span class="text-sm font-medium text-text">Yusuf Akinleye</span>
        </NuxtLink>

        <nav class="hidden sm:flex items-center gap-6 text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-link text-text-muted hover:text-text transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-1">
          <button
            @click="toggleTheme"
            class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text transition-colors rounded-md"
            aria-label="Toggle theme"
          >
            <Icon :name="themeIcon" class="w-4 h-4" />
          </button>

          <button
            v-if="isAuthenticated"
            @click="logout"
            class="hidden sm:flex w-8 h-8 items-center justify-center text-text-muted hover:text-error transition-colors rounded-md"
            aria-label="Logout"
          >
            <Icon name="lucide:log-out" class="w-4 h-4" />
          </button>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="sm:hidden w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-md"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <transition name="slide-down">
        <nav
          v-if="mobileMenuOpen"
          class="sm:hidden flex flex-col gap-1 pb-4 pt-1"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            @click="mobileMenuOpen = false"
            class="py-2 text-sm text-text-secondary hover:text-text transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <NuxtLink
            v-if="isAuthenticated"
            to="/admin/dashboard"
            @click="mobileMenuOpen = false"
            class="py-2 text-sm text-text-secondary hover:text-text"
          >
            Dashboard
          </NuxtLink>
        </nav>
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
  { to: "/", label: "Home" },
  { to: "/#work", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/process", label: "Process" },
];

const scrolled = ref(false);
const handleScroll = () => { scrolled.value = window.scrollY > 8; };

onMounted(() => {
  hasMounted.value = true;
  window.addEventListener("scroll", handleScroll, { passive: true });
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
.nav-link.router-link-active {
  color: var(--color-text);
  font-weight: 500;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.15s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
