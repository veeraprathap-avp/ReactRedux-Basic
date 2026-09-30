// Portal.tsx
import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId?: string; // Allows targeting a specific container if needed
}

export const Portal = ({ children, wrapperId = 'portal-root' }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // 1. Find or create the container element
    let element = document.getElementById(wrapperId);
    let createdNode = false;

    if (!element) {
      element = document.createElement('div');
      element.setAttribute('id', wrapperId);
      document.body.appendChild(element);
      createdNode = true;
    }

    setWrapperElement(element);

    // 2. Clean up the DOM node on unmount if we created it
    return () => {
      if (createdNode && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // 3. Return null during SSR until the wrapper element is ready on the client
  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
};

// Modal.tsx
import { useEffect, ReactNode } from 'react';
import { Portal } from './Portal';
import './Modal.css'; // Add your scoping styles here

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling when open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal wrapperId="modal-portal-root">
      {/* Backdrop overlay */}
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      
      {/* Modal Content Window */}
      <div 
        className="modal-content" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <header className="modal-header">
          {title && <h2 id="modal-title">{title}</h2>}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </header>
        <main className="modal-body">
          {children}
        </main>
      </div>
    </Portal>
  );
};

