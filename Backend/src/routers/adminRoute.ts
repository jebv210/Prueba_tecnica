import { Router } from 'express'
import * as AdminController from '../controllers/adminController'; // Importa todas las funciones exportadas del controlador de administrador.

const AdminRouter = Router()

// Define la ruta para la CRUD de admin
AdminRouter.post('/create-user', AdminController.createUser )
AdminRouter.get('/get-users', AdminController.getUsers )
AdminRouter.get('/get-user/:id', AdminController.getIdUser )
AdminRouter.put('/update-user/:id', AdminController.updateUser)
AdminRouter.put('/update-password-user/:id', AdminController.updatePassword)
AdminRouter.delete('/delete-user/:id', AdminController.deleteUser)

export { AdminRouter }; // Exporta el `AdminRouter` para las rutas en app y que se unan con el puerto

