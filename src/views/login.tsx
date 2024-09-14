import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // obtener la función de navegación
import '../styles/createUser.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({// Estado para almacenar los datos del formulario
        email:'',
        password:'',
    });

    const [error, setError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {// Función para manejar los cambios en los campos del formulario
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(formData)
        e.preventDefault();// recargar la página
        try {
        const response = await fetch('http://localhost:3002/dev/prueba/auths/login', {// Enviar los datos del formulario al servidor
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {//Condiciones para el control de errores y para saber el rol 
            const result = await response.json();
            if(result.type === "administrador"){
            navigate(`/ver-Usuarios`);
            } 
            else {navigate(`/registro-Empleado/${result.id}`);}
        }
        else if (response.status === 404){
            setError('Email o contraseña incorrectos');
        } else {
            throw new Error('Error al enviar los datos');
        }
        
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className='form-container'>
            <h1>Login</h1>

            <div>
                <label>Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
                <button type="submit" className='btn-submit'>Ingresar</button>
            </form>
        </div>
        
    );
};

export default Login;
