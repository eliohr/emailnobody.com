import React, { useState } from 'react';
import './Contents.css';

const SendContents = ({ close, oopsy, profanity }) => {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    async function handleSendEmail() {

        const email = {
            name: name,
            subject: subject,
            body: body,
        };

        function isClean(contents) {
            // in the near future will implement https://github.com/jo3-l/obscenity
            return true;
        }

        if ((isClean(email.name)) && (isClean(email.subject)) && (isClean(email.body))) {
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
                oopsy();
            }

        } catch (error) {
            console.error('Request failed', error);
            close();
            oopsy();
        }
    } else profanity();

    };

    return (
            <>
            <div className="contents">
                <div className="nonbutton-parent">
                    <div className="nonbutton">
                            <div className="row-wrap" id="name">
                                <p>name</p>
                                <div className="input-line" id="input">
                                    <input 
                                        autocomplete="off"
                                        maxLength="16"
                                        placeholder="somebody"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <p>@emailnobody.com</p>
                                </div>
                            </div>
                            <div className="row-wrap" id="subject">
                                <p>subject</p>
                                <div className="input-line" id="input">
                                <input
                                    autocomplete="off"
                                    maxLength="32"
                                    placeholder="something"
                                    id="subject"
                                    name="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                </div>
                            </div>
                            <div className="row-wrap" id="body">
                                <div className="input-line" id="body">
                                    <textarea className="input-line"
                                        id="body"
                                        name="body"
                                        maxlength="2048"
                                        value={body}
                                        placeholder="hello this is my email......"
                                        onChange={(e) => setBody(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="send" onClick={handleSendEmail}>send it</button>
                </div>
            </>
    );
};

export default SendContents;