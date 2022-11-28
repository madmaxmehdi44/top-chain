/*
  Warnings:

  - A unique constraint covering the columns `[permalink]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permalink` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organization` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `permalink` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Organization_permalink_key` ON `Organization`(`permalink`);
