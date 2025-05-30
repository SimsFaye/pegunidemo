/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/schoolsearch",
        permanent: true,
      },
    ]
  },
  rewrites: async () => {
    return [
      {
        source: "/schoolsearch",
        destination: "/schoolsearch/overview",
      },
    ]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
