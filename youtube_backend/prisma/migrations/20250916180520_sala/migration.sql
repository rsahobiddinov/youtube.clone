/*
  Warnings:

  - Added the required column `folderName` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video" ADD COLUMN     "folderName" TEXT NOT NULL,
ADD COLUMN     "resolution" TEXT NOT NULL;
