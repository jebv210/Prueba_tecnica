import { PrismaClient, tipo } from '@prisma/client';
import { pagination } from '../utils/pagination';
import { hashPassword, verifyPassword } from '../utils/password'; // Importa funciones para encriptar y verificar contraseñas.

const prisma = new PrismaClient() // Crea una instancia de PrismaClient para interactuar con la base de datos.

// Función para obtener un usuario por su email.(GET)
export const userByEmail = async (email: string) => {
    const user = await prisma.usuario.findUnique({
        where: { email:email, deleted_at: null },// Busca un usuario que no esté eliminado y cuyo email coincida.
    })
    if(!user) return null// Devuelve vacio.
    return user// Devuelve el usuario encontrado.
}

// Función para crear un nuevo usuario. (POST)
export const createUser = async (data: { name: string; email: string; telefono: number; password: string; address: string; type: tipo;}) => {
    const passwordbcrypt = await hashPassword(data.password)// Encripta la contraseña antes de guardarla.
    return prisma.usuario.create({
        data:{
            name:data.name,
            telefono: data.telefono,
            password:passwordbcrypt,// Guarda la contraseña encriptada.
            email:data.email,
            address: data.address,
            type: data.type
        }
    })
}

export const getUsers = async ( page= 1, limit= 10, search= '', orderBy= '', asc: boolean = false, tipo:string ) => {
    const skip = (page - 1) * limit
    const whereCondition: any = {
        deleted_at: null,
        name: { contains: search, mode: 'insensitive' }
    };
    if (tipo) {
        whereCondition.type = tipo;
    }
    const TotalItems = await prisma.usuario.count({
        where:whereCondition
    })
    const Admin = await prisma.usuario.findMany({
        where:whereCondition,
        select:{
            id: true,
            name: true,
            telefono:true,
            email: true,
            address: true,
            type: true
        },
        orderBy: { created_at: asc ? 'asc' : 'desc'},
        skip,
        take: limit
    })
    return {
        Admin,
        pagination: pagination(page, limit, TotalItems)
    }
}

export const getIdUser = async (id: number) => {
    const user = await prisma.usuario.findUnique({
        where: { id, deleted_at: null },
        select:{
            id: true,
            name: true,
            telefono:true,
            password: true,
            email: true,
            address: true,
            type: true
        }
    })
    if(!user) return null
    return user
}

export const updateUser = async (id: number, data: { name?: string; email?: string; telefono?:number; address?: string; type?: tipo;}) => {
    return prisma.usuario.update({
        where: { id, deleted_at: null },
        data
    })
}

export const updatePassword = async (id: number, data: { newPassword: string, currentPassword: string }) => {
const usuario = await prisma.usuario.findUnique({
    where: { id, deleted_at: null },
    select: {
        password: true
    }
})
if(!usuario)return null
const verifiPassword = await verifyPassword(data.currentPassword, usuario?.password)

if (!verifiPassword) return false
const hashedPassword = await hashPassword(data.newPassword)

await prisma.usuario.update({
    where: { id, deleted_at: null },
    data: { password: hashedPassword }
})

return true
}

export const deleteUser = async (id: number) => {
    return prisma.usuario.update({
        where: { id,deleted_at: null },
        data:{
            deleted_at: new Date()
        }
    })
}