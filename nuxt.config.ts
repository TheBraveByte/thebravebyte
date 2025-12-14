import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      Outfit: [300, 400, 500],  // Light, Regular, Medium only
      "Fira Code": [400],  // Regular only for code
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  colorMode: {
    preference: "light",  // Default to light mode (floguo-inspired)
    fallback: "light",
    classSuffix: "",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET || 'super-secret-key-change-me',
    public: {
      siteUrl: 'https://thebravebyte.com',
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Yusuf Akinleye - Software Engineer (Backend Focus)",
      meta: [
        {
          name: "description",
          content:
            "Software Engineer specializing in backend development. Building scalable, production-grade APIs, distributed systems, modular monoliths, AI integration, and cloud-based architectures using Go and Python.",
        },
        {
          name: "keywords",
          content:
            "Software Engineer, Backend Engineer, Golang Developer, Python Developer, Distributed Systems, Modular Monoliths, Cloud Architecture, Microservices, AI Integration, System Design, API Development, AWS",
        },
        { name: "author", content: "Yusuf Akinleye" },
        // Open Graph
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Yusuf Akinleye - Software Engineer (Backend Focus)",
        },
        {
          property: "og:description",
          content:
            "Software Engineer specializing in backend development. Building scalable, production-grade APIs, distributed systems, modular monoliths, AI integration, and cloud-based architectures using Go and Python.",
        },
        { property: "og:image", content: "http://localhost:3000/og-image.jpg" },
        { property: "og:url", content: "http://localhost:3000" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Yusuf Akinleye - Software Engineer (Backend Focus)",
        },
        {
          name: "twitter:description",
          content:
            "Software Engineer specializing in backend development. Building scalable, production-grade APIs, distributed systems, modular monoliths, AI integration, and cloud-based architectures using Go and Python.",
        },
        {
          name: "twitter:image",
          content: "http://localhost:3000/og-image.jpg",
        },
      ],
    },
  },
});
