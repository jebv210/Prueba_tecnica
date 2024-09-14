import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/getUsers.css';

// Definición de la interfaz para los datos de usuario
interface FormData {
    id: number,
    name: string,
    email: string,
    address: string,
    type: string,
}

export const GetAllUsers: React.FC = () => {
    const [users, setUsers] = useState<FormData[]>([]);// Almacena la lista de usuarios
    const [error, setError] = useState<string | null>(null);// Manejar errores
    const [search, setSearchTerm] = useState('');
    const [tipo, setTypeTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const total= users.length

    const fetchData = async () => {// Función para obtener los datos de los usuarios
        try {
            const response = await fetch(`http://localhost:3002/dev/prueba/admins/get-users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&asc=&orderBy=&tipo=${tipo}`);
            const result = await response.json();
            setUsers(result.Admin)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {//ejecutar la función fetchData cuando cambian los parámetros
        fetchData();
    }, [page, limit, search, tipo]);

    // Función para avanzar o devolverse a otra siguiente página con usuarios disponibles
    const nextPage = () => {
        if( total == limit){
            setPage(prevPage => prevPage + 1);
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };
    const handleDeleteClick = async (userId: number) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
        if (!confirmDelete) return;
            try {// Realizar una solicitud para eliminar el usuario
                const response = await fetch(`http://localhost:3002/dev/prueba/admins/delete-user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar');
                }
                window.location.reload();// Recargar la página para actualizar la lista de usuarios
            } catch (error) {
                setError('Error al eliminar los datos del usuario.');
            }
        }
        if (error) return <p className="error">{error}</p>;// Mostrar mensaje de error si existe

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={search}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <br />
            <label>Tipo de usuario</label>
            <select name="type" value={tipo} onChange={(e) => setTypeTerm(e.target.value)} className="search-bar" >
                <option value="">Selecciona</option>
                <option value="empleado">Empleado</option>
                <option value="administrador">Administrador</option>
            </select>
            <br />

            <Link to={`/crear-Usuarios`}>
                <button className="add-button" type="button">Añadir</button>
            </Link>
            <Link to={`/ver-registros`}>
                <button className="add-button" type="button">Ver Registros de Empleados</button>
            </Link>
            <div className="cards-container">
                {users.map((user, index) => (
                    <div key={index} className="card">
                        <p>{user.id}</p>
                        <p>Nombre usuario: {user.name}</p>
                        <p>Correo: {user.email}</p>
                        <p>Direccion: {user.address}</p>
                        <p>Tipo Usuario: {user.type}</p>
                        <Link to={`/traer-Usuario/${user.id}`}>
                            <button type="button"className="action-button">Consultar</button>
                        </Link>
                        <button type="button" className="action-button" onClick={() => handleDeleteClick(user.id)}>Eliminar</button>
                    </div>
                ))}
                <div className="pagination">
                    <button onClick={previousPage} className="pagination-button" disabled={page === 1}>Anterior</button>
                    <span className="pagination-info"> Página {page}</span>
                    <button onClick={nextPage} className="pagination-button" >Siguiente</button>
                </div>
            </div>
        </div>  
    );
};

export default GetAllUsers;