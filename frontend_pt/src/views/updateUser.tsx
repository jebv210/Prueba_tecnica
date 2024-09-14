import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

    export const UpdatePassword: React.FC = () => {
        // Obtener el ID desde los parámetros
        const { id } = useParams();
        const navigate = useNavigate();
        const [formData, setFormData] = useState({// Almacenar los datos del formulario
            id: 0,
            currentPassword:'',
            newPassword:'',
            repeatPassword:''
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });// Actualiza el estado del formulario con el valor del campo modificado
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {            // Enviar los datos del formulario al servidor para actualizar la contraseña
        const response = await fetch(`http://localhost:3002/dev/prueba/admins/update-password-user/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        // Procesar la respuesta del servidor
        const result = await response.json();
        console.log(result.message);
        navigate(`/ver-Usuarios`);
        } catch (error) {
            // Manejar cualquier error ocurrido durante la solicitud
        console.error('Error:', error);
        }
    };
    return (
        <div className="cards-container">
                <form onSubmit={handleSubmit} className='form-container'>
                    <h1>Cambio de Contraseña</h1>
                    <div>
                        <label>Anterior Contraseña:</label>
                        <input type="text" id="currentPassword" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Nueva Contraseña:</label>
                        <input type="text" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Repetir Nueva Contraseña:</label>
                        <input type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required/>
                    </div>
                        <button type="submit" className='btn-submit'>Guardar</button>
                    <Link to={`/ver-Usuarios`}>
                            <button type="button" className='btn-submit'>Volver</button>
                    </Link>
                </form>
        </div>
    );
};
