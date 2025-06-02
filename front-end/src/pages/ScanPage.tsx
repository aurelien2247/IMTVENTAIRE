import React, { useState } from 'react';
import Scanner from '../components/custom/Scanner';

const ScanPage: React.FC = () => {
  const [scannedCode, setScannedCode] = useState<string>('');

  const handleCodeScanned = (code: string) => {
    setScannedCode(code);
    // Ici vous pouvez ajouter votre logique pour traiter le code scanné
    console.log('Code scanné:', code);
  };

  return (
    <div className="scan-page">
      <h1>Scanner de Code-barres</h1>
      <Scanner onCodeScanned={handleCodeScanned} />
      {scannedCode && (
        <div className="result-container">
          <h2>Code Scanné:</h2>
          <p className="scanned-code">{scannedCode}</p>
        </div>
      )}
      <style jsx>{`
        .scan-page {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        .result-container {
          margin-top: 20px;
          padding: 15px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .scanned-code {
          font-family: monospace;
          font-size: 1.2em;
          padding: 10px;
          background: #f0f0f0;
          border-radius: 4px;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
};

export default ScanPage; 