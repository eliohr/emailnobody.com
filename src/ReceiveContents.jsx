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
        sent: sent
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

    function formatDateBasic(date) {
        const dateObj = new Date(date);
      
      
        const timezoneOffset = dateObj.getTimezoneOffset(); // e.g., -240 for UTC+4, 300 for UTC-5
      
        const localDate = new Date(dateObj.getTime() - timezoneOffset * 60000);
      
        return localDate.toLocaleDateString("en-us", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
    }

    const parseEmail = (data) => {
        setName(data.name);
        setSubject(data.subject);
        setBody(data.body);
        var sentDate = new Date(data.sent);
        var sentString = formatDateBasic(sentDate);
        setSent(sentString);
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
                <div className="nonbutton-parent">
                    <div className="nonbutton">
                        <div className="row-wrap" id="name">
                            <p className="left" id="margin-guy">{email.name}@emailnobody.com</p>
                            <p className="right" id="time">{email.sent}</p>
                        </div>
                        <div className="row-wrap" id="subject">
                            <p className="left">subject: </p>
                            <p className="right">{email.subject}</p>
                        </div>
                        <div className="row-wrap" id="body">
                            <textarea className="input-line body-out"
                                    id="body"
                                    name="body"
                                    maxlength="2048"
                                    value={email.body}
                                    placeholder="hello this is my email......"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReceiveContents;