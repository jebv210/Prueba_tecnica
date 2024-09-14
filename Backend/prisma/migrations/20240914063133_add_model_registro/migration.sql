/*
  Warnings:

  - Added the required column `telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "telefono" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "idUser" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Registro_id_key" ON "Registro"("id");

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
