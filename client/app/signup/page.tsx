"use client"; //kalau pengen interaktif, harus pake client component. tapi kalo dk perlu interaktif trus cuma pengen fetch data pas restart bae, pake server component
import { FormEvent } from "react";
import axios from "axios";

type ApiResponse = {
  errors: Array<{
    message: string;
    field?: string;
  }>;
};

export default function Signup() {
  interface SignupFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as SignupFormElements;

    const response = await axios.post<ApiResponse>("/api/users/signup", {
      email: elements.email.value,
      password: elements.password.value,
    });

    response.data.errors.forEach((error) => {
      console.log(error.message);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Signup to indiestage</h1>
        <div className="border border-black">
          <label>Email: </label>
          <input name="email" type="email" />
        </div>
        <div className="border border-black">
          <label>Password: </label>
          <input name="password" type="password" />
        </div>
        <div className="border border-black">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}
