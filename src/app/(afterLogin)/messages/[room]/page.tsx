import style from "./chatRoom.module.css";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { UserInfo } from "@/app/(afterLogin)/messages/[room]/_component/UserInfo";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  params: { room: string };
}

const ChatRoom = async ({ params }: Props) => {
  const session = await auth();
  const ids = params.room.split("-").filter((v) => v !== session?.user?.email);
  if (!ids[0]) {
    return null;
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });

  return (
    <main className={style.main}>
      <UserInfo id={ids[0]} />
    </main>
  );
};

export default ChatRoom;
