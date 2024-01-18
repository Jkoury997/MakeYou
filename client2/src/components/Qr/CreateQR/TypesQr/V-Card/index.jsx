import { useEffect, useState } from 'react';
import qr from '../../../../../api/qr';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';

import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';


const VCard = () => {
    const navigate = useNavigate();
    const [mapCenter, setMapCenter] = useState({ lat: 41.3851, lng: 2.1734 });
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSelectAddress = async (address) => {
        const results = await geocodeByPlaceId(address.value.place_id);
        console.log(results)

        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const addressLink = `https://www.google.com/maps?q=${lat},${lng}`;
        console.log(addressLink)

        setSelectedAddress(address);
        setMapCenter({ lat, lng });
        setFormData({ 
            ...formData, 
            address: address.label, 
            addresslink: addressLink 
        });
    };

    


    const [formData, setFormData] = useState({
        typeQr: 'vcard',
        name: '',
        lastname: '',
        phone: '',
        phoneBusinnes: '',
        address: '',
        company: '',
        titleJob: '',
        email: '',
        website: '',
        color: '#563d7c',
        logo: '',
        whatsapplink: '',
        addressLink: ''// Este es el valor predeterminado para el color de fondo
        // ...otros campos que necesites
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepara el enlace de WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=54${formData.phone}`;
    
        const dataToSend = {
            ...formData,
            whatsapplink: whatsappLink
        };
    
        try {
            const response = await qr.create(dataToSend);
            console.log(response);
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            console.error('Error al crear:', error);
        }
    };
    




    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-sm mt-2">
                            <input 
                            type="text" 
                            className="form-control" 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Nombre" 
                            aria-label="First name" 
                            required
                        />
                </div>
                <div className="col-sm mt-2">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="lastname" 
                    placeholder="Apellido" 
                    aria-label="Last name" 
                    value={formData.lastname} 
                    onChange={handleChange}
                    required />
                </div>
            </div>
            <div className="row">
                <div className="col-sm mt-2">
                    <div className="input-group">
                            <span className="input-group-text" id="basic-addon3">+54</span>
                            <input 
                                type="number" 
                                className="form-control" 
                                name='phone' 
                                placeholder="11 2222 4444" 
                                aria-label="phone"
                                value={formData.phone} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                    </div>

                <div className="col-sm mt-2">
                <input 
                            type="number" 
                            className="form-control" 
                            name="phoneBusinnes" 
                            placeholder="Telefono Empresa" 
                            aria-label="business phone"
                            value={formData.phoneBusinnes} 
                            onChange={handleChange}
                            required 
                        />
                </div>
            </div>
            <div className="row">
                <div className="col-sm mt-2">
                <div className="col-sm mt-2">
                    <GooglePlacesAutocomplete
                        apiKey="AIzaSyCpWvfH4kaRJ7WxQxFU1oPasGVXWGhveQg"
                        selectProps={{
                            value: selectedAddress,
                            onChange: handleSelectAddress,
                        }}
                    />
                </div>
                    <div className="d-flex justify-content-center align-items-center mt-2"> 
                            <GoogleMap
                                mapContainerStyle={{ height: '50vh', width: '100%' }}
                                zoom={15}
                                center={mapCenter}>
                                <Marker position={mapCenter} />
                            </GoogleMap>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm mt-2">
                <input 
                            type="text" 
                            className="form-control" 
                            name='company' 
                            placeholder="Empresa" 
                            aria-label="company" 
                            value={formData.company} 
                            onChange={handleChange} 
                            required
                        />
                </div>
                <div className="col-sm mt-2">
                <input 
                            type="text" 
                            className="form-control" 
                            name='titleJob' 
                            placeholder="Cargo" 
                            aria-label="title job" 
                            value={formData.titleJob} 
                            onChange={handleChange} 
                            required
                        />
                </div>
            </div>
            <div className="row">
                <div className="col-sm mt-2">
                <input 
                            type="email" 
                            className="form-control" 
                            name='email' 
                            placeholder="ejemplo@dominio.com" 
                            aria-label="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required
                        />
                </div>
                <div className="col-sm mt-2">
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">Web</span>
                        <input 
                                type="url" 
                                className="form-control" 
                                name="website" 
                                placeholder="www.dominio.com" 
                                aria-describedby="basic-addon3"
                                value={formData.website} 
                                onChange={handleChange} 
                                required
                            />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm mt-2">
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">Color de Fondo</span>
                        <input 
                            type="color" 
                            className="form-control form-control-color" 
                            id="ColorInput"
                            name='color' 
                            title="Elija su color" 
                            value={formData.color} 
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-sm mt-2">
                <select 
                        className="form-select" 
                        aria-label="Seleccionar Logo" 
                        name="logo"
                        value={formData.logo} 
                        onChange={handleChange}
                        required
                    >
                        <option disabled value="">Seleccione un Logo</option>
                        <option value="MK">Marcela Koury</option>
                        <option value="MY">Make You</option>
                        <option value="MS">Marshadi</option>
                        <option value="ZL">Zalei</option>
                    </select>
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <button type="submit" className="btn btn-danger ">Borrar datos</button>
            <button type="submit" className="btn btn-primary ">Crear nuevo</button>

            </div>
        </form>
    </>
    )
}

export default VCard