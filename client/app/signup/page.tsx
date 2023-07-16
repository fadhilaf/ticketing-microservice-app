"use client"; //kalau pengen interaktif, harus pake client component. tapi kalo dk perlu interaktif trus cuma pengen fetch data pas restart bae, pake server component
import { useState, FormEvent } from "react";

import useFormSubmit, { ErrorDetails } from "@/hook/use-form-submit";
import AuthForm from "@/component/auth-form";

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

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

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
        setIsSubmitDisabled
      );

      setSuccessMessage("Successfully signed up");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AuthForm
        onSubmit={onSubmit}
        fields={[
          {
            display: "Email Address",
            name: "email",
            type: "email",
            error: emailError,
            required: true,
            readonly: false,
          },
          {
            display: "Password",
            name: "password",
            type: "password",
            error: passwordError,
            required: true,
            readonly: false,
          },
        ]}
        errors={errors}
        successMessage={successMessage}
        isSubmitDisabled={isSubmitDisabled}
      />
    </div>
  );
}
