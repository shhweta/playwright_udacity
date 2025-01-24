module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/steps/*.ts', 'src/support/*.ts'],
        paths: ['src/feature/*.feature'],
        format: ['progress-bar'],
        formatOptions: { snippetInterface: 'async-await' },
        publishQuiet: true,
        timeout: 20000,  // Increased to 60 seconds
        parallel: 1      // Run tests sequentially
    }
};

  