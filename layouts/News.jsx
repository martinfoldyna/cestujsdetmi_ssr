import React from "react";
import MyLink from "./MyLink";
import { useRouter } from "next/router";

const RSSNews = ({ news }) => {
  const router = useRouter();
  return (
    <MyLink href={`${router.pathname}/detail/${news.id}`}>
      <div className="post">
        <h3 className="post-heading">{news.name}</h3>
      </div>
    </MyLink>
  );
};

export default RSSNews;
