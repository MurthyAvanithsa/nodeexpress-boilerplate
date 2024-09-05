import dotenv from 'dotenv';

const getEnvConfig = () => {
    dotenv.config();
    const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
    Object.keys(process.env).forEach(key => {
        delete process.env[key];
    });
    return envFile;
};

dotenv.config({
    path: getEnvConfig()
});

interface Config {
    db: {
        host: string,
        user: string,
        pass: string,
        name: string,
        connectionLimit?: number
    },
    redis: {
        host: string,
        port: number
    },
    queue: {
        GENERIC_WORKER_QUEUE: string,
    },
    app: {
        host: string,
        port: number
    }
}

const config: Config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        pass: process.env.DB_PASS || 'postgres',
        name: process.env.DB_NAME || 'dsp',
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '5')
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379')
    },
    queue: {
        GENERIC_WORKER_QUEUE: process.env.ADBREAKS_JOB_QUEUE || 'adbreaks-job-queue'
    },
    app: {
        host: process.env.APP_HOST || 'localhost',
        port: parseInt(process.env.APP_PORT || '3000')
    }
}

export default config;