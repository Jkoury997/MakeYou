"use client"
import React, { useState, useEffect } from "react";
import { AddDevice } from "@/components/component/add-device";
import { CreateButton } from "@/components/component/create-button";
import { ListTable} from "@/components/component/list-table";
import { StoreAll } from "@/app/api/Interna/ircounter/store";
import { Search } from "@/app/api/Interna/ircounter/heartbeats";

export default function Page () {
    const [showPopUp, setShowPopUp] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
  
        const stores = await StoreAll();      
        const heartbeatsResponses = await Promise.all(stores.map(store =>  Search(store.sn)));

        const combinedData = stores.map((store, index) => {
          const heartbeats = heartbeatsResponses[index] && heartbeatsResponses[index][0] ? heartbeatsResponses[index][0] : {};
          return {
              uuid: store.uuid,
              sn: store.sn,
              name: store.name,
              receivingPower: heartbeats.receivingPower || 'N/A',
              transmissionPower: heartbeats.transmissionPower || 'N/A'
          };
      });
      console.log(combinedData)
        
          setTableData(combinedData);
          

  };

    const handleButtonClick = () => {
        setShowPopUp(prev => !prev);
    };

    const handleClose = () => {
        setShowPopUp(false);
    };

    return(
        <>
            <CreateButton onClick={handleButtonClick} />
            {showPopUp && <AddDevice onClose={handleClose} />}
            <ListTable data={tableData} />
        </>
    );
}
