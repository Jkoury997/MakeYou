import { useState, useEffect } from 'react';
import FilterArt from '../../../components/FilterArt';
import stockApi from "../../../api/stock";

export default function StockPage() {
  const [datos, setDatos] = useState(null); // Inicialmente, los datos están como null
  const [filtros, setFiltros] = useState({});

  useEffect(() => {
    fetchDatos();
  }, []); // El array vacío indica que este efecto se ejecuta solo una vez al montar el componente

  const fetchDatos = async () => {
    try {
      // Asumiendo que stockApi.getFilter es una función asíncrona que devuelve la respuesta esperada
      const response = await stockApi.getFilter();
      // Verifica si la respuesta tiene el estado esperado antes de actualizar el estado
      if (response.Estado) {
        setDatos(response); // Actualiza el estado con los datos de la respuesta
      } else {
        console.error('Error al obtener datos:', response.Mensaje);
      }
    } catch (error) {
      console.error('Error al realizar la petición a la API:', error);
    }
  };

  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    // Aquí podrías también llamar a fetchDatos si necesitas recargar los datos basados en nuevos filtros
  };

  if (!datos) {
    return <div>Cargando datos...</div>; // Muestra un mensaje de carga mientras los datos no estén disponibles
  }

  // Asegúrate de que los datos se pasan correctamente al componente FilterArt
  // Es posible que necesites ajustar cómo accedes a los datos dentro de response dependiendo de la estructura de tu respuesta API
  return (
      <FilterArt datos={datos} onFiltrosChange={handleFiltrosChange} />
  );
}
