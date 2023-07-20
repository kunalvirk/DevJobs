const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: ['avatars.githubusercontent.com', 'icons8.com']
  },
  experimental: {
    newNextLinkBehavior: true,
  }
};
