import { Router } from 'express';
import * as AuthController from '../controllers/authController'; // Importa todas las funciones exportadas del controlador de inicio de sesion.

const AuthRouter = Router()

// Define la ruta para el inicio de sesion
AuthRouter.post('/login', AuthController.login )

export { AuthRouter }; // Exporta el `AuthRouter` para las rutas en app y que se unan con el puerto

