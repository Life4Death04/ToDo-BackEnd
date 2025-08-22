/*
  Warnings:

  - You are about to drop the column `check` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `task` table. All the data in the column will be lost.
  - Added the required column `taskName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `check`,
    DROP COLUMN `content`,
    ADD COLUMN `description` VARCHAR(200) NULL,
    ADD COLUMN `dueDate` DATE NULL,
    ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    ADD COLUMN `status` ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TODO',
    ADD COLUMN `taskName` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phoneNumber` VARCHAR(30) NULL,
    ADD COLUMN `profileImage` VARCHAR(255) NULL;
