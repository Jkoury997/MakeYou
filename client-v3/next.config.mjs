import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  swSrc: 'public/sw.js',
});

// Configuración general de Next.js
const nextConfig = {
    reactStrictMode: true,
    // Aquí puedes añadir más configuraciones específicas de Next.js
  };

export default withPWA(
  // Your Next.js config
  nextConfig
);

