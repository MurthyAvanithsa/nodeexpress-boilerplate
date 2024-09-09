import { Command } from 'commander';

import 'dotenv/config'
import { startServer } from './app';  
import { startWorker } from './workers/generic';
import config from './config';

const program = new Command();

program
  .command('server')
  .option('-p, --port <number>', 'port to listen on', `${config.app.port}`)  
  .action((cmd) => {
    startServer(cmd);
  });

program
  .command('worker')
  .option('-q, --queue <string>', 'queue name', config.queue.GENERIC_WORKER_QUEUE)  
  .action((cmd) => {
    startWorker(cmd.queue);
  });

program.parse(process.argv);
