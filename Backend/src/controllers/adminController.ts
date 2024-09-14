import type { Request, Response } from 'express';
import * as AdminModel from '../models/adminModel'; // Importa todo el módulo AdminModel desde el archivo '../models/adminModel'

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, telefono, password, address, type} = req.body 
        const emailFind = await AdminModel.userByEmail(email)  // Llama al método 'userByEmail' del modelo 'AdminModel' para verificar si ya existe un usuario con el correo
        if(emailFind) return res.status(400).json({ error: 'correo existente' })//si hay da un error
        const user = await AdminModel.createUser({ name, email, telefono, password, address, type}) // Llama al método 'createUser' del modelo 'AdminModel' para crear un nuevo usuario con los datos proporcionados
        if(!user) return res.status(404).json({ error: 'Error de registro' })
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {// Define la función para obtener una lista.
        // Extrae y convierte los parámetros de consulta 'page', 'limit', 'search', 'orderBy' y 'asc'.
        const page = parseInt(req.query.page as string, 10) || 1
        const limit = parseInt(req.query.limit as string, 10) || 10
        const search = (req.query.search as string) || ''
        const orderBy = (req.query.orderBy as string) || 'created_at'
        const asc = 'asc' in req.query
        const tipo = (req.query.tipo as string) || ''
        const user = await AdminModel.getUsers(page,limit,search,orderBy,asc,tipo) // Llama al método 'getRegisters' del modelo 'EmpleadoModel' con los parámetros extraídos.
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const getIdUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)// Intenta convertir el parámetro 'id' de la URL en un número entero
        if(!id) return res.status(404).json({ error: "falta un identificador" })// Si el 'id' no es válido responde con un error 404 indicando que falta un identificador.
        const user = await AdminModel.getIdUser(id)
        if(!user) return res.status(404).json({ error: "usuario no encontrado" })// Si el método 'getRegisterId' no devuelve un registro (por ejemplo, el registro no se encuentra)
        res.json(user)// Responde con el registro encontrado.
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)// Intenta convertir el parámetro 'id' de la URL en un número entero
        if(!id) return res.status(404).json({ error: "falta un identificador" })// Si el 'id' no es válido responde con un error 404 indicando que falta un identificador.
        const user = await AdminModel.getIdUser(id)
        if(!user) return res.status(404).json({ error: "usuario no encontrado" })// Si el método 'getRegisterId' no devuelve un registro (por ejemplo, el registro no se encuentra)
        const { name, email, telefono, address, type } = req.body
        const updateUser = await AdminModel.updateUser(id, { name, email, telefono, address, type })
        res.json(updateUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)// Intenta convertir el parámetro 'id' de la URL en un número entero
    if (!id) return res.status(400).json({ error: "falta un identificador" })// Si el 'id' no es válido responde con un error 404 indicando que falta un identificador.

    const { currentPassword, newPassword, repeatPassword } = req.body

    const user = await AdminModel.getIdUser(id)
        if(!user) return res.status(404).json({ error: "usuario no encontrado" })// Si el método 'getRegisterId' no devuelve un registro (por ejemplo, el registro no se encuentra)

    if (!newPassword || !repeatPassword || !currentPassword) {//se mira que no vengan vacias
        return res.status(400).json({ error: "faltan datos" })
    }

    if (newPassword !== repeatPassword) {
        return res.status(400).json({ error: "contraseñas no son iguales" })// compara que sean iguales
    }

    const password = await AdminModel.updatePassword( id,{newPassword, currentPassword})//se actualiza contraseña
    if (!password) {
        return res.status(400).json({ error: "contraseña invalida" })
    }

    return res.status(200).json({ message: 'Contraseña aceptada' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
try {
    const id = parseInt(req.params.id)// Intenta convertir el parámetro 'id' de la URL en un número entero
    if(!id) return res.status(404).json({ error: "falta un identificador" })// Si el 'id' no es válido responde con un error 404 indicando que falta un identificador.
    const admin = await AdminModel.getIdUser(id)
    if(!admin) return res.status(404).json({ error: "usuario no encontrado" })// Si el método 'getRegisterId' no devuelve un registro (por ejemplo, el registro no se encuentra)
    await AdminModel.deleteUser(id)//llama la fuhncon a elminar a travez de un id
    return res.status(201).end()
} catch (error) {
    console.error(error)
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
}
}