/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@shivai/identity-sdk'],
  images: {
    domains: ['aqbcunbxvdyriifccnva.supabase.co'],
  },
};

module.exports = nextConfig;
