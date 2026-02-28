import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'cloudflare-pages',
    routeRules: {
      '/api/**': { proxy: process.env.NUXT_PUBLIC_API_BASE ? `${process.env.NUXT_PUBLIC_API_BASE}/**` : 'https://thebravebyte.onrender.com/api/**' }
    }
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
  },

  googleFonts: {
    families: {
      "Lora": [400, 500, 600, 700],
      "Inter": [400, 500, 600],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },

  css: [
    "~/assets/css/tailwind.css"
  ],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key-change-me',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://thebravebyte.onrender.com/api',
      siteUrl: 'https://thebravebyte.com',
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: "en" },
      title: "The Brave Byte | Yusuf Akinleye",
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo-ya.svg' },
        { rel: 'icon', type: 'image/png', href: '/logo-ya-light.png' },
      ],
      meta: [
        { name: "description", content: "Engineering the future with code. A premium blog by Yusuf Akinleye." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: "The Brave Byte | Yusuf Akinleye" },
        { property: "og:description", content: "Backend engineer building high-performance systems, APIs, and distributed architectures." },
        { property: "og:image", content: "https://thebravebyte.com/logo-ya-light.png" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:image", content: "https://thebravebyte.com/logo-ya-light.png" },
      ],
    },
  },
});
