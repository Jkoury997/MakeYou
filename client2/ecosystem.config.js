module.exports = {
  apps : [{
    name: "react-app",
    script: "npm",
    args: "run preview",
    watch: true,
    env: {
      "PORT": 4173,
      "HOST": "localhost"
    }
  }]
};
  