-- CreateTable
CREATE TABLE `UserSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theme` ENUM('LIGHT', 'DARK') NOT NULL DEFAULT 'LIGHT',
    `dateFormat` ENUM('MM_DD_YYYY', 'DD_MM_YYYY', 'YYYY_MM_DD') NOT NULL DEFAULT 'MM_DD_YYYY',
    `language` ENUM('EN', 'ES') NOT NULL DEFAULT 'EN',
    `defaultPriority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM',
    `defaultStatus` ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TODO',
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `UserSettings_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSettings` ADD CONSTRAINT `UserSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
