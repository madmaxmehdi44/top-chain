/*
  Warnings:

  - Added the required column `isDefault` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `membership` ADD COLUMN `isDefault` BOOLEAN NOT NULL;
