import Logo from "/image/logo-Marcela-Koury.svg";

const SelectCompany = ({ user, empresas,onCompanySelect }) => {


    return (
        <main>
            <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="text-center mt-3 mb-3">
                                    <img src={Logo} alt="Logo" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                                </div>
                                <div className="card-body">
                                    <h3 className="text-center">Bienvenido {user}</h3>
                                    {empresas.map((empresa) => (
                                        <div key={empresa.Codigo} className="d-grid gap-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-pink mt-4 p-2" 
                                                onClick={() => onCompanySelect(empresa.Codigo)}
                                            >
                                                {empresa.Nombre}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SelectCompany;
