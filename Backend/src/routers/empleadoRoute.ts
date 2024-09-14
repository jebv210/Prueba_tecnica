import { Router } from 'express';
import * as EmpleadoController from '../controllers/empleadoController'; // Importa todas las funciones exportadas del controlador de empleado.

const EmpleadoRouter = Router()

// Define la ruta para los proceso de registro de empleado.

EmpleadoRouter.post('/create-register/:id', EmpleadoController.createRegister )
EmpleadoRouter.get('/get-registers', EmpleadoController.getRegisters )
EmpleadoRouter.get('/get-register/:id', EmpleadoController.getRegisterId )

export { EmpleadoRouter }; // Exporta el `EmpleadoRouter` para las rutas en app y que se unan con el puerto

