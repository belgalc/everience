/*
  Warnings:

  - You are about to drop the column `mission` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "mission",
ADD COLUMN     "missions" JSONB[];
