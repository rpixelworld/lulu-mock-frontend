import EditWindow from "../components/EditWindow";
import {useEffect, useState} from "react";

export const ShoppingCart = ()=> {
    const [open, setOpen] = useState(false);
    const openEdit=()=>{
        setOpen(true)
    }
    const closeEdit = () => {
        setOpen(false);
    };
    return <>
        <button onClick={openEdit}>Edit</button>
    <EditWindow state={open} closeEdit={closeEdit}/>
    </>

}