module.exports = {
  apps: [{
    name: "gaslighter",
    script: "npx",
    args: "serve dist -l 8080",
    env: {
      NODE_ENV: "production"
    }
  }]
};
