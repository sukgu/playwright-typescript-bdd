module.exports = {
  default: {
    require: [
      './features/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      '@cucumber/pretty-formatter'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    worldParameters: {
      appUrl: 'https://www.saucedemo.com/',
    },
    publishQuiet: true,
    paths: ['features/**/*.feature']
  }
};