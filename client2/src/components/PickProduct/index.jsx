
import "./styles.css";


const PickProduct = ({ products, selectedRubro }) => {


  const getColorForScan = (scan, saldo) => {
    if (saldo * -1 < scan) {
      return 'table-danger';
    }
    if (scan === (saldo * -1)) {
      return 'table-success';
    }
    if (scan > 0) return 'table-warning';
    return ''; // color por defecto (no es necesario devolver 'inherit')
  };

  const filteredProducts = products.filter(product => (selectedRubro === '' || product.Rubro === selectedRubro) && product.Stock !== 0);
  

  return (
    <section className="container-fluid mt-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="hide-on-desktop">Producto</th> {/* Nueva columna combinada para móviles */}
            <th scope="col" className="hide-on-mobile">Artículo</th>
            <th scope="col" className="hide-on-mobile">Talle</th>
            <th scope="col" className="hide-on-mobile">Color</th>
            <th scope="col" className="hide-on-mobile">Stock</th>
            <th scope="col">Preparar</th>
            <th scope="col">Scan</th>
            <th scope="col" className="hide-on-mobile"><i className="bi bi-list-check"></i></th>
          </tr>
        </thead>
        <tbody>
        {filteredProducts.map((product) => (
            product.Stock !== 0 && (
              <tr
                key={product.IdArticulo}
                data-rubro={product.Rubro}
                data-product={product.CodigoBarras}
                className={getColorForScan(product.Scan, product.Saldo)}
              >
                {/* Columna combinada para móviles */}
                <td className="align-middle hide-on-desktop">
                  {`${product.Cabecera} - ${product.DescripMedida} - ${product.DescripDetalle}`}
                </td>
                {/* Resto de las columnas para dispositivos de escritorio */}
                <td className="align-middle hide-on-mobile">{product.Cabecera}</td>
                <td className="align-middle hide-on-mobile">{product.DescripMedida}</td>
                <td className="align-middle hide-on-mobile">{product.DescripDetalle}</td>
                <td className="align-middle hide-on-mobile">{product.Stock}</td>
                <td className="align-middle">{product.Saldo}</td>
                <td className="align-middle">{product.Scan ? product.Scan : 0}</td>
                <td className="align-middle hide-on-mobile">
                  <i className="bi bi-circle" id={`icono-${product.IdArticulo}`}></i>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </section>

  );
};

export default PickProduct;



