import React, { useState } from 'react';
import './Contents.css';

const WarningContents = ({ close }) => {

    return (
            <>
            <div className="contents">
                    <div id="warning-wrap">
                        <p id="warning">hey thanks for coming. 
                            don't put sensitive info on here please. 
                            and i've made it difficult to say bad 
                            words as well—if you want to curse you 
                            can just <a href="https://elihookerreese.com/contact" target="_blank">
                            send an email to me for real</a>
                        </p>
                    </div>
                    <div id="ok-wrap">
                        <button id="ok" onClick={close}>alright cool ok</button>
                    </div>
            </div>
            </>
    );
};
export default WarningContents;