import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

let socket: Socket | null;
export const useSocket = (): [Socket | null, () => void] => {
  const { data: session } = useSession();
  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });
      // socket.on("connect", () => {
      //   console.log("websocket connected");
      //   if (session?.user?.email) {
      //     socket?.emit("login", { id: session?.user?.email });
      //   }
      // });
      socket.on("connect_error", (err) => console.log(err));
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email) {
      socket?.emit("login", { id: session?.user?.email });
    }
  }, [session]);

  return [socket, disconnect];
};
