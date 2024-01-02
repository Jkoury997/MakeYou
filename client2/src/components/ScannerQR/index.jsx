import { Component } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

class ScannerQR extends Component {
  componentDidMount() {
    const config = {
      fps: 10,
      qrbox: 250,
      facingMode: "environment" // Cambiado a cámara trasera
    };

    const onScanSuccess = (decodedText, decodedResult) => {
      console.log(`Código QR detectado: ${decodedText}`, decodedResult);
      this.showAlert(decodedText); // Muestra una alerta con el texto decodificado
    };

    const onScanFailure = (error) => {
      console.log(`Error al escanear: ${error}`);
    };

    this.scanner = new Html5QrcodeScanner(
      "qr-reader", config, /* verbose= */ false);
    this.scanner.render(onScanSuccess, onScanFailure);
  }

  showAlert(decodedText) {
    // Puedes reemplazar esto con un modal de Bootstrap para una mejor UX
    alert(`Código QR detectado: ${decodedText}`);
  }

  componentWillUnmount() {
    this.scanner.clear();
  }

  render() {
    return (
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Escaner de Códigos QR</h2>
            <div id="qr-reader" className="mb-4 border"></div>
            <p className="text-center">
              Apunta la cámara trasera hacia un código QR para escanearlo.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ScannerQR;
