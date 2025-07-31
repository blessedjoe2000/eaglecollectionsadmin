/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "eaglecollectionstore.s3.amazonaws.com",
      "eaglecollections.s3.amazonaws.com",
    ],
  },

  api: {
    bodyParser: {
      sizeLimit: "7mb", // Set limit to 7mb
    },
  },
};

module.exports = nextConfig;
