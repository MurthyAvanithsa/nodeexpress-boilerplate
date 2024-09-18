import dotenv from 'dotenv';
const awsConfig = {
    region: process.env.AWS_REGION || "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    queueName: process.env.AWS_QUEUE_NAME || "",
    accountId: process.env.AWS_ACCOUNT_ID || "",
    sessionToken: process.env.AWS_SESSION_TOKEN || ""
}
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
    app: {
        host: string,
        port: number
    },
    aws: {
        region: string,
        accessKeyId: string,
        secretAccessKey: string,
        queueName: string,
        accountId: string,
        sessionToken: string
    },
    swagger: {
        domain: string
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
    app: {
        host: process.env.APP_HOST || 'localhost',
        port: parseInt(process.env.APP_PORT || '3000')
    },
    aws: {
        region: awsConfig.region,
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
        queueName: awsConfig.queueName,
        accountId: awsConfig.accountId,
        sessionToken: awsConfig.sessionToken
    },
    swagger: {
        domain: process.env.SWAGGER_DOMAIN || 'dev-fulrxmb8tfh5ke8o.us.auth0.com'
    }
}

export default config;