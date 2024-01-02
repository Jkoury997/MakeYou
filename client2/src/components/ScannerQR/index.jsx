import { useEffect,useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const ScannerQR = () => {

  const [qrcode , setQrCode] = useState()
  useEffect(() => {
    const qrScannerConfig = {
      fps: 10,
      qrbox: 250,
      facingMode: "environment",
    };

    const handleScanSuccess = (decodedText) => {
      // Redirigir al usuario a la página deseada
      setQrCode(decodedText)

    };

    const handleScanFailure = (error) => {
      console.error(`Error scanning QR Code: ${error}`);
    };

    const qrScanner = new Html5QrcodeScanner(
      "qr-reader", qrScannerConfig, false
    );
    qrScanner.render(handleScanSuccess, handleScanFailure);

    return () => {
      qrScanner.clear();
    };
  }, []);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">QR Code Scanner</h2>
          <div id="qr-reader" className="mb-4 border"></div>
          <p className="text-center">
            Point the rear camera at a QR Code to scan it.
          </p>
          <p>{qrcode} </p>
        </div>
      </div>
    </div>
  );
}

export default ScannerQR;
