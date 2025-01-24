module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/steps/*.ts', 'src/support/*.ts'],
        paths: ['src/feature/*.feature'],
        format: ["json:./reports/cucumber-report.json" ], // This generates a JSON report for Allure
        formatOptions: { snippetInterface: 'async-await' },
        publishQuiet: true,
        timeout: 10000  // Increase to 10 seconds
    }
};

  