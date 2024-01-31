import React from 'react';

const ToastComponent = ({ message, onClose, color }) => {
  const backgroundColorClass = `bg-${color}` || 'bg-primary';

  return (
    <div className={`toast align-items-center text-bg-primary border-0 ${backgroundColorClass}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white me-2 m-auto" 
          data-bs-dismiss="toast" 
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ToastComponent;

