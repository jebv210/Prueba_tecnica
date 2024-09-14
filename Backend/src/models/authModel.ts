import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '../utils/password'; // Importa una función que verifica contraseñas.

const prisma = new PrismaClient() // Crea una instancia de PrismaClient para interactuar con la base de datos.

// Función para buscar un usuario por su email. (GET EMAIL)
export const userByEmail = async (email: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email:email, deleted_at: null },
        select:{
            password: true
        }
    })
    if(!user) return null
    return user//devuelve el o los registros
}

// Función para realizar el inicio de sesion (POST)
export const login = async (data: { email: string; password: string; current: string}) => {
     // Verifica si la contraseña proporcionada por el usuario coincide con la almacenada en la base de datos.
    const verifiPassword = await verifyPassword(data.password,data.current)
    if (!verifiPassword) return false
    return prisma.usuario.findUnique({
        where:{// Busca por email y password coincidentes.
            email: data.email, password: data.current, deleted_at: null
        }
    })
}