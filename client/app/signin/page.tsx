"use client";
import { useState, FormEvent } from "react";

import useFormSubmit, { ErrorDetails } from "@/app/lib/use-form-submit";
import AuthForm from "@/app/components/auth-form";
import { useRouter } from "next/navigation"; //hook router khusus dari nextjs lgsg ngatur api call ke server, bukan react-router-dom yg ck pindah2 url doang

type SigninApiResponseBody = {
  id: string;
  email: string;
};

interface SigninFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function Signin() {
  const [errors, setErrors] = useState<ErrorDetails>([]);

  const [successMessage, setSuccessMessage] = useState<string>("");

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as SigninFormElements;

    try {
      await useFormSubmit<{ email: string; password: string }, SigninApiResponseBody>(
        "/api/users/signin",
        "post",
        {
          email: elements.email.value,
          password: elements.password.value,
        },
        { email: setEmailError, password: setPasswordError },
        setErrors,
        setIsSubmitDisabled
      );

      setSuccessMessage("Successfully signed in");

      router.refresh(); //refresh biar data currentUser di header component ke update karena refetch data ke server
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="h3">Sign In</h3>
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
