/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [{ source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }, { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
    },
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'jyhoyiajazbveoahlnky.supabase.co',
                port: '',
                pathname: '/storage/**',
            },{
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: 'xlhvzoxniouinwvwccjd.supabase.co',
                port: '',
                pathname: '/storage/**',
            },
        ],
    }
};

export default nextConfig;
