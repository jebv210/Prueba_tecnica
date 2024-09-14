import type { Request, Response } from 'express'
import * as EmpleadoModel from '../models/empleadoModel'; // Importa todo el módulo EmpleadoModel desde el archivo '../models/empleadoModel'

export const createRegister = async (req: Request, res: Response) => {// Define la función para crear un nuevo registro de empleado.
    try {
        const id = parseInt(req.params.id)
        if(!id) return res.status(404).json({ error: "falta un identificador" })
        const { date, time } = req.body 
        const user = await EmpleadoModel.createRegister(id, { date, time })// Llama al método 'createRegister' del modelo 'EmpleadoModel' para crear un registro con los datos proporcionados.
        if(!user) return res.status(404).json({ error: 'Error de registro' })
        res.status(201).json(user)// Si el registro se crea exitosamente, responde con el registro creado y un estado 201 si no sera un 404 0 500.
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const getRegisters = async (req: Request, res: Response) => {// Define la función para obtener una lista de registros de empleados.
    try {// Extrae y convierte los parámetros de consulta 'page', 'limit', 'search', 'orderBy' y 'asc'.
        const page = parseInt(req.query.page as string, 10) || 1
        const limit = parseInt(req.query.limit as string, 10) || 10
        const search = (req.query.search as string) || ''
        const orderBy = (req.query.orderBy as string) || 'created_at'
        const asc = 'asc' in req.query
        const user = await EmpleadoModel.getRegisters(page,limit,search,orderBy,asc) // Llama al método 'getRegisters' del modelo 'EmpleadoModel' con los parámetros extraídos.
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}

export const getRegisterId = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)// Intenta convertir el parámetro 'id' de la URL en un número entero
        if(!id) return res.status(404).json({ error: "falta un identificador" }) // Si el 'id' no es válido (por ejemplo, es NaN), responde con un error 404 indicando que falta un identificador.
        const user = await EmpleadoModel.getRegisterId(id)
        if(!user) return res.status(404).json({ error: "usuario no encontrado" })// Si el método 'getRegisterId' no devuelve un registro (por ejemplo, el registro no se encuentra), responde con un error 404.
        res.json(user) // Responde con el registro encontrado.
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}
