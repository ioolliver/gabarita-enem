import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "enem.dev"
            },
            {
                hostname: "i.imgur.com"
            }
        ]
    }
};

export default nextConfig;
