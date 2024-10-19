import React, { useState, useEffect } from 'react';
import './Desktop.css';
import Window from './Window';
import WarningContents from './WarningContents';
import SendContents from './SendContents';
import ReceiveContents from './ReceiveContents';
import iconWarning from '/warning.png';
import iconReceive from '/receive.png';
import iconSend from '/send.png';
import { dragElement } from './moveable';

const Desktop = () => {
    
    /*

    // only display warning when browser hasn't seen site
    useEffect (() => {
        if(document.cookie = "HasVisited=true"){
            setWarning(false);
        }
        else {
            document.cookie = "HasVisited=true";
            setWarning(true);
        }
    });

    */

    const [warningData, setWarningData] = useState({
        title: "fyi",
        image: iconWarning,
        content: <WarningContents  />,
        isOpen: true
    });

    const [sendData, setSendData] = useState({
        title: "email",
        image: iconSend,
        content: <SendContents />,
        isOpen: false
    });
    
    const [receiveData, setReceiveData] = useState({
        title: "email",
        image: iconReceive,
        content: <ReceiveContents />,
        isOpen: false
    });

    const [warning, setWarning] = useState(true);
    
    const openSendWindow = () => {
        if(!warning) {
            setSendData({ ...sendData, isOpen: true });
            setReceiveData({ ...receiveData, isOpen: false });
            setWarningData({ ...warningData, isOpen: false });
        }
        else {
            pleaseAccept();
        }
    };

    const openReceiveWindow = () => {
        if(!warning) {
            setReceiveData({ ...receiveData, isOpen: true });
            setSendData({ ...sendData, isOpen: false });
            setWarningData({ ...warningData, isOpen: false });
        }
        else {
            pleaseAccept();
        };
    };

    const closeWindow = () => {
        if(!warning) {
            setSendData({ ...sendData, isOpen: false });
            setReceiveData({ ...receiveData, isOpen: false }); 
            setWarningData({ ...warningData, isOpen: false });
            sparkleAnimation();
        }
        else {
            pleaseAccept();
        };
    };

    const warnDone = () => {
        
        setWarning(false);

        // not sure why openSendWindow reads the warning as true until
        // the second click even when call it within a setTimeout

        setSendData({ ...sendData, isOpen: true });
        setReceiveData({ ...receiveData, isOpen: false });
        setWarningData({ ...warningData, isOpen: false });

    }
    
    // window mobility modified from https://unplug.red
    useEffect(() => {
        const headers = document.getElementsByClassName("window-header");
        for (let i = 0; i < headers.length; i++) {
            dragElement(headers[i].parentNode, headers[i], true);
        }
    }, [sendData.isOpen, receiveData.isOpen, warningData.isOpen]);

    const sparkleAnimation = () => {

        const sparkle = document.getElementById('sparkle');
        
        for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
                sparkle.src = `sparkle${i}.png`;
            }, i * 200 - 200);
        }

    }

    function oopsy() {
        document.getElementById('oopsy').style.transition = 'none';
        document.getElementById('oopsy').style.opacity = '100';
        setTimeout(oopsDisplay, 100);
    }

    function oopsDisplay() {
        document.getElementById('oopsy').style.transition = 'opacity 3s';
        document.getElementById('oopsy').style.opacity = '0';
    }

    function pleaseAccept() {
        document.getElementById('please-accept').style.transition = 'none';
        document.getElementById('please-accept').style.opacity = '100';
        setTimeout(paDisplay, 100);
    }

    function paDisplay() {
        document.getElementById('please-accept').style.transition = 'opacity 3s';
        document.getElementById('please-accept').style.opacity = '0';
    }

    return (
        <>
        <img id="oopsy" src="/oopsy.png"></img>
        <img id="please-accept" src="/pa.png"></img>
        <p className="message">still working on support for smaller screens :/</p>
        <div className="sparkle-container">
            <img id="sparkle" src="sparkle4.png" />
        </div>

        <div className="app-icon-container">
            <div id="title">
                <h2>email nobody dot com</h2>
                <p>by <a href="https://elihookerreese.com" target="_blank"><b>eli hooker reese</b></a></p>
            </div>
            <div id="apps">
                <img src="/send.png" className="app-icon" onClick={openSendWindow} />
                <img src="/receive.png" className="app-icon" onClick={openReceiveWindow} />
            </div>
        </div>
        
        {warningData.isOpen && React.cloneElement(<Window id="warning-window" />, { data: warningData, close: openSendWindow, ok: warnDone })}
        {sendData.isOpen && React.cloneElement(<Window id="send-window" />, { data: sendData, close: closeWindow, oopsy: oopsy })}
        {receiveData.isOpen && React.cloneElement(<Window id="receive-window" />, { data: receiveData, close: closeWindow, oopsy: oopsy })}

        </>
    );

};

export default Desktop;