-- CreateEnum
CREATE TYPE "tipo" AS ENUM ('administrador', 'empleado');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "tipo" NOT NULL DEFAULT 'empleado',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
