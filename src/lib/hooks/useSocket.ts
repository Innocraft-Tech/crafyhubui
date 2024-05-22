import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const socketIO: Socket | null = null;

const useSocket = (serverUrl: string): Socket | null => {
  // const [currentSocket, setCurrentSocket] = useState<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // if (!socketIO) {
    //   socketIO = io(serverUrl);
    // }
    // setCurrentSocket(socketIO);

    const newSocket = io(serverUrl);

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      // if (socketIO) {
      //   socketIO.disconnect();
      //   socketIO = null;
      // }
    };
  }, [serverUrl]);

  return socket;
  // return currentSocket;
};

export default useSocket;
