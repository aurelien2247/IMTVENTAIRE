declare module 'quagga' {
  interface QuaggaConfig {
    inputStream: {
      name?: string;
      type?: string;
      target: HTMLElement;
      constraints: {
        width?: { min?: number; ideal?: number; max?: number };
        height?: { min?: number; ideal?: number; max?: number };
        aspectRatio?: { min?: number; max?: number };
        facingMode?: string;
      };
    };
    decoder: {
      readers: string[];
      multiple?: boolean;
      debug?: {
        drawBoundingBox?: boolean;
        showPattern?: boolean;
      };
    };
    locate?: boolean;
    frequency?: number;
  }

  interface CodeResult {
    code: string;
    format: string;
  }

  interface QuaggaResult {
    codeResult: CodeResult;
  }

  function init(config: QuaggaConfig, callback?: (err: any) => void): void;
  function start(): void;
  function stop(): void;
  function onDetected(callback: (result: QuaggaResult) => void): void;

  export default {
    init,
    start,
    stop,
    onDetected,
  };
} 