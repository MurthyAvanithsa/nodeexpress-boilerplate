import { processJob } from "../utils/handleJob";
import { queueProcessingTask } from "..";


function startWorker() {
  queueProcessingTask.startConsumer(processJob)
}

export { startWorker };