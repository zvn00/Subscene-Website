module.exports = {
  apps: [
    {
      name: "SubtitleZ",
      script: "./server.js",
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
