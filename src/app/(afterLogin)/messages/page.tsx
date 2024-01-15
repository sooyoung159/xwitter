import style from "./message.module.css";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { getRooms } from "@/app/(afterLogin)/messages/_lib/getRooms";
import Room from "@/app/(afterLogin)/messages/_component/Room";
// import Room from "@/app/(afterLogin)/messages/_component/Room";

export const metadata: Metadata = {
  title: "쪽지 / Z?",
  description: "쪽지를 보내보세요",
};
const Messages = async () => {
  const session = await auth();
  const rooms = session?.user?.email ? await getRooms(session.user.email) : [];
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      {rooms.map((room) => (
        <Room key={room.room} room={room} />
      ))}
    </main>
  );
};

export default Messages;
