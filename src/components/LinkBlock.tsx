"use client";
import Link from "next/link";

export default function LinkBlock({ data }: { data: any }) {

    function getLink() {
        if (data.email) {
            return `mailto:${data.email}`;
        }
        if (data.url) {
            return data.url;
        }
        if (data.file) {
            return data.file.asset._ref;
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


