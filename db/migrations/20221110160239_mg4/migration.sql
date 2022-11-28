/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `role` DROP DEFAULT;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `token`;
