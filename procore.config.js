module.exports = () => ({
  app: {
    entry: {
      redesign: "dist/main",
    },
  },
  jestOverride(config) {
    config.transformIgnorePatterns = [
      "node_modules/(?!(date-fns|@procore/core-react|@procore/core-icons)/)",
    ];
    return config;
  },
});
