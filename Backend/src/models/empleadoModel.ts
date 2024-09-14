import { PrismaClient, tipo } from '@prisma/client';
import { pagination } from '../utils/pagination'; // Importa una función de paginación de los utilitarios.

const prisma = new PrismaClient() // Crea una nueva instancia de PrismaClient para conectarse a la base de datos.

// Función para crear un registro de ingreso para un usuario con un ID dado. (POST)
export const createRegister = async (id:number, data: { date:string; time:string}) => {
    const dateTime =`${data.date}T${data.time}:00.000Z` // Combina la fecha y hora en formato ISO.

    return prisma.registro.create({
        data:{
            idUser: id,
            dateTime
        }
    })
}

// Función para obtener registros de empleados con paginación, filtrado, búsqueda y ordenamiento. (GET)
export const getRegisters = async ( page= 1, limit= 10, search= '', orderBy= '', asc: boolean = false ) => {
    const skip = (page - 1) * limit
    const whereCondition: any = {
        deleted_at: null,// Filtra los registros que no están eliminados.
        usuario:{
            name: { contains: search, mode: 'insensitive' },// Filtra por nombre.
            type: tipo.empleado// Filtra los usuarios que son empleados.
        }
    };
    const TotalItems = await prisma.registro.count({// Cuenta el número total de registros que coinciden con los criterios de búsqueda
        where:whereCondition
    })
    const Admin = await prisma.registro.findMany({ // Busca los registros según las condiciones y los parámetros de paginación
        where:whereCondition,
        select:{
            id:true,
            dateTime:true,
            usuario:{
                select:{
                    name: true,
                    email: true,
                    type: true
                }
            }
        },
        orderBy: { created_at: asc ? 'asc' : 'desc'},//ordena de forma ascendente y descendente
        skip, // Omitir un número determinado de registros para la paginación.
        take: limit // Número máximo de registros a devolver.
    })
    const registro = Admin.map((item) => {// Mapea los registros obtenidos
        return{
            id: item.id,
            name: item.usuario.name,
            email: item.usuario.email,
            dateTime : item.dateTime,
            type: item.usuario.type
        }
    })
    return {
        registro,//devuelve el o los registros junto la paginacion
        pagination: pagination(page, limit, TotalItems)
    }
}
// Función para obtener los detalles de un registro de usuario específico basado en el ID. (GET ID)
export const getRegisterId = async (id: number) => {
    const user = await prisma.usuario.findUnique({
        where: { id, deleted_at: null },// Filtra el usuario por ID que no esté eliminado.
        select:{
            name: true,
            email: true,
            type: true,
            registro:{
                select:{
                    id: true,
                    dateTime: true
                }
            }
        }
    })
    if(!user) return null// Filtra el usuario por ID que no esté eliminado.
    const registro = user.registro.map((item) => ({    // Mapea los registros
        idRegistro: item.id,
        name: user.name,
        email: user.email,
        type: user.type,
        dateTime: item.dateTime
    }));
    return {registro}//devuelve el o los registros
}