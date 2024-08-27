/*
  Warnings:

  - The `queryParams` column on the `Feed` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `filterParams` column on the `Filter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "queryParams",
ADD COLUMN     "queryParams" JSONB[];

-- AlterTable
ALTER TABLE "Filter" DROP COLUMN "filterParams",
ADD COLUMN     "filterParams" JSONB[] DEFAULT ARRAY[]::JSONB[];
