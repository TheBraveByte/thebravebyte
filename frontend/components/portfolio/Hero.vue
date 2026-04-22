<template>
  <section id="home" class="pt-14 md:pt-20 pb-12">
    <div class="container">
      <div class="flex items-center gap-4 mb-7">
        <img
          src="/img/yusuf.jpg"
          alt="Yusuf Akinleye"
          class="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div class="flex flex-col min-w-0">
          <h1 class="text-[17px] font-semibold text-text leading-tight">Yusuf Akinleye</h1>
          <span class="text-sm text-text-muted truncate">
            Software engineer at <span class="text-text">RIXL</span>
          </span>
        </div>
        <span class="ml-auto inline-flex items-center gap-1.5 text-xs text-text-muted shrink-0">
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping"></span>
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
          </span>
          <span class="hidden sm:inline">Open to work</span>
        </span>
      </div>

      <p class="text-[15px] text-text-secondary leading-[1.7]">
        Backend engineer shipping APIs and distributed systems in Go and Python.
        Currently building usage-based billing and media infra at
        <a href="https://rixl.xyz" target="_blank" rel="noopener noreferrer" class="text-text prose-link">RIXL</a>.
      </p>

      <div class="flex flex-wrap gap-2 mt-6">
        <NuxtLink to="#work" class="btn-primary">
          See work
        </NuxtLink>
        <a href="mailto:ayaaakinleye@gmail.com" class="btn-secondary">
          <Icon name="lucide:mail" class="w-3.5 h-3.5" mode="css" />
          Email
        </a>
        <a
          href="https://drive.google.com/file/d/13GTqHs-pQZamtD9SI3-Qth8Y1hg9C2nH/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary"
        >
          Résumé
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
