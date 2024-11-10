import React from "react";
import { Toaster, toast } from 'sonner';
import "./index.css";
function Notification() {
    const notif_button = () => {
        toast("NOTIFICATION: YOU STINK!!")
    }
    return (
        <div>
            <Toaster />
            <button className="Notification-Button" onClick={(notif_button)}>Notification Test</button>
        </div>
    );
}
function Basebutton(){ 
    const login_button = () => { // Button Test
        console.log("clicked")
    };
    return(
        <button onClick={login_button} className="my-button">Login</button>
    )
}
function App() {
    return (
        <div>
            <Basebutton />
            <Notification />
        </div>
    );
}
export default App;