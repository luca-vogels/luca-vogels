/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    publicRuntimeConfig: {
        trailingSlash: true,
        test: "test"
    },
    reactStrictMode: true,
    experimental: {
        serverActions: true,
        appDir: true,
        serverComponentsExternalPackages: ["lup-language"],
    }
}

export default nextConfig;
