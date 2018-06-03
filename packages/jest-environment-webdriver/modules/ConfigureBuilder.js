/**
 * @param {Options} browserOptions
 * @param {[string, string][]} preferences
 */
function setOptionPreferences(browserOptions, preferences) {
  for (const [key, value] of preferences) {
    browserOptions.setPreference(key, value);
  }
}

function setChromeOptions(builder, options) {
  const seleniumChrome = require('selenium-webdriver/chrome');

  if (options.capabilities) {
    builder.withCapabilities(options.capabilities);
  }

  if (options.driver) {
    builder.setChromeService(new seleniumChrome.ServiceBuilder(options.driver));
  }

  const chromeOptions = new seleniumChrome.Options();

  if (options.headless) {
    chromeOptions.headless();
  }

  if (options.preferences) {
    setOptionPreferences(firefoxOptions, options.preferences);
  }

  builder.setChromeOptions(chromeOptions);
}

function setEdgeOptions(builder, options) {
  const seleniumEdge = require('selenium-webdriver/edge');

  if (options.capabilities) {
    builder.withCapabilities(options.capabilities);
  }

  if (options.driver) {
    builder.setEdgeService(new seleniumEdge.ServiceBuilder(options.driver));
  }

  const edgeOptions = new seleniumEdge.Options();

  if (options.preferences) {
    setOptionPreferences(firefoxOptions, options.preferences);
  }

  builder.setEdgeOptions(edgeOptions);
}

function setFirefoxOptions(builder, options) {
  const seleniumFirefox = require('selenium-webdriver/firefox');

  if (options.capabilities) {
    builder.withCapabilities(options.capabilities);
  }

  if (options.driver) {
    builder.setFirefoxService(new seleniumFirefox.ServiceBuilder(options.driver));
  }

  const firefoxOptions = new seleniumFirefox.Options();

  if (options.headless) {
    firefoxOptions.headless();
  }

  if (options.preferences) {
    setOptionPreferences(firefoxOptions, options.preferences);
  }

  builder.setFirefoxOptions(firefoxOptions);
}

function setSafariOptions(builder, options) {
  const seleniumSafari = require('selenium-webdriver/safari');

  if (options.capabilities) {
    builder.withCapabilities(options.capabilities);
  }

  if (options.driver) {
    builder.setSafariService(new seleniumSafari.ServiceBuilder(options.driver));
  }

  const safariOptions = new seleniumSafari.Options();

  if (options.preferences) {
    setOptionPreferences(firefoxOptions, options.preferences);
  }

  builder.setSafariOptions(safariOptions);
}

module.exports.setBuilderBrowserOptions = function (builder, browserOptions) {
  if (browserOptions.chrome) {
    setChromeOptions(builder, browserOptions.chrome);
  }

  if (browserOptions.edge) {
    setEdgeOptions(builder, browserOptions.edge);
  }

  if (browserOptions.firefox) {
    setFirefoxOptions(builder, browserOptions.firefox);
  }

  if (browserOptions.safari) {
    setSafariOptions(builder, browserOptions.safari);
  }
}
