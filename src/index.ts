import { Command } from 'commander';
import { startServer } from './app';  

const program = new Command();

program
  .command('server')
  .option('-p, --port <number>', 'port to listen on', "3000")  
  .action((cmd) => {
    startServer(cmd);
  });

program.parse(process.argv);