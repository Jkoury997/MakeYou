"use client"
import { AddDevice } from "@/components/component/add-device";
import { CreateButton } from "@/components/component/create-button";
import { ListTable} from "@/components/component/list-table";
import { useState } from "react";

export default function Page () {
    const [showPopUp, setShowPopUp] = useState(false);

    const handleButtonClick = () => {
        setShowPopUp(prevShowPopUp => !prevShowPopUp);  // Toggle the visibility of the pop-up
      };
      
    const handleClose = () => {
      setShowPopUp(false); // Ocultar el Pop-Up
    };
    return(
        <>

        <CreateButton onClick={handleButtonClick}></CreateButton>
        {showPopUp && <AddDevice onClose={handleClose} />} {/* Mostrar el Pop-Up si showPopUp es true */}
        <ListTable></ListTable>
        </>
    )
}