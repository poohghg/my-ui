import type {NextConfig} from "next";
import path from "node:path";


const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ui: path.resolve(__dirname, "/src/shared/shadcn-ui"),
    }
    return config;
  }
};

export default nextConfig;
