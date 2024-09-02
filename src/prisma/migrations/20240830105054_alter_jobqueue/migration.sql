/*
  Warnings:

  - A unique constraint covering the columns `[queueName,jobId]` on the table `JobQueue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JobQueue" ADD COLUMN     "error" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "JobQueue_queueName_jobId_key" ON "JobQueue"("queueName", "jobId");
