// import nextJest from "@blitzjs/next/jest"
nextJest = require("@blitzjs/next/jes")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
}
export default createJestConfig(customJestConfig)
