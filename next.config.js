// @ts-check
const { withBlitz } = require("@blitzjs/next")
// const { multiTenantMiddleware } = require("@prisma-multi-tenant/blitz")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  // reactStrictMode: true,
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  //   return config
  // },
  // webpackDevMiddleware: (config) => {
  //   // Perform customizations to webpack dev middleware config
  //   // Important: return the modified config
  //   return config
  // },
  // middleware: [
  //   multiTenantMiddleware((req) => {
  //     return "prod"
  //   }),
  // ],
  // i18n: {
  //   locales: ["en-US", "fa-IR", "nl-NL"],
  //   defaultLocale: "en-US",
  //   // domains: [
  //   //   {
  //   //     domain: "example.com",
  //   //     defaultLocale: "en-US",
  //   //   },
  //   //   {
  //   //     domain: "example.nl",
  //   //     defaultLocale: "nl-NL",
  //   //   },
  //   //   {
  //   //     domain: "example.fa",
  //   //     defaultLocale: "fa-IR",
  //   //     // an optional http field can also be used to test
  //   //     // locale domains locally with http instead of https
  //   //     http: true,
  //   //   },
  //   // ],
  // },
  // images: { domains: ["placeimg.com"], formats: ["image/avif", "image/webp"] },
}

module.exports = withBlitz(config)
