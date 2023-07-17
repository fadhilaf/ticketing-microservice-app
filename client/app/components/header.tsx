import Link from "next/link";

import buildClient from "@/app/api/build-client";
import PageList from "./page-list";

export type currentUserBodyResponse = {
  currentUser: CurrentUser | null;
};

export type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};
const pages: { label: string; href: string }[] = [
  {
    label: "Home",
    href: "/",
  },
];

//di next js componentny biso async, gk kyk react yg gk biso
export default async function Header() {
  //helper function utk cek user login apa gk
  //next js nge fetch data ini di server side, bukan di browser
  const currentUser = (await buildClient().get<currentUserBodyResponse>("/api/users/currentuser"))
    .data.currentUser;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            IndieStage
          </Link>

          <PageList pages={pages} />

          <ul className="navbar-nav">
            {currentUser ? (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/signout">
                  Sign Out
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" href="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" href="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
