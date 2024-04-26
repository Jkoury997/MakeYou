module.exports = {
  apps : [{
    name: 'next-app',
    script: 'npm',
    args: 'start',
    watch: true,
    env: {
      NODE_ENV: 'production',
      PORT: 4000  // Asegúrate de configurar el puerto según tus necesidades
    }
  }]
};


