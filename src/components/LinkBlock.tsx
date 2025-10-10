"use client";
import Link from "next/link";
import {ProjectLink} from "@/types";

export default function LinkBlock({ data }: { data: ProjectLink }) {

    function getLink() {
        switch (data.linkType) {
            case "email":
                return `mailto:${data.email}`;
            case "url":
                return data.url || "#";
            case "file":
                return data.file?.asset._ref || "#";
            default:
                return "#";
        }
    }

    return (
        <li className="list-item Kontakt" data-visible="true">
            <div className="list-item-header">
                <Link target="_blank" href={getLink()} className="list-item-link"></Link>
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


