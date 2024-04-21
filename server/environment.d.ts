declare global {
    namespace NodeJS {
        interface ProcessEnv {
        SESSION_SECRET: string!;
        NODE_ENV: 'development' | 'production';
        PORT: number;
        HASH_FUNCTION: string;
        SESSION_SECRET: string;
        }
    }
}

export {};