const Card = ({ title, count, iconClassName }) => {
    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-2">
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <div className="media d-flex justify-content-between">
                            <div className="media-body text-left">
                                <h3 className="danger">{count}</h3>
                                <span>{title}</span>
                            </div>
                            <div className="align-self-center">
                                <i className={iconClassName} style={{ fontSize: '3rem' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;