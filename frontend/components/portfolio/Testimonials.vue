<template>
  <section id="clients" class="py-10">
    <div class="container">
      <h2 class="text-sm font-medium text-text-muted mb-4">Worked with</h2>
      <p class="text-[15px] text-text-secondary leading-[1.7]">
        <span v-for="(c, i) in companies" :key="c">
          <span v-if="i > 0" class="text-text-muted">, </span>
          <span class="text-text">{{ c }}</span>
        </span>.
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const companies = [
  'Rexall',
  'RiXL',
  'Wayg',
  '1Go Technologies',
  'EazyFit',
  'Toptech',
  'BiTraq',
  'Contra',
  'SQE',
];
</script>
