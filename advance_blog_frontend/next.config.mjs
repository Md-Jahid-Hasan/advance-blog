/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['placeholder.pics', '127.0.0.1'], // Add the domain here
        dangerouslyAllowSVG: true, // Enable SVG support
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional: Add a CSP for security
    },
};

export default nextConfig;
