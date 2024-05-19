/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zbxzxsfmhicrxyicaqzk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabinImages/**",
      },
    ],
  },
};

export default nextConfig;
