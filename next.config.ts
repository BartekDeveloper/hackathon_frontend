import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        reactCompiler: {
            compilationMode: "all",
            panicThreshold: "CRITICAL_ERRORS"
        }
    },
    
    compress: true,

    crossOrigin: "anonymous",

    reactStrictMode: false,

    async redirects() {
        return [
            {
                source: "/backend",
                destination: "http://127.0.0.1:8080",
                permanent: true,
            },
            {
                source: "/assets",
                destination: "http://127.0.0.1:8080/assets",
                permanent: true,
            }
        ];
    },

    async headers() {
        return [
            {
                source: "/backend",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS"
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization"
                    }
                ],
            },
            {
            source: "/assets",
            headers: [
                {
                    key: "Access-Control-Allow-Origin",
                    value: "*",
                },
                {
                    key: "Access-Control-Allow-Methods",
                    value: "GET, POST, PUT, DELETE, OPTIONS"
                },
                {
                    key: "Access-Control-Allow-Headers",
                    value: "Content-Type, Authorization"
                }
            ],
            }
        ]
    }
};

export default nextConfig;
