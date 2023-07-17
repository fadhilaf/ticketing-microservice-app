"use client";

import axios from "axios";
import { useRouter } from "next/navigation"; // "next/router" utk routing di server side, "next/navigation" utk routing di browser
import { useEffect } from "react";

export default function Signout() {
  const router = useRouter();

  useEffect(() => {
    //request sign out harus dari browser, krn buat hapus cookie yg disimpen di browser
    axios
      .post("/api/users/signout")
      .then(() => {
        router.refresh(); //refresh biar data currentUser di header component ke update karena refetch data ke server
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="flex flex-col items-center justify-center">Signing out..</div>;
}
