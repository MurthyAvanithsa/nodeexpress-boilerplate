// src/routes/index.ts
import path from 'path';
import fs from 'fs';

import { Router } from 'express';

import { logger } from '../logger/log';

const router = Router();

const routePath = path.join(__dirname, '../routes');
const routeFiles = fs.readdirSync(routePath).filter(file => file.startsWith('routes.') && file.endsWith('.ts'));

(async () => {
    for (const file of routeFiles) {
        const filePath = path.join(routePath, file);

        try {
            const route = await import(filePath);
            if (route?.default && typeof route.default === 'function') {
                router.use(route.default);
            } else {
                logger.error(`File at ${filePath} does not export a valid default function.`);
            }
        } catch (error) {
            logger.error(`Error registering route from ${filePath}: ${error instanceof Error ? error.message : error}`);
        }
    }
})();

export default router;
