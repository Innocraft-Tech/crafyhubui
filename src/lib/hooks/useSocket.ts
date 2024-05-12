import { useEffect, useState, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

const useSocket = (serverUrl: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(serverUrl);

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
