"use client"; //artiny jadikan ini component client side (kalo komponen server side, tidak perlu ditulis apa-apa [server component adalah component yang di render di server (tidak bisa menggunakan state, mengecek on event, cuma utk nge fetch data besar dalam satu page load, atau static page that needed lot of javascript)])
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <h1>Signup to indiestage</h1>
        <div className="border border-black">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="border border-black">
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="border border-black">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}
