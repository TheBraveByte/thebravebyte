<template>
  <section id="home" class="pt-14 md:pt-20 pb-12">
    <div class="container flex flex-col items-center text-center">
      <img
        src="/img/yusuf.jpg"
        alt="Yusuf Akinleye"
        class="w-16 h-16 rounded-full object-cover mb-4"
      />

      <span class="inline-flex items-center gap-1.5 text-xs text-text-muted mb-3">
        <span class="relative flex h-1.5 w-1.5">
          <span class="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping"></span>
          <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
        </span>
        Open to work
      </span>

      <h1 class="text-[17px] font-semibold text-text leading-tight mb-1">Yusuf Akinleye</h1>
      <span class="text-sm text-text-muted mb-6">
        Software engineer at <span class="text-text">RIXL</span>
        <span class="text-text-muted"> · </span>
        Co-founder at <span class="text-text">Eazyfit</span>
      </span>

      <p class="text-[15px] text-text-secondary leading-[1.7] max-w-[52ch]">
        Backend engineer shipping APIs and distributed systems in Go and Python.
        Currently building usage-based billing and media infra at
        <a href="https://rixl.xyz" target="_blank" rel="noopener noreferrer" class="text-text prose-link">RIXL</a>.
      </p>

      <div class="flex flex-wrap justify-center gap-2 mt-6">
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
