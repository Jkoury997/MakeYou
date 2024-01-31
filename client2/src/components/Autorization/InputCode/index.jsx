const InputCode = () => {
    return(
        <div className="row mt-3">
            <div className="col-12 col-md-9 mb-2 mb-md-0">
                <div className="form-floating mb-1 mt-2">
                    <input type="text" className="form-control" id="code" placeholder="Ingresa el codigo"/>
                    <label htmlFor="code">Codigo</label>
                </div>
            </div>
            <div className="col-12 col-md-3 d-flex align-items-center">
                <button 
                    type="button" 
                    className="btn btn-primary btn-pink btn-lg w-100"
                >
                    Consultar
                </button>
            </div>
        </div>
    )
}

export default InputCode