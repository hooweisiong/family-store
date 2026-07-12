'use client';

import { useEffect, useRef, useState } from 'react';
import type { Html5Qrcode as Html5QrcodeType } from 'html5-qrcode';

interface UseBarcodeScannerOptions {
  onScan: (barcode: string) => void;
  onError?: (error: string) => void;
}

export function useBarcodeScanner({ onScan, onError }: UseBarcodeScannerOptions) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeType | null>(null);
  const elementId = 'barcode-scanner';

  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {});
    };
  }, []);

  const startScanning = async () => {
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      scannerRef.current = new Html5Qrcode(elementId);

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {}
      );

      setIsScanning(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start scanner';
      onError?.(message);
    }
  };

  const stopScanning = async () => {
    try {
      await scannerRef.current?.stop();
      setIsScanning(false);
    } catch {
      // ignore
    }
  };

  return { isScanning, startScanning, stopScanning, elementId };
}
