import StoreSelect from "../../../components/selectStore";
import { useEffect, useState } from "react";
import logisticsApi from '../../../api/logistics'; 
import FilterRubro from "../../../components/FilterRubro";
import Loading from "../../../components/contents/Loading";
import utilFunctions from "../../../utils/logistics"
import BarcodeReader from "../../../components/BarcodeReader";
import PickProduct from "../../../components/PickProduct";

export default function StoreSendPage() {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [processedProducts, setProcessedProducts] = useState(null);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await logisticsApi.stores(); 
                setStores(response.Lista);
            } catch (error) {
                console.error("Error al cargar las tiendas:", error);
            }
        };

        fetchStores();
    }, []);

    const handleCompanySelect = async (storeCode) => {
        setIsLoading(true);
        try {
            const productsResponse = await logisticsApi.preparationstore(storeCode);
            setProducts(productsResponse); // Asegúrate de que esta línea es necesaria

            const processedData = await utilFunctions.rubroUnico(productsResponse.Articulos);
            setProcessedProducts(processedData);
            console.log("Datos procesados:", processedData); // Verificar datos procesados
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBarcodeSubmit = (barcode) => {
        console.log("Código de barras recibido:", barcode);
        // Aquí puedes hacer lo que necesites con el código de barras
    };

    useEffect(() => {
        console.log("Estado actualizado de products:", products);
    }, [products]); // Este useEffect se ejecutará cada vez que cambie 'products'
    


    
    

    return (
        <>
            <StoreSelect stores={stores} onCompanySelect={handleCompanySelect} />
            {isLoading ? <Loading /> : processedProducts && <FilterRubro rubros={processedProducts} />}
            <BarcodeReader onBarcodeSubmit={handleBarcodeSubmit}></BarcodeReader>
            <PickProduct products={products}></PickProduct>
            

        </>
    );
}
