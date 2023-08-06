/*
  Warnings:

  - The primary key for the `UserJob` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserJob` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserJob" DROP CONSTRAINT "UserJob_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserJob_pkey" PRIMARY KEY ("jobId", "userEmail");
