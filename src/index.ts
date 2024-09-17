import { Command } from 'commander';

import 'dotenv/config'
import { startServer } from './app';
import { createSqsTask, startWorker } from './workers/generic';
import config from './config';
import SQSTask from './workers/consumer';

const program = new Command();
export let sqsTask: SQSTask;

program
  .command('server')
  .option('-p, --port <number>', 'port to listen on', `${config.app.port}`)
  .action((cmd) => {
    config.app.port = cmd.port;
    sqsTask = createSqsTask(config.aws.queueName);
    startServer(cmd);
  });

program
  .command('worker')
  .option('-q, --queue <string>', 'queue name', config.aws.queueName || "")
  .action((cmd) => {
    config.aws.queueName = cmd.queue;
    sqsTask = createSqsTask(config.aws.queueName);
    startWorker();
  });

program.parse(process.argv);
