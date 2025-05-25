import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

interface ScannerProps {
  onCodeScanned: (code: string) => void;
}

const styles = {
  scannerContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  scannerWrapper: {
    position: 'fixed' as const,
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
  },
  targetBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '280px',
    height: '180px',
    zIndex: 2,
  },
  cornerTopLeft: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderTop: '3px solid #fff',
    borderLeft: '3px solid #fff',
  },
  cornerTopRight: {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    width: '40px',
    height: '40px',
    borderTop: '3px solid #fff',
    borderRight: '3px solid #fff',
  },
  cornerBottomLeft: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderBottom: '3px solid #fff',
    borderLeft: '3px solid #fff',
  },
  cornerBottomRight: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: '40px',
    height: '40px',
    borderBottom: '3px solid #fff',
    borderRight: '3px solid #fff',
  },
  successOverlay: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '280px',
    height: '180px',
    animation: 'success-pulse 1s ease-out',
    pointerEvents: 'none' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    zIndex: 3,
  },
  successCorner: {
    borderColor: '#00ff00',
  },
  successMessage: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '4px',
    position: 'absolute' as const,
    bottom: '-60px',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'pre-line' as const,
    width: 'auto',
    minWidth: '200px',
    zIndex: 4,
  },
  videoContainer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  canvas: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  }
};

const keyframes = `
@keyframes success-pulse {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}`;

const Scanner: React.FC<ScannerProps> = ({ onCodeScanned }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [scannedInfo, setScannedInfo] = useState('');
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ajouter les keyframes
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Initialiser Quagga
    if (scannerRef.current) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
            width: { min: 1280, ideal: 1920, max: 2560 },
            height: { min: 720, ideal: 1080, max: 1440 },
            aspectRatio: { min: 1, max: 2 },
          },
        },
        decoder: {
          readers: ["code_128_reader"],
          multiple: false,
          debug: {
            drawBoundingBox: true,
            showPattern: true,
          },
        },
        locate: true,
        frequency: 10,
      }, function(err: any) {
        if (err) {
          console.error("Erreur d'initialisation de Quagga:", err);
          return;
        }
        Quagga.start();
      });

      // Gestionnaire de détection
      Quagga.onDetected((result) => {
        if (result.codeResult.code) {
          const code = result.codeResult.code;
          setScannedInfo(`Numéro inventaire ${code}`);
          setShowSuccess(true);
          onCodeScanned(code);
          setTimeout(() => {
            setShowSuccess(false);
            setScannedInfo('');
          }, 1500);
        }
      });
    }

    // Nettoyage
    return () => {
      Quagga.stop();
      document.head.removeChild(style);
    };
  }, [onCodeScanned]);

  return (
    <div style={styles.scannerContainer}>
      <div style={styles.scannerWrapper}>
        <div ref={scannerRef} style={styles.videoContainer}>
          <video style={styles.video} />
        </div>
        <div style={styles.targetBox}>
          <div style={showSuccess ? { ...styles.cornerTopLeft, ...styles.successCorner } : styles.cornerTopLeft} />
          <div style={showSuccess ? { ...styles.cornerTopRight, ...styles.successCorner } : styles.cornerTopRight} />
          <div style={showSuccess ? { ...styles.cornerBottomLeft, ...styles.successCorner } : styles.cornerBottomLeft} />
          <div style={showSuccess ? { ...styles.cornerBottomRight, ...styles.successCorner } : styles.cornerBottomRight} />
        </div>
        {showSuccess && (
          <div style={styles.successOverlay}>
            <div style={styles.successMessage}>
              {scannedInfo}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;