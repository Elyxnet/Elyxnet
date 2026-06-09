/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Allow react-icons SVG imports
  transpilePackages: ["react-icons"],
};

export default nextConfig;
