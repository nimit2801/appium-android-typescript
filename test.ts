import { remote } from "webdriverio";
import { WebdriverIOConfig } from "@wdio/types/build/Capabilities";
import { Capabilities } from "@wdio/types";
const APP =
  "/Users/nimitsavant/Desktop/appium-android-javascript/app-release.apk";

const capabilities: Capabilities.RequestedStandaloneCapabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android",
  "appium:app": APP,
  "appium:noReset": false,
};

const wdOpts: WebdriverIOConfig = {
  hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT!, 10) || 4723,
  logLevel: "info",
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    // Install the app
    await driver.installApp(APP);

    // Open the app
    await driver.pause(5000); // Keep the app open for 5000 ms
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
