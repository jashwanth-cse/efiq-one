/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shake heavy icon and animation libraries at build time
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },

  // Compress HTML, CSS, JS responses
  compress: true,

  // Disable source maps in production for smaller bundles and better security
  productionBrowserSourceMaps: false,

  // Strip console.log in production builds for cleaner output
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Remove domains when adding actual external images
  },
};

export default nextConfig;
