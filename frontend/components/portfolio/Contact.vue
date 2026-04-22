<template>
  <section id="contact" class="py-10">
    <div class="container text-center">
      <h2 class="text-sm font-medium text-text-muted mb-4">Contact</h2>

      <p class="text-[15px] text-text-secondary leading-[1.7] mb-5 max-w-[52ch] mx-auto">
        Best reached by email. I read everything and reply within a day.
      </p>

      <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
        <li>
          <a
            href="mailto:ayaaakinleye@gmail.com"
            class="inline-flex items-center gap-2 text-text prose-link"
          >
            <Icon name="lucide:mail" class="w-4 h-4 text-text-muted" />
            ayaaakinleye@gmail.com
          </a>
        </li>
        <li
          v-for="c in contacts"
          :key="c.name"
        >
          <a
            :href="c.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-text prose-link"
          >
            <Icon :name="c.icon" class="w-4 h-4 text-text-muted" />
            {{ c.name }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
const contacts = [
  { name: 'GitHub', icon: 'lucide:github', href: 'https://github.com/TheBraveByte' },
  { name: 'LinkedIn', icon: 'lucide:linkedin', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/' },
  { name: 'X (Twitter)', icon: 'lucide:twitter', href: 'https://x.com/thebravebyte' },
  { name: 'Hashnode', icon: 'lucide:pen-tool', href: 'https://ayaacodes.hashnode.dev' },
  { name: 'Contra', icon: 'lucide:briefcase', href: 'https://contra.com/yusuf_akinleye_bb35981b4' },
];
</script>
