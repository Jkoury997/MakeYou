const Alert = ({ type, message }) => {
    if (!message) return null; // No renderizar si no hay mensaje
  
    return (
      <div className={`alert alert-${type} mt-2`} role="alert">
        {message}
      </div>
    );
  };
  
  export default Alert;