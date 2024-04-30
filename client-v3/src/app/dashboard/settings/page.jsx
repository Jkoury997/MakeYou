"use client"
import React, { useState, useEffect } from "react";

import { CreateButton } from "@/components/component/create-button";
import { ListTable } from "@/components/component/list-table";
import { StoreAll } from "@/app/api/Interna/ircounter/store";
import { SearchLast } from "@/app/api/Interna/ircounter/heartbeats";
import { CatalogoTiendas } from "@/app/api/Externa/leona/consultaTiendas";
import { AddDevice } from "@/components/component/add-device";

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

    const handleDeviceAdd = (newDevice) => {
        // Handle the new device data, e.g., display it or send it to an API
        console.log("New Device Added:", newDevice);
        // Optionally, update tableData or other state
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
            {showPopUp && <AddDevice></AddDevice>}
            <ListTable data={tableData} />
        </>
    );
}
