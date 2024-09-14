import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface FormData {// Interfaz para definir la estructura de los datos del usuario
    id: number;
    name: string;
    telefono: number;
    password: string;
    email: string;
    address: string;
    type: string;
}

export const GetUserId: React.FC = () => {
    const { id } = useParams();// Obtiene el ID de parametros

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        name: '',
        email: '',
        password: '',
        telefono: 0,
        address: '',
        type: '',
    });
    const [isReadOnly, setIsReadOnly] = useState(true);// Estado para manejar el modo de solo lectura
    const [loading, setLoading] = useState<boolean>(true);// Estado para manejar la carga de datos
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    // Fetch user data by ID
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3002/dev/prueba/admins/get-user/${id}`);
            const result = await response.json();
            setFormData(result); // Sincroniza los datos del usuario con el formulario
        } catch (error) {
            setError('Error fetching data.');
        } finally {
            setLoading(false);
        }
    };

    // Maneja los cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleEditClick = async () => {
        if (isReadOnly) {
            setIsReadOnly(false); // Habilita los campos del formulario
        } else {
            // Realiza la actualización
            const Data = {// Convierte el número de teléfono a un tipo numérico
                ...formData,
                telefono: Number(formData.telefono),
            };
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3002/dev/prueba/admins/update-user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Data),
                });
                if (!response.ok) {
                    throw new Error('Error al actualizar los datos');
                }
                setIsReadOnly(true); // Vuelve a modo lectura tras guardar
                navigate(`/actualizar-Clave/${formData.id}`);
            } catch (error) {
                setError('Error al actualizar los datos del usuario.');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]); // Solo se ejecuta cuando cambia el id

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="cards-container">
                <form className='form-container'>
                <h1> Editando a {formData.name} </h1>

                    <div>
                        <label>Id:</label>
                        <input  readOnly type="number" id="name" name="name" value={formData.id} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Name:</label>
                        <input readOnly={isReadOnly} type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input readOnly={isReadOnly} type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Telefono:</label>
                        <input readOnly={isReadOnly} type="number" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Address:</label>
                        <input readOnly={isReadOnly} type="text" id="address" name="address" value={formData.address} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Type:</label>
                        <select name="type" value={formData.type} onChange={handleChange} disabled={isReadOnly}>
                            <option value="">Selecciona</option>
                            <option value="empleado">Empleado</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                    <button type="button" onClick={handleEditClick} className='btn-submit'>{isReadOnly ? 'Modificar' : 'Guardar'}</button>
                    <Link to={`/ver-Usuarios`}>
                            <button type="button" className='btn-submit'>Volver</button>
                    </Link>
                </form>
        </div>
    );
};

export default GetUserId;