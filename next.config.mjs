/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
    }
};

export default nextConfig;
