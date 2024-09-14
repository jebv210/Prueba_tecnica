import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Registro {
    idRegistro: number;
    name: string;
    email: string;
    dateTime: string;
}

export const GetRegistro: React.FC = () => {
    const { id } = useParams();// Obtiene el ID del registro desde los parámetros
    const [registros, setRegistros] = useState<Registro[]>([]);// Estado para almacenar el registro obtenido
    const [loading, setLoading] = useState<boolean>(true);// Estado para manejar la carga de datos
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    // Función para obtener el registro desde o con la ID
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3002/dev/prueba/empleados/get-register/${id}`);
            const result = await response.json();
            setRegistros(result.registro); 
        } catch (error) {
            setError('Error en recoleccion de datos.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => { // Hook para obtener los datos cuando cambia el ID
        fetchData();
    }, [id]);

    //Sale mensaje dependiendo de si se demora o si hay error
    if (loading) return <p className="loading">Cargando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
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
                    <tr key={registro.idRegistro}>
                    <td>{registro.idRegistro}</td>
                    <td>{registro.name}</td>
                    <td>{registro.email}</td>
                    <td>{date}</td>
                    <td>{time}</td>
                    </tr>
                );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default GetRegistro;
