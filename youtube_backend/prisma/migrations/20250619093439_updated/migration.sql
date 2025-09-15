/*
  Warnings:

  - You are about to alter the column `totalViews` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "totalViews" SET DATA TYPE INTEGER;
