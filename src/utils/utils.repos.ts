import { existsSync, readFileSync, writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';

import config from '../config';
import { logger } from '../logger/log';

const constructDatabaseUrl = (): string => {
    const { host, user, pass, name, connectionLimit } = config.db;
    return `postgresql://${user}:${pass}@${host}:5432/${name}?connection_limit=${connectionLimit}`;
};

const envPath = join(process.cwd(), 'src', 'prisma', '.env');
const databaseUrlEntry = `DATABASE_URL="${constructDatabaseUrl()}"`;

const generateEnvFile = () => {
    if (existsSync(envPath)) {
        const envContent = readFileSync(envPath, 'utf-8');
        if (envContent.includes('DATABASE_URL=')) {
            const updatedContent = envContent.replace(/DATABASE_URL=.*/g, databaseUrlEntry);
            writeFileSync(envPath, updatedContent, 'utf-8');
            logger.info('.env file updated with new DATABASE_URL.');
        } else {
            appendFileSync(envPath, `\n${databaseUrlEntry}`, 'utf-8');
            logger.info('DATABASE_URL added to existing .env file.');
        }
    } else {
        writeFileSync(envPath, `${databaseUrlEntry}\n`, 'utf-8');
        logger.info('.env file created and DATABASE_URL added.');
    }
};

generateEnvFile();

export { constructDatabaseUrl, generateEnvFile };
