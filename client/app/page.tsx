import axios from "axios";
import { cookies } from "next/headers";

type currentUserBodyResponse = {
  currentUser: CurrentUser | null;
};

type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};

//di next js componentny biso async, gk kyk react yg gk biso
export default async function Home() {
  //ini ngambil cookies yg dikirim dari request browser utk minta halaman page, trus kito ambil trs kito kasi ke axios. jadi only one fetch before rendering setelah di fetch baru render baru kirim
  const sessionCookie = cookies().get("session");

  let currentUser: CurrentUser | null;
  if (sessionCookie) {
    //next js nge fetch data ini di server side, bukan di browser
    currentUser =
      //ngasih request ke service ingress-nginx. service ingress ny ada di namespace berbeda dari app client ini (namespace kubernetes samo cak namespace c++ tapi ngbagi bagi object, jadi yg biso ngasih request caro mudah yg ini "http://{serviceName}" itu cuma yang satu namespace).
      //yang tidak satu namespace harus seperti ini "http://{serviceName}.{namespaceName}.svc.cluster.local"
      (
        await axios.get<currentUserBodyResponse>(
          "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", //dk bs cuma ngasih path bae, domainny perlu diisi jg, soalny dk ado sistem yg auto tau domainny apo kayak browser. karena ini dijalankan di server
          {
            headers: {
              Host: "indiestage.com", //ini set header host manual, biar biso diliat ingress-nginx ny trs dikasih route yg bener. soalny nginx biso beda bedain response sesuai dgn domain yg berbeda. di set manual karena kita tidak di browser
              Cookie: sessionCookie["name"] + "=" + sessionCookie["value"] + ";", //ini set cookie manual, biar biso diliat ingress-nginx ny trs dikasih route yg bener. soalny nginx biso beda bedain response sesuai dgn domain yg berbeda. di set manual karena kita tidak di browser
            },
          }
        )
      ).data.currentUser;
  } else {
    currentUser = null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {currentUser ? (
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">You are signed in</div>
          <div className="text-2xl font-bold">Email: {currentUser.email}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">not logged in</div>
      )}
    </main>
  );
}
