module.exports = {
  apps: [
    {
      name: 'ratherlabs-backend',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
