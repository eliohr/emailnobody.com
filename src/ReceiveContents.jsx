import React, { useState, useEffect } from 'react';
import './Contents.css';

function ReceiveContents({ close, oopsy }) {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sent, setSent] = useState('');

    const email = {
        name: name,
        subject: subject,
        body: body,
        createdon: sent
    };

    useEffect(() => {
        loadEmail();
    }, []);

    async function getCount() {

        try {
            const response = await fetch('http://localhost:8085/emails/count', {
                method: 'GET'
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Received count ', result);
                return result;
            } else {
                console.error('Error: ', response.statusText);
                return 0;
            }

        } catch (error) {
            console.error('Request failed', error);
            return 0;
        }

    };

    async function getEmail(index) {

        try {
            const response = await fetch(`http://localhost:8085/emails/${index}`, {
                method: 'GET'
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Received email ', result);
                parseEmail(result);
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

    };

    const parseEmail = (data) => {
        setName(data.name);
        setSubject(data.subject);
        setBody(data.body);
        setSent(data.sent);
    };

    const loadEmail = async () => {
        const x = await getCount();
        console.log('get count x is ', x);
        const randomIndex = Math.floor(Math.random() * x) + 1;
        console.log('random index is ', randomIndex);
        await getEmail(randomIndex);
    };

    return (
        <>
            <div className="contents">
                <div id="who-when">
                    <p>from: {email.name}@emailnobody.com</p>
                    <p>{email.sent}</p>
                </div>
                <p>subject: {email.subject}</p>
                <p>body: {email.body}</p>
            </div>
        </>
    );
}

export default ReceiveContents;