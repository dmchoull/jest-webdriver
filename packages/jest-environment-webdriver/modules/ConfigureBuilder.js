function buildOptions(OptionsClass, options) {
  const browserOptions = new OptionsClass();

  if (options.arguments) {
    browserOptions.addArguments.apply(browserOptions, options.arguments);
  }

  if (options.headless) {
    browserOptions.headless();
  }

  if (options.preferences) {
    setOptionPreferences(browserOptions, options.preferences);
  }

  return browserOptions;
}

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
  const chromeOptions = buildOptions(seleniumChrome.Options, options);
  builder.setChromeOptions(chromeOptions)

  if (options.driver) {
    builder.setChromeService(new seleniumChrome.ServiceBuilder(options.driver));
  }
}

function setEdgeOptions(builder, options) {
  const seleniumEdge = require('selenium-webdriver/edge');
  const edgeOptions = buildOptions(seleniumEdge.Options, options);
  builder.setEdgeOptions(edgeOptions);

  if (options.driver) {
    builder.setEdgeService(new seleniumEdge.ServiceBuilder(options.driver));
  }
}

function setFirefoxOptions(builder, options) {
  const seleniumFirefox = require('selenium-webdriver/firefox');
  const firefoxOptions = buildOptions(seleniumFirefox.Options, options);
  builder.setFirefoxOptions(firefoxOptions);

  if (options.driver) {
    builder.setFirefoxService(new seleniumFirefox.ServiceBuilder(options.driver));
  }
}

function setSafariOptions(builder, options) {
  const seleniumSafari = require('selenium-webdriver/safari');
  const safariOptions = buildOptions(seleniumSafari.Options, options);
  builder.setSafariOptions(safariOptions);

  if (options.driver) {
    builder.setSafariService(new seleniumSafari.ServiceBuilder(options.driver));
  }
}

module.exports.setBuilderBrowserOptions = function (builder, browserOptions) {
  if (browserOptions.capabilities) {
    builder.withCapabilities(browserOptions.capabilities);
  }

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
