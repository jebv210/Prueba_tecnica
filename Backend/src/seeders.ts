import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./utils/password";

const prisma = new PrismaClient // Crea una instancia de PrismaClient para realizar consultas a la base de datos.

async function truncate() {
    try {// Ejecuta una consulta SQL para vaciar la tabla y reiniciar el contador de IDs.
        await prisma.$executeRaw`TRUNCATE "Usuario" RESTART IDENTITY CASCADE`
        await prisma.$executeRaw`TRUNCATE "Registro" RESTART IDENTITY CASCADE`

        console.log('Truncate data completed')// Muestra un mensaje en consola indicando que el truncado se completó.
    } catch (error) {
        console.error('Error al truncar la tabla:', error)// Muestra un mensaje de error si ocurre algún problema.
    } finally {
        await prisma.$disconnect
    }
}

async function Usuario() {// Función para crear 10 usuarios en la base de datos.
    for(let i = 1; i <= 10; i++){
        const hashedPassword = await hashPassword(`usuario${i}conclave${i}`);// Encripta la contraseña usando hashPassword.
        await prisma.usuario.create({
            data:{
                "name": `User ${i}`,
                "email": `user@gmail${i}.com`,
                "password": hashedPassword,
                "telefono": 123456789,
                "address": `Calle ${i} con Av. ${i}`,
                "type":  "administrador"
            }
        })
    }
    console.log ('Usuario')
}

async function Registro() {// Función para crear 9 registros de ingreso en la base de datos.
    for(let i = 1; i <= 9; i++){
        await prisma.registro.create({
            data:{
                "idUser":i,
                "dateTime":`2024-09-0${i}T06:40:54.000Z`
            }
        })
    }
    console.log ('Registro')
}

async function seed() {// Función principal que ejecuta las funciones de truncar tablas y crear datos
    try {
        await truncate()    
        await Usuario()
        await Registro()
        
    } catch (error) {
        console.log('Error run seeder:', error)
    }
    finally {
        await prisma.$disconnect()// Cierra la conexión con la base de datos al finalizar.
    }    
}

seed() // Ejecuta la función de seeding.