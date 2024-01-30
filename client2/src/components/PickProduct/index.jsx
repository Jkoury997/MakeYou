

const PickProduct = ({ products }) => {
  return (
    <section className="container-fluid mt-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Artículo</th>
            <th scope="col">Talle</th>
            <th scope="col">Color</th>
            <th scope="col">Stock</th>
            <th scope="col">Preparar</th>
            <th scope="col">Scan</th>
            <th scope="col"><i className="bi bi-list-check"></i></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.CodigoBarras} // Asegúrate de tener una clave única
              data-rubro={product.Rubro}
              data-product={product.CodigoBarras}
            >
              <td className="align-middle">{product.Cabecera}</td>
              <td className="align-middle">{product.DescripMedida}</td>
              <td className="align-middle">{product.DescripDetalle}</td>
              <td className="align-middle">{product.Stock}</td>
              <td className="align-middle">{product.Saldo}</td>
              <td className="align-middle">0</td>
              <td className="align-middle">
                <i className="bi bi-circle" id={`icono-${product.IdArticulo}`}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PickProduct;
