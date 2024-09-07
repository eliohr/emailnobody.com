import React, { useState } from 'react';
import './Desktop.css';
import Window from './Window';
import iconReceive from '/receive.png';
import iconSend from '/send.png';

const Desktop = () => {
    
    const [sendData, setSendData] = useState({
        title: "email",
        image: iconSend,
        content:
            <>
                <p>name field, subject field, body field, send button</p>
            </>,
        isOpen: true
    });
    
    const [receiveData, setReceiveData] = useState({
        title: "email",
        image: iconReceive,
        content:
            <>
                <p>name field, subject field, body field, datetime</p>
            </>,
        isOpen: false
    });
    
    const openSendWindow = () => {
        setSendData({ ...sendData, isOpen: true });
        setReceiveData({ ...receiveData, isOpen: false });
    };

    const openReceiveWindow = () => {
        setReceiveData({ ...receiveData, isOpen: true });
        setSendData({ ...sendData, isOpen: false });
    };

    const closeWindow = () => {
        setSendData({ ...sendData, isOpen: false });
        setReceiveData({ ...receiveData, isOpen: false }); 
        sparkleAnimation();
    }

    const sparkleAnimation = () => {

        const sparkle = document.getElementById('sparkle');
        
        for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
                sparkle.src = `sparkle${i}.png`;
            }, i * 200);
        }

    }

    return (
        <>

        <div className="sparkle-container">
            <img id="sparkle" src="sparkle4.png" />
        </div>

        <div className="app-icon-container">
            <img src="/send.png" className="app-icon" onClick={openSendWindow} />
            <img src="/receive.png" className="app-icon" onClick={openReceiveWindow} />
        </div>
        
        <Window id="send-window" data={sendData} close={closeWindow} />
        <Window id="receive-window" data={receiveData} close={closeWindow} />

        </>
    );

};

export default Desktop;