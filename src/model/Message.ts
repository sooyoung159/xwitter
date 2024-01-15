import { User } from "@/model/User";

export interface Message {
  room: string;
  content: string;
  createdAt: Date;
}
