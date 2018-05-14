const NodeEnvironment = require('jest-environment-node');
const { Builder, By, until } = require('selenium-webdriver');

const { setBuilderBrowserOptions } = require('./ConfigureBuilder');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const options = config.testEnvironmentOptions || {};
    this.browserName = options.browser || 'chrome';
    this.browserOptions = options.browserOptions || {};
    this.drivers = options.drivers || {};
    this.seleniumAddress = options.seleniumAddress || null;
  }

  async setup() {
    await super.setup();
    
    const builder = new Builder();

    setBuilderBrowserOptions(builder, this.browserOptions);

    if (this.seleniumAddress) {
      builder = builder.usingServer(this.seleniumAddress);
    }

    const driver = await builder
      .forBrowser(this.browserName)
      .build();

    this.driver = driver;

    this.global.by = By;
    this.global.browser = driver;
    this.global.element = locator => driver.findElement(locator);
    this.global.element.all = locator => driver.findElements(locator);
    this.global.until = until;
  }

  async teardown() {
    await this.driver.quit();
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
