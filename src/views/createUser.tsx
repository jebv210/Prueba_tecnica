import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/createUser.css';

const Form: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({// Estado para almacenar los datos del formulario
        name:'',
        email:'',
        telefono:'',
        password:'',
        address:'',
        type:''
    });

    const [error, setError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {// Maneja los cambios en los campos del formulario
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {// Maneja los cambios en los campos del formulario
        e.preventDefault();
        const Data = {// Convierte el número de teléfono a un tipo numérico
            ...formData,
            telefono: Number(formData.telefono),
        };
        try {
        const response = await fetch('http://localhost:3002/dev/prueba/admins/create-user', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });
        if (response.ok) {// Maneja la respuesta de la peticion
        const result = await response.json();
        console.log(result.message);
        navigate(`/ver-Usuarios`)// Redirige a la página de usuarios
        }else if (response.status === 400){
            setError('Correo Existente');// Muestra mensaje de error si el correo ya existe
        }else if (response.status === 404){
            setError('Error al enviar los datos');// Muestra mensaje de error 
        } else {
            setError('Error al enviar los datos');
            throw new Error('Error al enviar los datos');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div className='form-container'>
            <h1>Registro Usuario</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className='form-group'>
                
            <div>
                <label>Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
                <label>Telefono:</label>
                <input type="number" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div>
                <label>Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required/>
            </div>
            <div>
                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Selecciona</option>
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                </select>
            </div>
                <button type="submit" className='btn-submit'>Registrar</button>
            </form>
        </div>
    );
};

export default Form;
