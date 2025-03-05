-- AlterTable
ALTER TABLE `Draft` ADD COLUMN `googleDriveFileId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `accessToken` VARCHAR(191) NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL;
