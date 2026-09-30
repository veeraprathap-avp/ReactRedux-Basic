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
// Modal.tsx
import { useEffect, useRef, ReactNode } from 'react';
import { Portal } from './Portal';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Save the element that currently has focus before opening
    previousFocusRef.current = document.activeElement as HTMLElement;

    // List of focusable elements to search for within the modal
    const focusableElementsString = 
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    
    const modalElement = modalRef.current;
    if (!modalElement) return;

    // 2. Query all focusable elements inside the modal
    const focusableElements = modalElement.querySelectorAll<HTMLElement>(focusableElementsString);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // 3. Automatically focus the first element (or the close button)
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    // 4. Trap focus and catch global key listeners
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Escape key
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Handle Tab key trapping
      if (event.key === 'Tab') {
        if (!firstFocusableElement || focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        if (event.shiftKey) {
          // Shift + Tab: If on the first element, wrap around to the last
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab: If on the last element, wrap around to the first
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // 5. Cleanup on close or unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      
      // Restore focus back to the button/element that opened the modal
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal wrapperId="modal-portal-root">
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      
      <div 
        ref={modalRef} // Attached to the container to scan for children
        className="modal-content" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1} // Makes the modal container focusable programmatically if needed
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
//styles
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  /* Use dvh (Dynamic Viewport Height) so iOS safari address bars don't cut content */
  height: 100dvh; 
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90dvh; /* Keeps modal contained on smaller mobile screens */
  overflow-y: auto; /* Fallback internal scroll if text is too long */
  z-index: 1001;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

