import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Registro from './views/createRegister';
import Form from './views/createUser';
import GetRegistro from './views/getRegistro';
import GetAllRegistros from './views/getRegistros';
import GetUserId from './views/getUserId';
import GetAllUsers from './views/getUsers';
import Login from './views/login';
import { UpdatePassword } from './views/updateUser';


function App() {//Funcion para las direcciones de cada archivo con su url para identificar
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro-Empleado/:id" element={<Registro />} />
      <Route path="/ver-datos-registro/:id" element={<GetRegistro />} />
      <Route path="/ver-registros" element={<GetAllRegistros />} />
      <Route path="/ver-Usuarios" element={<GetAllUsers />} />
      <Route path="/traer-Usuario/:id" element={<GetUserId />} />
      <Route path="/crear-Usuarios" element={<Form />} />
      <Route path="/actualizar-Clave/:id" element={<UpdatePassword />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App
