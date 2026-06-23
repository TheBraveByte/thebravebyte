<template>
  <DialogRoot :open="open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="palette-overlay" />
      <DialogContent
        class="palette-content"
        @open-auto-focus.prevent="focusInput"
      >
        <VisuallyHidden as-child>
          <DialogTitle>Command palette</DialogTitle>
        </VisuallyHidden>

        <div class="palette-container">
          <!-- Search input -->
          <div class="palette-input-wrapper">
            <Icon name="lucide:search" class="w-4 h-4 text-text-muted shrink-0" />
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              placeholder="Search pages, articles, actions…"
              class="palette-input"
              @keydown.down.prevent="moveSelection(1)"
              @keydown.up.prevent="moveSelection(-1)"
              @keydown.enter.prevent="executeSelected"
            />
            <kbd class="palette-kbd">ESC</kbd>
          </div>

          <!-- Results -->
          <div v-if="filteredItems.length" class="palette-results">
            <div
              v-for="(group, gIdx) in groupedResults"
              :key="group.label"
              class="palette-group"
            >
              <span class="palette-group-label">{{ group.label }}</span>
              <button
                v-for="(item, iIdx) in group.items"
                :key="item.id"
                :class="[
                  'palette-item',
                  { 'palette-item--active': flatIndex(gIdx, iIdx) === selectedIndex }
                ]"
                @mouseenter="selectedIndex = flatIndex(gIdx, iIdx)"
                @click="execute(item)"
              >
                <Icon :name="item.icon" class="w-4 h-4 text-text-muted shrink-0" />
                <span class="palette-item-label">{{ item.label }}</span>
                <span v-if="item.hint" class="palette-item-hint">{{ item.hint }}</span>
              </button>
            </div>
          </div>

          <div v-else class="palette-empty">
            <span class="text-sm text-text-muted">No results found.</span>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

const emit = defineEmits(['close']);
const open = ref(true);
const query = ref('');
const selectedIndex = ref(0);
const searchInput = ref<HTMLInputElement | null>(null);

interface PaletteItem {
  id: string;
  label: string;
  icon: string;
  group: string;
  hint?: string;
  action: () => void;
}

const router = useRouter();

const allItems: PaletteItem[] = [
  { id: 'home', label: 'Home', icon: 'lucide:home', group: 'Pages', hint: '/', action: () => router.push('/') },
  { id: 'writing', label: 'Writing', icon: 'lucide:pen-line', group: 'Pages', hint: '/blog', action: () => router.push('/blog') },
  { id: 'about', label: 'About', icon: 'lucide:user', group: 'Pages', hint: '/about', action: () => router.push('/about') },
  { id: 'cv', label: 'CV / Résumé', icon: 'lucide:file-text', group: 'Pages', hint: '/cv', action: () => router.push('/cv') },
  { id: 'process', label: 'Process', icon: 'lucide:layers', group: 'Pages', hint: '/process', action: () => router.push('/process') },
  { id: 'github', label: 'GitHub', icon: 'lucide:github', group: 'Links', hint: 'External', action: () => window.open('https://github.com/TheBraveByte', '_blank') },
  { id: 'linkedin', label: 'LinkedIn', icon: 'lucide:linkedin', group: 'Links', hint: 'External', action: () => window.open('https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/', '_blank') },
  { id: 'twitter', label: 'X (Twitter)', icon: 'lucide:twitter', group: 'Links', hint: 'External', action: () => window.open('https://x.com/thebravebyte', '_blank') },
  { id: 'email', label: 'Email', icon: 'lucide:mail', group: 'Actions', hint: 'ayaaakinleye@gmail.com', action: () => window.open('mailto:ayaaakinleye@gmail.com') },
];

const filteredItems = computed(() => {
  if (!query.value.trim()) return allItems;
  const q = query.value.toLowerCase();
  return allItems.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q) ||
      (item.hint && item.hint.toLowerCase().includes(q))
  );
});

const groupedResults = computed(() => {
  const groups: Record<string, PaletteItem[]> = {};
  for (const item of filteredItems.value) {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  }
  return Object.entries(groups).map(([label, items]) => ({ label, items }));
});

const flatIndex = (gIdx: number, iIdx: number): number => {
  let idx = 0;
  for (let g = 0; g < gIdx; g++) {
    idx += groupedResults.value[g].items.length;
  }
  return idx + iIdx;
};

watch(query, () => {
  selectedIndex.value = 0;
});

const moveSelection = (direction: number) => {
  const total = filteredItems.value.length;
  if (total === 0) return;
  selectedIndex.value = (selectedIndex.value + direction + total) % total;
};

const executeSelected = () => {
  const item = filteredItems.value[selectedIndex.value];
  if (item) execute(item);
};

const execute = (item: PaletteItem) => {
  item.action();
  close();
};

const close = () => {
  open.value = false;
  emit('close');
};

// Reka's Dialog owns open/close (escape, outside-click, focus trap, scroll lock).
const onOpenChange = (value: boolean) => {
  if (!value) close();
};

// Move focus straight to the search field instead of the dialog container.
const focusInput = () => {
  nextTick(() => searchInput.value?.focus());
};
</script>

<style scoped>
.palette-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.palette-content {
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
  width: 100%;
  max-width: 520px;
  padding: 0 1rem;
  outline: none;
}

.palette-container {
  width: 100%;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  animation: palette-slide-in 0.15s ease-out;
}

@keyframes palette-slide-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.palette-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.palette-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.9375rem;
  color: var(--color-text);
  font-family: var(--font-sans);
}

.palette-input::placeholder {
  color: var(--color-text-muted);
}

.palette-kbd {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.04em;
  padding: 0.125rem 0.375rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-muted);
  background: var(--color-bg-secondary);
  line-height: 1.4;
}

.palette-results {
  max-height: 320px;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.palette-group {
  padding: 0.25rem 0;
}

.palette-group-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.375rem 1rem 0.25rem;
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.08s ease;
}

.palette-item--active {
  background: var(--color-bg-secondary);
}

.palette-item-label {
  flex: 1;
  font-size: 0.875rem;
  color: var(--color-text);
}

.palette-item-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.palette-empty {
  padding: 2rem 1rem;
  text-align: center;
}
</style>
