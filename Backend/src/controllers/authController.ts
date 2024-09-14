import type { Request, Response } from 'express'
import * as AuthModel from '../models/authModel'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body // Desestructura 'email' y 'password' del cuerpo de la solicitud.
        const emailFind = await AuthModel.userByEmail(email)
        // Pasa el correo electrónico, la contraseña proporcionada y la contraseña actual almacenada para la verificación.
        if(!emailFind) return res.status(404).json({ error: 'Correo o Contraseña Incorrectos' })
        const login = await AuthModel.login({ email, password, current:emailFind.password })
        if(!login) return res.status(404).json({ error: 'Correo o Contraseña Incorrectos' })
        res.status(201).json(login) // Si las credenciales son correctas y el inicio de sesión es exitoso, responde con el resultado del inicio de sesión y un estado 201
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" })
    }
}