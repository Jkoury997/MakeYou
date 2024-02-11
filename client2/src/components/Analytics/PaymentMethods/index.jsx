import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentMethods = ({ data }) => {

    const Pesos = (numero) => {
        return numero.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0, // Sin decimales
          maximumFractionDigits: 0, // Sin decimales
        });
      };
  // Función para calcular el porcentaje sobre el total
  const calcularPorcentaje = (valor, total) => ((valor / total) * 100).toFixed(2) + '%';

  // Lista de todos los métodos de pago para iterar sobre ellos
  const metodosPago = [
    { nombre: 'Efectivo', valor: data.Efectivo, icon: 'bi-cash' },
    { nombre: 'Tarjeta01', valor: data.Tarjeta01, icon: 'bi-credit-card-2-front' },
    { nombre: 'Tarjeta02', valor: data.Tarjeta02, icon: 'bi-credit-card-2-front' },
    { nombre: 'Tarjeta03', valor: data.Tarjeta03, icon: 'bi-credit-card-2-front' },
    { nombre: 'Tarjeta06', valor: data.Tarjeta06, icon: 'bi-credit-card-2-front' },
    { nombre: 'Tarjeta12', valor: data.Tarjeta12, icon: 'bi-credit-card-2-front' },
    { nombre: 'Bancos', valor: data.Bancos, icon: 'bi-bank' },
    // Agrega o ajusta los métodos de pago según sea necesario
  ];

  // Datos para "Punto 1" y "Punto 2"
  const puntos = [
    { nombre: 'Punto 1', valor: data.Punto1, porcentaje: calcularPorcentaje(data.Punto1, data.Total) },
    { nombre: 'Punto 2', valor: data.Punto2, porcentaje: calcularPorcentaje(data.Punto2, data.Total) }
  ];

  

  return (
    <div className="container my-4 mt-2">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Tienda: {data.Tienda}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Total: {Pesos(data.Total)}</h6>
          <div className="mt-3">
            <ul className="list-group list-group-flush">
              {puntos.map(({ nombre, valor, porcentaje, icon }) => (
                <li key={nombre} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className={`${icon} me-2`}></i>
                    {nombre}: {Pesos(valor)}
                  </span>
                  <span className="badge bg-primary rounded-pill">{porcentaje}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <h4>Métodos de Pago</h4>
            <ul className="list-group list-group-flush">
              {metodosPago.map(({ nombre, valor, icon }) => valor > 0 && (
                <li key={nombre} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className={`${icon} me-2`}></i>
                    {nombre}: {Pesos(valor)}
                  </span>
                  <span className="badge bg-success rounded-pill">{calcularPorcentaje(valor, data.Total)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;