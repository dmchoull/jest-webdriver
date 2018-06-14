const NodeEnvironment = require('jest-environment-node');
const { Builder, By, until } = require('selenium-webdriver');

const { setBuilderBrowserOptions } = require('./ConfigureBuilder');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const options = config.testEnvironmentOptions || {};
    this.browserName = options.browser || 'chrome';
    this.browserOptions = options.browserOptions || {};
    this.seleniumAddress = options.seleniumAddress || null;
  }

  async setup() {
    await super.setup();
    
    let builder = new Builder();

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
    if (this.driver) {
      await this.driver.close();

      // https://github.com/mozilla/geckodriver/issues/1151
      try {
        await this.driver.quit();
      } catch (error) { }
    }

    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
