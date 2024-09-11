import React, { useState, useEffect } from 'react';
import './Desktop.css';
import Window from './Window';
import SendContents from './SendContents';
import ReceiveContents from './ReceiveContents';
import iconReceive from '/receive.png';
import iconSend from '/send.png';
import { dragElement } from './moveable';

const Desktop = () => {
    
    const [sendData, setSendData] = useState({
        title: "email",
        image: iconSend,
        content: <SendContents />,
        isOpen: true
    });
    
    const [receiveData, setReceiveData] = useState({
        title: "email",
        image: iconReceive,
        content: <ReceiveContents />,
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

    // window mobility modified from https://unplug.red
    useEffect(() => {
        const headers = document.getElementsByClassName("window-header");
        for (let i = 0; i < headers.length; i++) {
            dragElement(headers[i].parentNode, headers[i], true);
        }
    }, [sendData.isOpen, receiveData.isOpen]);

    const sparkleAnimation = () => {

        const sparkle = document.getElementById('sparkle');
        
        for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
                sparkle.src = `sparkle${i}.png`;
            }, i * 200 - 200);
        }

    }

    return (
        <>

        <p className="message">please, looking at this on larger device, thank you</p>
        <div className="sparkle-container">
            <img id="sparkle" src="sparkle4.png" />
        </div>

        <div className="app-icon-container">
            <img src="/send.png" className="app-icon" onClick={openSendWindow} />
            <img src="/receive.png" className="app-icon" onClick={openReceiveWindow} />
        </div>
        
        {sendData.isOpen && <Window id="send-window" data={sendData} close={closeWindow} />}
        {receiveData.isOpen && <Window id="receive-window" data={receiveData} close={closeWindow} />}

        </>
    );

};

export default Desktop;