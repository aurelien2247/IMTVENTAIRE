import React, { useState } from 'react';
import { useZxing } from 'react-zxing';

interface ScannerProps {
  onCodeScanned: (code: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onCodeScanned }) => {
  const [error, setError] = useState<string>('');

  const { ref } = useZxing({
    onDecodeResult(result) {
      const code = result.getText();
      // Vérifier si c'est un code 128 valide (commence généralement par {C)
      if (code.startsWith('{C') || isValidCode128(code)) {
        onCodeScanned(code);
      }
    },
    onError(error) {
      setError(`Erreur de scan: ${error.message}`);
    },
    constraints: {
      video: {
        facingMode: 'environment', // Utilise la caméra arrière
      },
    },
    formats: ['CODE_128'], // Spécifie qu'on ne veut scanner que les codes 128
  });

  // Fonction pour valider un code 128
  const isValidCode128 = (code: string): boolean => {
    // Code 128 doit avoir une longueur minimale (start + données + checksum + stop)
    if (code.length < 4) return false;

    // Vérification basique des caractères valides pour Code 128
    const validChars = /^[\x00-\x7F]+$/; // Caractères ASCII 0-127
    return validChars.test(code);
  };

  return (
    <div className="scanner-container">
      <video
        ref={ref}
        className="scanner-video"
        style={{
          width: '100%',
          maxWidth: '600px',
          border: '2px solid #ccc',
          borderRadius: '8px',
        }}
      />
      {error && (
        <div className="scanner-error" style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
      <style jsx>{`
        .scanner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 10px;
          margin: 20px auto;
          max-width: 640px;
        }
        .scanner-video {
          background: black;
        }
        .scanner-error {
          text-align: center;
          font-weight: bold;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Scanner; 