import FilterDate from "../../../components/FilterDate";
import { v4 as uuidv4 } from 'uuid';
import Loading from "../../../components/contents/Loading";
import { useState } from "react";
import analyticsApi from "../../../api/analytics";
import PaymentMethods from "../../../components/Analytics/PaymentMethods";

export default function PaymentMethodsPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleDateChange = async (startDate, endDate) => {
        setIsLoading(true);
        try {
            const responseData = await analyticsApi.paymentMetheods(startDate, endDate);
            const combinedData = responseData.map(item => ({
                ...item,
                uuid: uuidv4(),
            }));
            setData(combinedData);
        } catch (error) {
            console.error("Error al cargar los datos: ", error);
            // Manejo de error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <FilterDate onDateChange={handleDateChange} />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {data.map(item => (
                        item.Total > 0 && <PaymentMethods key={item.uuid} data={item} />
                    ))}
                </div>
            )}
        </>
    );
}
