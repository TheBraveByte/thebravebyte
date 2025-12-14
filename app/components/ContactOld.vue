<template>
  <section id="contact" class="py-24 bg-tertiary dark:bg-tertiary-dark">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-16">
          <h3
            class="text-xl uppercase tracking-widest text-primary mb-2 font-semibold flex items-center justify-center gap-3">
            <span class="w-2 h-2 bg-secondary rounded-full"></span>
            <span class="relative inline-block">
              Get In Touch
              <span class="absolute bottom-0 left-0 w-[80%] h-0.5 bg-secondary"></span>
            </span>
          </h3>
          <p class="font-light text-gray-600 dark:text-gray-300">Let's Scale Your Vision, Today.</p>
        </div>

        <!-- Main CTA -->
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
            Ready for Architecture that Defines Reliability?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build the infrastructure your business deserves. Whether you need to scale to millions of users or
            optimize for milliseconds, I'm ready to deliver results.
          </p>
          <a href="mailto:ayaaakinleye@gmail.com"
            class="inline-flex items-center gap-2 px-8 py-4 bg-primary dark:bg-white text-white dark:text-black rounded-lg hover:bg-primary/90 dark:hover:bg-gray-100 transition-all duration-300 group text-lg font-medium shadow-lg hover:shadow-xl">
            <Icon name="lucide:mail" class="w-5 h-5" />
            <span>Send me an email</span>
            <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <!-- Social Links -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-12">
          <h3 class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">Connect with me</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <a v-for="contact in contacts" :key="contact.name" :href="contact.href" :target="contact.target"
              :rel="contact.rel"
              class="group flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-secondary dark:hover:border-secondary hover:shadow-md transition-all duration-300">
              <Icon :name="contact.icon"
                class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-secondary transition-colors" />
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-secondary transition-colors">
                {{ contact.name }}
              </span>
              <Icon v-if="contact.target" name="lucide:external-link"
                class="w-3 h-3 text-gray-400! group-hover:text-secondary transition-colors" />
            </a>
          </div>
        </div>

        <!-- Quick Stats -->
        <!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <div class="text-3xl font-light text-gray-900 mb-1">24/7</div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">Available</div>
          </div>
          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <div class="text-3xl font-light text-gray-900 mb-1">&lt;24h</div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">Response Time</div>
          </div>
          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <div class="text-3xl font-light text-gray-900 mb-1">Remote</div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">Work Ready</div>
          </div>
          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <div class="text-3xl font-light text-gray-900 mb-1">Global</div>
            <div class="text-xs text-gray-500 uppercase tracking-wider">Time Zones</div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const contacts = [
  {
    name: 'GitHub',
    icon: 'devicon:github',
    href: 'https://github.com/TheBraveByte',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'LinkedIn',
    icon: 'devicon:linkedin',
    href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'Email',
    icon: 'lucide:mail',
    href: 'mailto:ayaaakinleye@gmail.com'
  },
  {
    name: 'X',
    icon: 'simple-icons:x',
    href: 'https://x.com/_iamyak',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {
    name: 'Blog',
    icon: 'simple-icons:hashnode',
    href: 'https://ayaacodes.hashnode.dev',
    target: '_blank',
    rel: 'noopener noreferrer'
  }
];
</script>