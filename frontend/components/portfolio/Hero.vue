<template>
  <section id="home" class="pt-16 md:pt-24 pb-14">
    <div class="container">
      <div class="flex items-start gap-4 mb-8">
        <img src="/img/yusuf.jpg" alt="Yusuf Akinleye" class="w-14 h-14 rounded-full object-cover shrink-0" />
        <div class="flex flex-col">
          <h1 class="text-xl font-semibold text-text leading-tight">Yusuf Akinleye</h1>
          <span class="text-sm text-text-muted">Software engineer · Backend &amp; distributed systems</span>
          <span class="mt-1.5 inline-flex items-center gap-1.5 text-xs text-text-muted">
            <span class="relative flex h-1.5 w-1.5">
              <span class="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
            </span>
            Open to work
          </span>
        </div>
      </div>

      <div class="space-y-4 text-[15px] text-text-secondary leading-[1.7]">
        <p>
          I build backend services and APIs — mostly in Go and Python.
          Currently at <span class="text-text font-medium">Rexall</span>, working
          on systems that need to be fast, predictable, and cheap to operate.
        </p>
        <p>
          Before that, I shipped backends for fintech, media, and marketplaces.
          Things I care about: idempotency, observability, and picking the
          boring tool when it fits.
        </p>
      </div>

      <div class="flex flex-wrap gap-2.5 mt-7">
        <NuxtLink to="#work" class="btn-primary">
          See work
        </NuxtLink>
        <a href="mailto:ayaaakinleye@gmail.com" class="btn-secondary">
          <Icon name="lucide:mail" class="w-4 h-4" />
          Email
        </a>
        <a
          href="https://drive.google.com/file/d/13GTqHs-pQZamtD9SI3-Qth8Y1hg9C2nH/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary"
        >
          <Icon name="lucide:file-text" class="w-4 h-4" />
          Résumé
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
