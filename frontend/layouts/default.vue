<template>
  <div class="app-layout">
    <TheHeader @open-palette="showCommandPalette = true" />
    <main class="main-content">
      <slot />
    </main>
    <footer class="border-t border-border mt-20">
      <div class="container-wide py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text-muted">
        <span>© {{ new Date().getFullYear() }} Yusuf Akinleye</span>
        <span class="flex items-center gap-2">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-success"></span>
          Available · Remote · UTC+1
        </span>
      </div>
    </footer>
    <CommandPalette v-if="showCommandPalette" @close="showCommandPalette = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showCommandPalette = ref(false);

const handleKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    showCommandPalette.value = !showCommandPalette.value;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content { flex: 1; }
</style>
