/*
  Warnings:

  - You are about to drop the column `name` on the `list` table. All the data in the column will be lost.
  - Added the required column `title` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `list` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(50) NOT NULL,
    MODIFY `color` VARCHAR(20) NOT NULL DEFAULT '#000000';
