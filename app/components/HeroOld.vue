<template>
  <section id="home" class="container mx-auto flex items-center pt-20">
    <div class="container mx-auto px-6 py-20">
      <div class="grid md:grid-cols-2 gap-16 md:gap-8 lg:gap-16 items-center">
        <div class="flex items-stretch gap-4 lg:gap-24 min-h-[400px] h-full">
          <div class="hidden lg:flex flex-col items-center gap-3">
            <span
              class="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 [writing-mode:vertical-lr] rotate-180">
              Backend Engineer
            </span>
            <div class="w-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <div class="self-center">
            <p class="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Hello, I'm</p>
            <h1 class="text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-8 leading-tight">
              Yusuf Akinleye
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
              I engineer the high-performance systems that power global businesses. Specializing in ultra-reliable
              microservices, distributed systems, and cloud-native architectures that guarantee speed, stability, and
              scale.
            </p>

            <NuxtLink to="#contact"
              class="inline-flex items-center gap-2 text-sm text-gray-900 dark:text-white hover:gap-3 transition-all group">
              <span class="font-medium">Contact me</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 translate-y-0.5" />
            </NuxtLink>

            <div class="flex justify-center md:justify-start gap-8 lg:gap-8 mt-12">
              <div class="text-center">
                <h3 class="text-4xl font-light text-gray-900 dark:text-white">7+</h3>
                <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">Mission-Critical Projects Launched</p>
              </div>
              <div class="text-center">
                <h3 class="text-4xl font-light text-gray-900 dark:text-white">99.9%</h3>
                <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">Guaranteed System Uptime</p>
              </div>
              <div class="text-center">
                <h3 class="text-4xl font-light text-gray-900 dark:text-white">60%</h3>
                <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">Performance Improvement (Average)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center md:justify-end group -translate-x-2 lg:-translate-x-4">
          <div class="relative w-full aspect-3/4 max-w-md">
            <!-- Animated border outline -->
            <div
              class="absolute inset-0 rounded-lg border-2 border-secondary translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 -z-10">
            </div>

            <!-- Main image container -->
            <div
              class="relative w-full h-full rounded-lg border-2 border-secondary overflow-hidden bg-muted group-hover:border-secondary transition-all duration-300 shadow-lg">
              <div class="relative w-full h-full">
                <NuxtImg src="/img/yusuf.jpg" alt="Yusuf Akinleye - Backend & Systems Engineer"
                  class="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                  format="webp" loading="eager" />
                <div
                  class="absolute inset-0 bg-linear-to-br from-secondary/30 via-secondary/20 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply">
                </div>
                <div
                  class="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>

</script>