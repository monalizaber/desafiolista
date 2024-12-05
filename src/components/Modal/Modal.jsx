import React from 'react';
import './index.scss';

export default function Modal({isOpen, onClose, children}) {
  if(!isOpen){
    return 
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
