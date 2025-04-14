/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/invite',
        has: [{ type: 'query', key: 'inviteCode' }],
        destination: '/invite/:inviteCode',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
