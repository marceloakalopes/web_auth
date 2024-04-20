declare global {
    namespace NodeJS {
        interface ProcessEnv {
        SESSION_SECRET: string!;
        NODE_ENV: 'development' | 'production';
        PORT: number;
        }
    }
}

export {};