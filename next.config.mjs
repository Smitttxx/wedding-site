/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "frame-src https://www.youtube.com https://www.youtube-nocookie.com;"
      }
    ],
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
  },  
};

export default nextConfig;
