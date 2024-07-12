import { useRef } from 'react';

const Notification = ({ notification }) => {
    const styleRef = useRef(null);

    if (notification) {
        switch (notification.type) {
            case 'error':
                styleRef.current = { color: 'red' };
                break;
            case 'success':
                styleRef.current = { color: 'green' };
                break;
        }

        return (
            <p
                style={{
                    ...styleRef.current,
                    padding: '10px',
                    outline: `2px solid ${styleRef.current.color}`,
                    borderRadius: '5px',
                    backgroundColor: 'lightgray',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {notification.message}
            </p>
        );
    }
};
export default Notification;
