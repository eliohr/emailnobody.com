import React, { useState } from 'react';

const SendContents = () => {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

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
            } else {
                console.error('Error: ', response.statusText);
            }

        } catch (error) {
            console.error('Request failed', error);
        }

    };

    return (
            <>
            <div className="contents">
                <div className="input-line" id="name">
                    <p>name</p>
                    <div id="address">
                        <input maxLength="15" id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}></input>
                        <p>@emailnobody.com</p>
                    </div>
                </div>
                <div className="input-line" id="subject">
                    <p>subject</p>
                    <input maxLength="15" id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}></input>
                </div>
                <div className="body" id="body">
                    <p>body</p>
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