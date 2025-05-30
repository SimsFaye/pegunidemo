/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/quotes/overview",
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}

export default nextConfig
