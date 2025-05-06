/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://js.stripe.com https://hooks.stripe.com;"
          }
        ]
      }
    ];
  },
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
