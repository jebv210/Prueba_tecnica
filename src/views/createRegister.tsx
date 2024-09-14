import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/createUser.css';

const Registro: React.FC = () => {// Componente para el formulario de registro de ingreso
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date:'',// Fecha del registro
        time:'',// Hora del registro
    });

    const [error, setError] = useState<string | null>(null);// Estado para manejar errores
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {// Función para manejar los cambios en los campos del formulario
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {// Función para manejar el envío del formulario
        e.preventDefault();
        try {
        const response = await fetch(`http://localhost:3002/dev/prueba/empleados/create-register/${id}`, {// Realizar la solicitud
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),// Enviar los datos del formulario en formato JSON
        });
        if (response.ok) {// Manejar la respuesta
        const result = await response.json();
        console.log(result.message);
        navigate(`/ver-datos-registro/${id}`)
        }else if (response.status === 404){
            setError('Error al enviar los datos');
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
                <h1>Registro de Ingreso</h1>
            <div>
                <label>Fecha:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required/>
            </div>
            <div>
                <label>Hora:</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required/>
            </div>
            
                <button type="submit" className='btn-submit'>Registrar</button>
            </form>
        </div>
    );
};

export default Registro;
