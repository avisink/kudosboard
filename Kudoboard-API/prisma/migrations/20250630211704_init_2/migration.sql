/*
  Warnings:

  - Added the required column `upvote_count` to the `KudosCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudosCard" ADD COLUMN     "upvote_count" INTEGER NOT NULL;
