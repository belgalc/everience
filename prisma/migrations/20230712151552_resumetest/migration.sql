/*
  Warnings:

  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CV" DROP CONSTRAINT "CV_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resume" JSONB;

-- DropTable
DROP TABLE "CV";
