"use client"
import React, { useState, useEffect } from "react";
import { AddDevice } from "@/components/component/add-device";
import { CreateButton } from "@/components/component/create-button";
import { ListTable } from "@/components/component/list-table";
import { StoreAll } from "@/app/api/Interna/ircounter/store";
import { SearchLast } from "@/app/api/Interna/ircounter/heartbeats";

export default function Page () {
    const [showPopUp, setShowPopUp] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchData();
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
            console.error("Error fetching data:", error);
        }
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
            {showPopUp && <AddDevice onClose={handleClose} />}
            <ListTable data={tableData} />
        </>
    );
}
