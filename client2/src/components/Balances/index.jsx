import React from 'react';

function Balances({ lista }) {
     // Calcular los totales
  const totalPositivos = lista.Lista.filter(item => item.Saldo >= 0).reduce((total, item) => total + item.Saldo, 0);
  const totalNegativos = lista.Lista.filter(item => item.Saldo < 0).reduce((total, item) => total + item.Saldo, 0);
  const diferencia = totalPositivos + totalNegativos; // Suma ya que totalNegativos es negativo

  return (
    <div className="container mt-2">
      <h1 className="mb-4">Resumen Financiero de Proveedores</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="alert alert-success" role="alert">
            Total Deuda: $ {totalPositivos.toLocaleString()}
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-danger" role="alert">
            Total Adelantado: $ {totalNegativos.toLocaleString()}
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-info" role="alert">
            Diferencia: $ {diferencia.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="mb-3">Deuda</h2>
          {lista.Lista.filter(item => item.Saldo >= 0).map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.Nombre}</h5>
                <p className="card-text">Saldo: $ {item.Saldo.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <h2 className="mb-3">Adelantado</h2>
          {lista.Lista.filter(item => item.Saldo < 0).map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.Nombre}</h5>
                <p className="card-text">Saldo: $ {item.Saldo.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Balances;
