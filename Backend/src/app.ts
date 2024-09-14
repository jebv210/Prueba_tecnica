import cors from "cors"; // Importa el middleware CORS para habilitar solicitudes entre dominios.
import "dotenv/config"; // Carga las variables de entorno desde un archivo .env.
import express from "express"
import { AdminRouter } from "./routers/adminRoute"
import { AuthRouter } from "./routers/authsRoute"
import { EmpleadoRouter } from "./routers/empleadoRoute"
import { Enviroment } from "./utils/enviroments"

const app = express()
app.use(cors())
app.use(express.json())
// Cada enrutador maneja un conjunto de rutas relacionadas con la funcionalidad especificada (admins, auths, empleados).
app.use(Enviroment.URL + '/admins', AdminRouter)
app.use(Enviroment.URL + '/auths', AuthRouter)
app.use(Enviroment.URL + '/empleados', EmpleadoRouter)

export { app }; // Exporta la aplicación para poder ser usada en otro archivo, como por ejemplo en la configuración del servidor.

