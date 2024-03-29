/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable ESLint running during build
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Disable TypeScript type checking during build
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;
