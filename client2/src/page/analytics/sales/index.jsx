import CardSale from "../../../components/CardSale";
import FilterDate from "../../../components/FilterDate";
import { useState } from "react";
import analyticsApi from "../../../api/analytics";
import { v4 as uuidv4 } from 'uuid';
import Loading from "../../../components/contents/Loading";


const Sales = () => {
    const [data,setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    function atrasarUnMes(fecha) {
        let fechaOriginal = new Date(fecha);
        let dia = fechaOriginal.getDate();
        fechaOriginal.setMonth(fechaOriginal.getMonth() - 1);
    
        // Ajustar el día del mes solo si se ha modificado al cambiar de mes
        if (fechaOriginal.getDate() !== dia) {
            fechaOriginal.setDate(0); // Esto establece la fecha al último día del mes anterior
        }
    
        return fechaOriginal.toISOString().split('T')[0];
    }

    function atrasarUnAnio(fecha) {
        let fechaOriginal = new Date(fecha);
        fechaOriginal.setFullYear(fechaOriginal.getFullYear() - 1);
        return fechaOriginal.toISOString().split('T')[0];
    }

    const handleDateChange = async (startDate, endDate, comparative) => {
        setIsLoading(true);

        try {
            const currentData = await analyticsApi.saleVariable(startDate, endDate);
            let comparativeData = [];
    
        if (comparative === "month") {
            comparativeData = await analyticsApi.saleVariable(atrasarUnMes(startDate), atrasarUnMes(endDate));
        } else if (comparative === "year") {
            comparativeData = await analyticsApi.saleVariable(atrasarUnAnio(startDate), atrasarUnAnio(endDate));
        }
    
        // Combinar los datos actuales y comparativos
        const combinedData = currentData.map(item => {
            const comparativeItem = comparativeData.find(compItem => compItem.Tienda === item.Tienda) || {};
            return { ...item, comparative: comparativeItem, uuid: uuidv4() };
        });
    
        setData(combinedData);
        } catch (error) {
            console.error("Error al cargar los datos: ", error);
            // Aquí podrías manejar el error, como mostrar un mensaje al usuario
        } finally {
            setIsLoading(false); // Terminar la carga
        }
    };

    console.log(data)

    return (
        <div>
            <FilterDate onDateChange={handleDateChange} isComparativeEnabled={true} />
            {isLoading ? (
              <Loading />
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {data.map((item) => (
                        <CardSale key={item.uuid} data={item} valorTitulo={0}/>
                    ))}
                </div>
            )}
        </div>
        
    );
};

export default Sales;
