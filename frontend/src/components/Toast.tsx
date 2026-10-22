import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="toast-container animate-fade-in">
      <div className="toast-card glass-panel">
        <CheckCircle2 size={20} className="emerald-icon" />
        <span className="toast-text">{message}</span>
        <button type="button" className="toast-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
