import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function ErrorMessage({ message, onClose, autoClose = true, duration = 5000 }: ErrorMessageProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
}