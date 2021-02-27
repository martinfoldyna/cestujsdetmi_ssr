module.exports = {
  images: {
    domains: [
      "www.cestujsdetmi.cz",
      "storage.googleapis.com",
      "exports.holidayinfo.cz",
      "www.webcamlive.cz",
      "www.holidayinfo.cz",
      "sah.x3w.cz",
      "webkamery.gc-system.cz",
      "firebasestorage.googleapis.com",
      "www.ceske-sjezdovky.cz",
      "image.unet.cz",
      "files.previo.cz",
      "www.kdykde.cz",
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
