import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function convertCookiesToString(cookies: RequestCookie[]) {
  let cookiesString = "";
  for (let i = 0; i < cookies.length; i++) {
    cookiesString += cookies[i]["name"] + "=" + cookies[i]["value"] + ";";
  }
  return cookiesString;
}
