import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    preset: process.env.VERCEL ? "vercel" : "cloudflare-pages",
    // Ship every public page as real HTML; the crawler follows links from the home page.
    prerender: { routes: ["/", "/work", "/writing", "/about"], crawlLinks: true, failOnError: false },
    routeRules: {
      "/api/_nuxt_icon/**": {},
      "/blog": { redirect: { to: "/writing", statusCode: 301 } },
      "/article/**": { redirect: { to: "/writing/**", statusCode: 301 } },
      "/process": { redirect: { to: "/work", statusCode: 301 } },
      "/cv": { redirect: { to: "/about", statusCode: 301 } },
      "/api/**": {
        proxy: process.env.NUXT_PUBLIC_API_BASE
          ? `${process.env.NUXT_PUBLIC_API_BASE}/**`
          : "https://thebravebyte.onrender.com/api/**",
      },
    },
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "reka-ui/nuxt",
  ],

  icon: {
    provider: 'iconify',
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    }
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  googleFonts: {
    families: {
      "Source Serif 4": { wght: [400, 600], ital: [400] },
      "IBM Plex Mono": [400, 500],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  vite: {
    plugins: [tailwindcss()],
    // Engineering notes live in ../../stories so GitHub and the site share one source.
    server: { fs: { allow: [".."] } },
    build: {
      sourcemap: false,
    },
  },

  css: ["~/assets/css/tailwind.css"],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "super-secret-key-change-me",
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        "https://thebravebyte.onrender.com/api",
      siteUrl: "https://thebravebyte.pages.dev",
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: { lang: "en" },
      title: "Yusuf Akinleye",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/logo-ya.svg" },
        { rel: "icon", type: "image/png", href: "/logo-ya-light.png" },
      ],
      meta: [
        {
          name: "description",
          content:
            "Yusuf Akinleye, software engineer. Backend systems in Go: payments, APIs and background jobs.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: "Yusuf Akinleye" },
        {
          property: "og:description",
          content:
            "Software engineer. Backend systems in Go: payments, APIs and background jobs.",
        },
        {
          property: "og:image",
          content: "https://thebravebyte.pages.dev/logo-ya-light.png",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:image",
          content: "https://thebravebyte.pages.dev/logo-ya-light.png",
        },
      ],
    },
  },
});
