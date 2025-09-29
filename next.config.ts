import type {NextConfig} from "next";
import {dirname} from "path";
import {FlatCompat} from "@eslint/eslintrc";

const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});


const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ui: compat.extends(
          "/src/shared/shadcn-ui"
      )
      // ui: path.resolve(__dirname, "/src/shared/shadcn-ui"),
    }
    return config;
  }
};

export default nextConfig;
