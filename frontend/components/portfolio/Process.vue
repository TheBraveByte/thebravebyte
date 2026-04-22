<template>
  <section id="process" class="py-10">
    <div class="container">
      <h2 class="text-sm font-medium text-text-muted mb-4">How I work</h2>

      <ol class="space-y-4 text-[15px] text-text-secondary leading-[1.7]">
        <li class="flex items-start gap-3">
          <span class="text-text-muted text-sm tabular-nums mt-0.5">01</span>
          <span>
            <span class="text-text font-medium">Business first.</span>
            Start with who the system is for, and what they'll pay for.
          </span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-text-muted text-sm tabular-nums mt-0.5">02</span>
          <span>
            <span class="text-text font-medium">Trade-offs, named.</span>
            Every decision gets a short ADR: what, why, and what it costs.
          </span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-text-muted text-sm tabular-nums mt-0.5">03</span>
          <span>
            <span class="text-text font-medium">Ship with numbers.</span>
            Every system goes live with metrics and SLOs, not promises.
          </span>
        </li>
      </ol>

      <NuxtLink
        to="/process"
        class="mt-6 inline-flex items-center gap-1.5 text-sm text-text prose-link"
      >
        Full architecture notes
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
</script>
