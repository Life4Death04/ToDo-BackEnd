/*
  Warnings:

  - You are about to drop the column `archived` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `archived`,
    ADD COLUMN `listId` INTEGER NULL;

-- CreateTable
CREATE TABLE `List` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
