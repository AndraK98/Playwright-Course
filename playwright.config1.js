// @ts-check
const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  retries: 1, // how many times the tests will run again if it doesn't pass the first time
  /* Maximum time one test can run for. */
  workers: 5, // parallel tests for execution of each test file
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "on",
       //...devices["iPhone 11"] //predefined dimensions for iPhone 11 or any other device
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "off",
        //...devices["iPhone 11"],
        video: 'retain-on-failure', // generates videos upon failiure
        // ignoreHttpsError: true, handling insecure http requests automatically
        // permissions: ['geolocation'], allowing permissions to access geolocations, microphone, etc...
        trace: "on",
        // viewport: {width: 720, height: 720} setting custom browser dimensions for responsiveness
      },
    },
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: "webkit",
    headless: true,
    screenshot: "on",
    trace: "on",
  },
};

module.exports = config;
