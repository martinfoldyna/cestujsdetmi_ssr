module.exports = {
  images: {
    domains: [
      "www.cestujsdetmi.cz",
      "storage.googleapis.com",
      "exports.holidayinfo.cz",
      "www.webcamlive.cz",
      "www.holidayinfo.cz",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
