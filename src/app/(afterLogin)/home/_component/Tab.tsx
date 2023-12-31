"use client";

import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";

const Tab = () => {
  const { tab, setTab } = useContext(TabContext);
  const onClickFol = () => {
    setTab("fol");
  };

  const onClickRec = () => {
    setTab("rec");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div onClick={onClickRec}>
          추천
          <div className={style.tabIndicator} hidden={tab === "fol"}></div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div className={style.tabIndicator} hidden={tab === "rec"}></div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
