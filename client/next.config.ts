// import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  rewrites(){
    return [
      {
        source:"/api/:path*",
        destination:"http://localhost:3000/:path*",
      }
    ]
  }
};

export default nextConfig;
