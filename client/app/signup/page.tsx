"use client"; //kalau pengen interaktif, harus pake client component. tapi kalo dk perlu interaktif trus cuma pengen fetch data pas restart bae, pake server component
import { useState, FormEvent } from "react";

import useFormSubmit, { ErrorDetails } from "@/app/lib/use-form-submit";
import AuthForm from "@/app/components/auth-form";
import { useRouter } from "next/navigation"; //hook router khusus dari nextjs lgsg ngatur api call ke server, bukan react-router-dom yg ck pindah2 url doang

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

  const router = useRouter();

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

      router.refresh(); //refresh biar data currentUser di header component ke update karena refetch data ke server
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="h3">Sign Up</h3>
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
