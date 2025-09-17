/*
  Warnings:

  - You are about to drop the column `folderName` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "video" DROP COLUMN "folderName",
DROP COLUMN "resolution";
