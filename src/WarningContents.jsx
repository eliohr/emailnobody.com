import React, { useState } from 'react';
import './Contents.css';

const WarningContents = ({ ok }) => {

    return (
            <>
            <div className="contents">
                <div className="nonbutton-parent">
                    <div className="nonbutton">
                        <p id="warning">hey thanks for coming. 
                            don't put sensitive info on here please. 
                            and i've made it difficult to say bad
                            words as well—if you want to curse you 
                            can just <a href="https://elihookerreese.com/contact" target="_blank">
                            send an email to me for real</a>
                        </p>
                    </div>
                </div>
                <button id="ok" onClick={ok}>alright cool ok</button>
            </div>
            </>
    );
};

export default WarningContents;