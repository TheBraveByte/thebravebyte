import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      Outfit: [300, 400, 500, 600, 700],
      "Fira Code": [400],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/main.css",
    "~/assets/css/animations.css"
  ],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET || 'super-secret-key-change-me',
    public: {
      siteUrl: 'https://thebravebyte.com',
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "The Brave Byte | Yusuf Akinleye",
      meta: [
        { name: "description", content: "Engineering the future with code. A premium blog by Yusuf Akinleye." },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
    },
  },
});
