import StoreSelect from "../../../components/selectStore";
import { useEffect, useState } from "react";
import logisticsApi from '../../../api/logistics'; 
import FilterRubro from "../../../components/FilterRubro";
import Loading from "../../../components/contents/Loading";
import utilFunctions from "../../../utils/logistics"
import BarcodeReader from "../../../components/BarcodeReader";
import PickProduct from "../../../components/PickProduct";
import ErrorModal from "../../../components/contents/ErrorModal";


export default function StoreSendPage() {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [processedProducts, setProcessedProducts] = useState(null);
    const [selectedRubro, setSelectedRubro] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ title: '', description: '' });

  
    const handleError = ({ title, description }) => {
        setErrorMessage({ title, description });
        setShowModal(true);
      };
  
    const handleClose = () => {
      setShowModal(false);
    };

    const handleRubroChange = (rubro) => {
        setSelectedRubro(rubro);
    };

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
    
        const updatedProducts = products.Articulos.map((product) => {
            if (product.CodigoBarras === barcode) {
                const initialScanCount = product.Scan || 0;
                const difference = initialScanCount - product.Saldo * -1;
    
                if (difference >= 0) {
                    // Si ya se escaneó más de lo permitido, muestra el error y no incrementes el Scan.
                    handleError({ 
                        title: `Escaneo de más ${product.Cabecera}`, 
                        description: `Se escaneó una unidad más de la necesaria del ${product.Cabecera} ${product.Medida} ${product.DescripDetalle}` 
                    });
                } else {
                    // Solo incrementa Scan si aún no se ha excedido el saldo.
                    return { ...product, Scan: initialScanCount + 1 };
                }
            }
            return product;
        });
    
        setProducts({ ...products, Articulos: updatedProducts });
    };
    
    
    

    useEffect(() => {
        console.log("Estado actualizado de products:", products);
    }, [products]); // Este useEffect se ejecutará cada vez que cambie 'products'
    


    
    

    return (
        <>
            <StoreSelect stores={stores} onCompanySelect={handleCompanySelect} />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {processedProducts && <FilterRubro rubros={processedProducts} onRubroSelect={handleRubroChange} />}
                    {processedProducts && <BarcodeReader onBarcodeSubmit={handleBarcodeSubmit} />}
                    {processedProducts && <PickProduct products={products.Articulos} selectedRubro={selectedRubro} />}
                </>
            )}
            <ErrorModal show={showModal} error={errorMessage} handleClose={handleClose} />
        </>
    );
    
}
