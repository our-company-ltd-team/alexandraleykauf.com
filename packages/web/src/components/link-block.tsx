"use client";

import type { Link } from "@/lib/graphql/generated/graphql";

export default function LinkBlock({ data }: { data: Link }) {
  // function getLink() {
  //   switch (data.linkType) {
  //     case "email":
  //       return `mailto:${data.email}`;
  //     case "url":
  //       return data.url || "#";
  //     case "file":
  //       return data.file?.asset._ref || "#";
  //     default:
  //       return "#";
  //   }
  // }

  return (
    <li className="list-item Kontakt" data-visible="true">
      <div className="list-item-header">
        {/* <NextLink target="_blank" href={getLink()} className="list-item-link"></NextLink> */}
        <div className="list-item-center">
          {data.title}
        </div>
        <div className="list-item-left">
          <span className="at">@</span>
        </div>
        <div className="media-phone-hidden media-small-hidden list-item-right">

        </div>
      </div>
    </li>
  );
}
