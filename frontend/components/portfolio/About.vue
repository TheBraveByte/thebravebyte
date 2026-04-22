<template>
  <section id="about" class="py-10">
    <div class="container">
      <h2 class="text-sm font-medium text-text-muted mb-4">About</h2>

      <div class="space-y-4 text-[15px] text-text-secondary leading-[1.7]">
        <p>
          Five years writing production code. Comfortable from the TCP socket
          up through the API layer. Most of my work sits close to data —
          queues, payments, search, the unglamorous parts that break first
          under real load.
        </p>
        <p>
          I pick tools based on fit, not fashion. Go for concurrency-heavy
          work, Python for data and ML, PostgreSQL when I need correctness,
          Redis where latency matters.
        </p>
      </div>

      <ul class="mt-8 space-y-3 text-[15px] text-text-secondary">
        <li class="flex items-start gap-3">
          <Icon name="lucide:check" class="w-4 h-4 mt-1 text-text-muted shrink-0" />
          <span><span class="text-text font-medium">Clarity over cleverness.</span> Code is read more than written.</span>
        </li>
        <li class="flex items-start gap-3">
          <Icon name="lucide:check" class="w-4 h-4 mt-1 text-text-muted shrink-0" />
          <span><span class="text-text font-medium">Measure first.</span> No optimization without a benchmark.</span>
        </li>
        <li class="flex items-start gap-3">
          <Icon name="lucide:check" class="w-4 h-4 mt-1 text-text-muted shrink-0" />
          <span><span class="text-text font-medium">Fail loudly.</span> Crash clean, log everything, recover deterministically.</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
</script>
