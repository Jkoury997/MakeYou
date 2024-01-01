import { Component } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

class ScannerQR extends Component {
  componentDidMount() {
    const config = { fps: 10, qrbox: 250 };
    const onScanSuccess = (decodedText, decodedResult) => {
      console.log(`Código QR detectado: ${decodedText}`, decodedResult);
      // Puedes hacer algo con el texto decodificado o el resultado decodificado.
    };
    const onScanFailure = (error) => {
      console.log(`Error al escanear: ${error}`);
    };

    this.scanner = new Html5QrcodeScanner(
      "qr-reader", config, /* verbose= */ false);
    this.scanner.render(onScanSuccess, onScanFailure);
  }

  componentWillUnmount() {
    // Limpia el escáner QR al salir del componente
    this.scanner.clear();
  }

  render() {
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center mb-4">Escaner de Códigos QR</h2>
            <div id="qr-reader" className="mb-4"></div>
            <p className="text-center">
              Apunta la cámara hacia un código QR para escanearlo.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ScannerQR;