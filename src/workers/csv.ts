import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { logger } from '../logger/log';

interface AdMarker {
    breaktime: number;
    break_mode: number;
    slot: number;
}

interface AdBreak {
    mediaId: string;
    markers: AdMarker[];
}

function csvToJson(csvFilePath: string): Promise<AdBreak[]> {
    return new Promise((resolve, reject) => {
        const results: AdBreak[] = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
            .on('data', (data: any) => {
                if (data.markers) {
                    try {
                        data.markers = JSON.parse(data.markers
                            .replace(/'/g, '"') 
                            .replace(/(\w+):/g, '"$1":')); 
                    } catch (e) {
                        logger.error('Error parsing markers:', e);
                        data.markers = [];
                    }
                }
                results.push(data as AdBreak);
            })
            .on('end', () => resolve(results))
            .on('error', (error: NodeJS.ErrnoException) => reject(error));
    });
}

const csvFilePath = path.join(__dirname, '/files/ad-breaks.csv');

async function getAdBreaks() {
    try {
        const adBreaks = await csvToJson(csvFilePath);
        logger.info('Converted JSON:', JSON.stringify(adBreaks, null, 2));
        return adBreaks;
    } catch (error) {
        logger.error('Error:', error);
        return [];
    }
}

export default getAdBreaks;
