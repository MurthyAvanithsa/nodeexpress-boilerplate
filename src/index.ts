import { Command } from 'commander';

import 'dotenv/config'
import { startServer } from './app';
import config from './config';
import { BullMQTask } from './workers/generic.bullmq';
import { SQSTask } from './workers/generic.aws.sqs';
import { startWorker } from './workers/consumer';

const program = new Command();
export let queueProcessingTask: SQSTask | BullMQTask;

program
  .command('server')
  .option('-p, --port <number>', 'port to listen on', `${config.app.port}`)
  .action((cmd) => {
    config.app.port = cmd.port;
    queueProcessingTask = config.queue.queueProcessingMethod === "aws-sqs"? new SQSTask(config.queue.name): new BullMQTask(config.queue.name);
    startServer(cmd);
  });

program
  .command('worker')
  .option('-q, --queue <string>', 'queue name', config.queue.name || "")
  .option('-m, --method <string>', 'queue processing method', config.queue.queueProcessingMethod)
  .action((cmd) => {
    config.queue.queueProcessingMethod = cmd.method;
    config.queue.name = cmd.queue;
    queueProcessingTask = config.queue.queueProcessingMethod === "aws-sqs"? new SQSTask(config.queue.name): new BullMQTask(config.queue.name);
    startWorker();
  });

  program.command("*").action(() => {
    console.log("Command or option not found");
  })

program.parse(process.argv);
