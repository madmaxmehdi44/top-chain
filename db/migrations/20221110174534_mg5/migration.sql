-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('SUPERADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';
