<template>
  <section id="skills" class="py-10">
    <div class="container">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-[14px]">
        <div
          v-for="s in skills"
          :key="s.name"
          class="flex items-center gap-2 py-1"
        >
          <Icon :name="s.icon" class="w-4 h-4 text-text-muted" />
          <span class="text-text">{{ s.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  { name: 'Go', icon: 'lucide:terminal' },
  { name: 'Python', icon: 'lucide:terminal' },
  { name: 'TypeScript', icon: 'lucide:terminal' },
  { name: 'PostgreSQL', icon: 'lucide:database' },
  { name: 'MongoDB', icon: 'lucide:database' },
  { name: 'Redis', icon: 'lucide:zap' },
  { name: 'Kafka', icon: 'lucide:radio' },
  { name: 'gRPC', icon: 'lucide:git-branch' },
  { name: 'Docker', icon: 'lucide:box' },
  { name: 'AWS', icon: 'lucide:cloud' },
  { name: 'ClickHouse', icon: 'lucide:database' },
  { name: 'Linux', icon: 'lucide:server' },
];
</script>
