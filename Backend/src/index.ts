import { app } from './app'

const port = process.env.PORT || 3000// Define el puerto
app.listen (port, () => console.log(`funciona, ${port}`)) // Inicia el servidor escuchando en el puerto especificado