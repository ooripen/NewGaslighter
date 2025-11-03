import { X } from '@phosphor-icons/react';

interface HeaderProps {
  showClose?: boolean;
  onClose?: () => void;
}

export function Header({ showClose = false, onClose }: HeaderProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      window.parent.postMessage({ type: 'closeSimulator' }, '*');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-bold text-primary">
          הגזלייטר - עמותת לא. לאלימות נגד נשים
        </h1>
        {showClose && (
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="סגור"
          >
            <X size={20} className="text-gray-600" />
          </button>
        )}
      </div>
    </header>
  );
}
