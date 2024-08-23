import { useState, useEffect, useCallback } from 'react';

const useOnlineStatus = () => {
    
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const updateOnlineStatus = useCallback(() => {
        setIsOnline(navigator.onLine);
    }, []);

    useEffect(() => {
        //add event listner to detect online status
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [updateOnlineStatus]);

    return isOnline;
};

export default useOnlineStatus;