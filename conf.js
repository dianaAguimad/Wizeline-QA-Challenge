const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    suites: {
        login: './tests/login.spec.js',
        mainPage: './tests/mainPage.spec.js'
      }, 
    multiCapabilities: [ {
        'browserName': 'chrome',
      }
    ], 
    plugins: [
      {
        package: 'protractor-screenshoter-plugin',
        screenshotPath: './reports/',
        screenshotOnExpect: 'failure+success',
        preserveDirectory: true,
        screenshotOnSpec: 'failure',
        withLogs: 'true',
        writeReportFreq: 'asap',
        imageToAscii: 'none',
        clearFoldersBeforeTest: true
      }
    ],
    jasminNodeOpts: {
      defaultTimeoutInterval: 30000
    },
    onPrepare: function () {
      jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
          displayStacktrace: false,
          savePath: './reports/',
          screenshotsFolder: 'images',
          takeScreenshots: true,
          fixedScreenshotName: true,
          consolidate: true,
          consolidateAll: true,
        }
      }));
      return browser.getProcessedConfig().then(function (config) {});
    }
  }