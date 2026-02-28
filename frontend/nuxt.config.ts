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
      meta: [
        { name: "description", content: "Engineering the future with code. A premium blog by Yusuf Akinleye." },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
    },
  },
});
