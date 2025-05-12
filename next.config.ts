import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // @ts-expect-error
    appDir: true,
    prefetchOnHover: true,
  },
}

export default nextConfig
