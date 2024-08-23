import { useCallback, useEffect } from 'react';
import useOnlineStatus from './useOnlineStatus';

export const useBufferedApiRequests = (url) => {

    //check if the user is online
    const isOnline = useOnlineStatus();
    const MAX_RETRIES = 5;
    let errorCount = 0;

    const sendRequest = useCallback((payload) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: 'no-cors', //to allow CORS
            body: JSON.stringify({
                id: payload,
            })
        })
            .then(response => console.log('Response Received', response)) //convert to response to json , here its not needed
            .then(response => console.log('Request successful:'))
            .catch(error => {
                console.error('Request failed:', error);
                errorCount++;
                if (errorCount <= MAX_RETRIES) {
                    console.log('Will Retrying this request later');
                    bufferRequest(payload)
                } else {
                    console.error('Request with Payload Id ', payload, ' failed with error ', error);
                }
            });

    }, [errorCount, url]);

    const bufferRequest = (data) => {
        /** Set the request in localStorage so that it can be accessed when online */
        const bufferedRequests = JSON.parse(localStorage.getItem('bufferedRequests')) || [];
        bufferedRequests.push(data);
        localStorage.setItem('bufferedRequests', JSON.stringify(bufferedRequests));
    };

    const handleRequest = (data) => {
        /** If online send the request for pish it into the buffer requests */
        if (isOnline) {
            sendRequest(data);
        } else {
            bufferRequest(data);
        }
    };

    useEffect(() => {
        if (isOnline) {
            /** If online get the buffered requests and foreach request, hit the api */
            const bufferedRequests = JSON.parse(localStorage.getItem('bufferedRequests')) || [];
            bufferedRequests.forEach((data) => sendRequest(data));
            localStorage.removeItem('bufferedRequests');
        }
    }, [isOnline, sendRequest]);

    // export a function which is to be called from the parent with payload
    return handleRequest;
};