import tailwindcss from "@tailwindcss/vite";
import { published } from "./utils/note-dates";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    // Every page is prerendered except /writing, which Vercel regenerates hourly so new
    // Hashnode posts appear without a redeploy.
    prerender: { routes: ["/", "/work", "/about", "/sitemap.xml", ...Object.keys(published).map(s => `/writing/${s}`)], crawlLinks: true, ignore: [/^\/writing$/], failOnError: false },
  },

  routeRules: {
    "/writing": { isr: 3600 },
    // Old URLs from the previous site.
    "/blog": { redirect: { to: "/writing", statusCode: 301 } },
    "/cv": { redirect: { to: "/about", statusCode: 301 } },
    "/process": { redirect: { to: "/work", statusCode: 301 } },
    "/article/river-postgres-video-pipeline": { redirect: { to: "https://ayaacodes.hashnode.dev/river-postgres-video-pipeline", statusCode: 301 } },
    "/writing/river-postgres-video-pipeline": { redirect: { to: "https://ayaacodes.hashnode.dev/river-postgres-video-pipeline", statusCode: 301 } },
    "/article/simple-telegram-bot": { redirect: { to: "https://ayaacodes.hashnode.dev/simple-telegram-bot", statusCode: 301 } },
    "/writing/simple-telegram-bot": { redirect: { to: "https://ayaacodes.hashnode.dev/simple-telegram-bot", statusCode: 301 } },
    "/article/**": { redirect: { to: "/writing", statusCode: 301 } },
  },

  modules: [
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
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
      Inter: [400, 500, 600],
      "Roboto Mono": [400, 500],
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
    public: { siteUrl: "https://yusuf.foldlabs.pro" },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: { lang: "en" },
      title: "Yusuf Akinleye",
      // Opt in to scroll reveals before first paint; skipped for reduced motion. If the
      // app hasn't started within 3s, show everything rather than leave content hidden.
      script: [{ innerHTML: "(function(d){if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;d.classList.add('js-reveal');setTimeout(function(){if(!window.__reveal)d.classList.remove('js-reveal')},3000)})(document.documentElement)" }],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "alternate", type: "application/rss+xml", title: "Yusuf Akinleye on Hashnode", href: "https://ayaacodes.hashnode.dev/rss.xml" },
      ],
      meta: [
        { name: "description", content: "Yusuf Akinleye, backend software and platform engineer. I build reliable systems." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#fafaf9", media: "(prefers-color-scheme: light)" },
        { name: "theme-color", content: "#0e0e0d", media: "(prefers-color-scheme: dark)" },
        { property: "og:site_name", content: "Yusuf Akinleye" },
        { property: "og:title", content: "Yusuf Akinleye" },
        { property: "og:description", content: "Backend software and platform engineer. I build reliable systems." },
        { property: "og:image", content: "https://yusuf.foldlabs.pro/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Yusuf Akinleye, backend software and platform engineer" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "https://yusuf.foldlabs.pro/og.png" },
      ],
    },
  },
});
