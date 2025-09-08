/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s"], // picks up *.spec.ts and *.test.ts
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
