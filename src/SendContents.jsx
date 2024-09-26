import React, { useState } from 'react';
import './Contents.css';
import oopsy from '/oopsy.png';

const SendContents = ({ close }) => {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    async function oopsy() {
        document.getElementById('oopsy').style.zIndex = '999';
        document.getElementById('oopsy').style.opacity = '100';
        setTimeout(() => {
            document.getElementById('oopsy').style.opacity = '0';
            document.getElementById('oopsy').style.zIndex = '-999';
        }, 5000);
    }

    async function handleSendEmail() {

        const email = {
            name: name,
            subject: subject,
            body: body,
        };

        try {
            const response = await fetch('http://localhost:8085/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Sent email ', result);
                close();
            } else {
                console.error('Error: ', response.statusText);
                close();
            }

        } catch (error) {
            console.error('Request failed', error);
            oopsy();
        }

    };

    return (
            <>
            <img id="oopsy" src="/oopsy.png"></img>
            <div className="contents">
                <div className="input-wrap" id="name">
                    <p>name</p>
                    <div id="address">
                        <input autocomplete="off"
                        maxLength="15"
                        placeholder="someone"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}></input>
                        <p>@emailnobody.com</p>
                    </div>
                </div>
                <div className="input-wrap" id="subject">
                    <p>subject</p>
                    <input autocomplete="off"
                    maxLength="15"
                    placeholder="something"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}></input>
                </div>
                <div className="body-wrap" id="body">
                    <textarea id="body"
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}></textarea>
                </div>
                <button id="send" onClick={handleSendEmail}>send it</button>
            </div>
            </>
    );
};

export default SendContents;