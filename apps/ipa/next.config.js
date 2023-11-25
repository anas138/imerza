module.exports = {
  experimental: {
    outputStandalone: true,
  },
  async redirects() {
    return [
      {
        source: "/collateral",
        destination: "/collateral/generated",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/settings/overview",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/projects",
        permanent: true,
      },
    ];
  },
};
