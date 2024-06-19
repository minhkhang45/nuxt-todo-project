// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-directus", "nuxt-time"],
  runtimeConfig: {
    public: {
      directus: {
        url: "https://minhkhang.hoachnt.com/"
      }
    }
  }
})