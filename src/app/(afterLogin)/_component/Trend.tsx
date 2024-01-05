import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

interface Props {
  trend: Hashtag;
}

const Trend = ({ trend }: Props) => {
  return (
    <Link href={`/search?q=${trend.title}`} className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()}</div>
    </Link>
  );
};

export default Trend;
