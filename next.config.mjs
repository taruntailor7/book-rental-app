/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['cdn.codegym.cc', 'another-domain.com', 'yet-another-domain.com', 'static.thenounproject.com','example.com','images-na.ssl-images-amazon.com','*'],
  },
};

export default nextConfig;
