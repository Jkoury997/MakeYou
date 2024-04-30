"use client"
import React, { useState, useEffect } from "react";

import { CreateButton } from "@/components/component/create-button";
import { ListTable } from "@/components/component/list-table";
import { StoreAll } from "@/app/api/Interna/ircounter/store";
import { SearchLast } from "@/app/api/Interna/ircounter/heartbeats";
import { CatalogoTiendas } from "@/app/api/Externa/leona/consultaTiendas";
import { AddDevice } from "@/components/component/add-device";
import { CreateStore } from "@/app/api/Interna/ircounter/store";
export default function Page () {
    const [showPopUp, setShowPopUp] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [storeCatalogo, setStoreCatalogo] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        fetchStores();
    }, []);

    const fetchData = async () => {
        try {
            const stores = await StoreAll();  // Assume this returns an array of stores
            const heartbeatsResponses = await Promise.all(stores.map(store => SearchLast(store.sn)));

            const combinedData = stores.map((store, index) => {
                const heartbeat = heartbeatsResponses[index];  // Directly use the object, no need to check array
                return {
                    uuid: store.uuid,
                    sn: store.sn,
                    name: store.name,
                    receivingPower: heartbeat ? heartbeat.receivingPower : 'N/A',
                    transmissionPower: heartbeat ? heartbeat.transmissionPower : 'N/A'
                };
            });
            console.log("Combined Data:", combinedData);
            setTableData(combinedData);
        } catch (error) {
            setError(error)
            console.error("Error fetching data:", error);
        }
    };

    const fetchStores = async () => {
        setLoading(true);
        try {
            const catalogostores = await CatalogoTiendas()
            
            setLoading(false);
            setStoreCatalogo(catalogostores)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleDeviceAdd = async (newDevice) => {
        const response = await CreateStore(newDevice)
        console.log(newDevice);
        fetchData()
    };

    const handleButtonClick = () => {
        setShowPopUp(prev => !prev);
    };

    const handleClose = () => {
        setShowPopUp(false);
    };

    return (
        <>
            <CreateButton onClick={handleButtonClick} />
            {showPopUp && <AddDevice onDeviceData={handleDeviceAdd} storesList={storeCatalogo} ></AddDevice> }
            <ListTable data={tableData} />
        </>
    );
}
