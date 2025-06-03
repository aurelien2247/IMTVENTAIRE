export default function ScanRectangle() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-full w-full">
      <div className="relative w-80 h-32 *:border-white">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-lg" />
      </div>
    </div>
  );
}
