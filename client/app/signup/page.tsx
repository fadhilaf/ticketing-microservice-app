"use client"; //kalau pengen interaktif, harus pake client component. tapi kalo dk perlu interaktif trus cuma pengen fetch data pas restart bae, pake server component
import { useState, FormEvent } from "react";

import useFormSubmit, { ErrorDetails } from "@/hook/use-form-submit";

type SignupApiResponseBody = {
  id: string;
  email: string;
};

interface SignupFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function Signup() {
  const [errors, setErrors] = useState<ErrorDetails>([]);

  const [successMessage, setSuccessMessage] = useState<string>("");

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as SignupFormElements;

    try {
      await useFormSubmit<{ email: string; password: string }, SignupApiResponseBody>(
        "/api/users/signup",
        "post",
        {
          email: elements.email.value,
          password: elements.password.value,
        },
        { email: setEmailError, password: setPasswordError },
        setErrors,
        setIsButtonDisabled
      );

      setSuccessMessage("Successfully signed up");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          {emailError ? (
            <>
              <input type="email" className="form-control is-invalid" name="email" id="email" />
              <div id="email" className="invalid-feedback">
                {emailError}
              </div>
            </>
          ) : (
            <input type="email" className="form-control" name="email" id="email" />
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          {passwordError ? (
            <>
              <input type="password" className="form-control is-invalid" id="password" />
              <div id="password" className="invalid-feedback">
                {passwordError}
              </div>
            </>
          ) : (
            <input type="password" className="form-control" id="password" />
          )}
        </div>

        <ul>
          {errors.map((error, index) => (
            <li>
              <div key={index} className="alert alert-danger" role="alert">
                {error.message}
              </div>
            </li>
          ))}
        </ul>

        {successMessage && (
          <div className="alert alert-primary" role="alert">
            {successMessage}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={isButtonDisabled}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
