"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageList(props: { pages: { label: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <ul className="navbar-nav">
      {props.pages.map((page, index) => (
        <li key={index} className="nav-item">
          <Link
            className={"nav-link" + page.href === pathname ? " active" : ""}
            aria-current="page"
            href={page.href}
          >
            {page.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
