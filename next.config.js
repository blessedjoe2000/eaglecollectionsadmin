/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "eaglecollectionstore.s3.amazonaws.com",
      "eaglecollections.s3.amazonaws.com",
      "i7l4i0sqmv.ufs.sh",
      "utfs.io",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' example.com;", // Replace example.com with your web app's domain
          },
          // Optionally, you can use X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://bw-chatbot-rho.vercel.app/", // Replace example.com with your web app's domain
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
