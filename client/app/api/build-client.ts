//folder api folder spesial, idk dijadiin route "https://nextjs.org/docs/app/building-your-application/routing#colocation"
import axios from "axios";
import { cookies } from "next/headers";

import convertCookiesToString from "@/util/convert-cookies-to-string";

//fungsi utk fetch data di server side
export default function buildClient() {
  //ini ngambil cookies yg dikirim dari request browser utk minta halaman page, trus kito ambil trs kito kasi ke axios. jadi only one fetch before rendering setelah di fetch baru render baru kirim
  const allCookies = cookies().getAll();

  //instance axios
  const api =
    //ngasih request ke service ingress-nginx. service ingress ny ada di namespace berbeda dari app client ini (namespace kubernetes samo cak namespace c++ tapi ngbagi bagi object, jadi yg biso ngasih request caro mudah yg ini "http://{serviceName}" itu cuma yang satu namespace).
    //yang tidak satu namespace harus seperti ini "http://{serviceName}.{namespaceName}.svc.cluster.local"
    axios.create({
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", //dk bs cuma ngasih path bae, domainny perlu diisi jg, soalny dk ado sistem yg auto tau domainny apo kayak browser. karena ini dijalankan di server
      headers: {
        Host: "indiestage.com", //ini set header host manual, biar biso diliat ingress-nginx ny trs dikasih route yg bener. soalny nginx biso beda bedain response sesuai dgn domain yg berbeda. di set manual karena kita tidak di browser
        Cookie: convertCookiesToString(allCookies), //ini set cookie manual, biar biso diliat ingress-nginx ny trs dikasih route yg bener. soalny nginx biso beda bedain response sesuai dgn domain yg berbeda. di set manual karena kita tidak di browser
      },
    });

  return api;
}
