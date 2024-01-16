"use client";

import { useSocket } from "@/app/(afterLogin)/messages/[room]/_lib/useSocket";

const WebSocketComponent = () => {
  const [socket, disconnect] = useSocket();
  return null;
};

export default WebSocketComponent;
