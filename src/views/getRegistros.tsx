import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface FormData {// Interfaz para definir la estructura de los datos del registro
    id: number;
    name: string;
    email: string;
    dateTime: string;
}

export const GetAllRegistros: React.FC = () => {// Estado para manejar los registros obtenidos
    const [registros, setRegistros] = useState<FormData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => { // Función para obtener los registros
        try {
            const response = await fetch(`http://localhost:3002/dev/prueba/empleados/get-registers`);
            const result = await response.json();
            setRegistros(result.registro)
        } catch (error) {
            setError('Error en recoleccion de datos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {// Hook para obtener los datos cuando el componente se monta
        fetchData();
    }, []);

    //Sale mensaje dependiendo de si se demora o si hay error
    if (loading) return <p className="loading">Cargando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <div className="cards-container">
            <table className="registro-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                {registros.map((registro) => {
                const dateTimeParts = registro.dateTime.split('T');
                const date = dateTimeParts[0];
                const time = dateTimeParts[1].slice(0, 8);
                return (
                    <tr key={registro.id}>
                    <td>{registro.id}</td>
                    <td>{registro.name}</td>
                    <td>{registro.email}</td>
                    <td>{date}</td>
                    <td>{time}</td>
                    </tr>
                );
                })}
                </tbody>
            </table>
            <Link to={`/ver-Usuarios`}>
                <button type="button"  className='btn-submit'>Ver empelados</button>
            </Link>
            </div>
        </div>  
    );
};

export default GetAllRegistros;