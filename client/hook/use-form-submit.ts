import axios, { AxiosResponse, AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

type ErrorApiResponseBody = {
  errors: ErrorDetails;
};

export type ErrorDetails = {
  message: string;
  field?: string;
}[];

export default async function useFormSubmit<TRequestBody, TSuccessResponse>(
  url: string,
  method: "post" | "put" | "patch",
  body: TRequestBody,
  fieldErrorSetStates: { [key in keyof TRequestBody]: Dispatch<string> },
  errorsSetState: Dispatch<SetStateAction<ErrorDetails>>,
  setIsSubmitDisabled: Dispatch<SetStateAction<boolean>>
): Promise<AxiosResponse<TRequestBody, any>> {
  // Reset all errors on each field
  Object.keys(fieldErrorSetStates).forEach((key) => {
    fieldErrorSetStates[key as keyof TRequestBody]("");
  });
  // Reset all errors
  errorsSetState([]);

  setIsSubmitDisabled(true);

  try {
    const res = await axios[method]<TRequestBody>(url, body);

    return res;
  } catch (err) {
    setIsSubmitDisabled(false);

    const error = err as AxiosError<ErrorApiResponseBody, any>;

    error.response?.data.errors.forEach((error) => {
      if (error.field && error.field in fieldErrorSetStates) {
        fieldErrorSetStates[error.field as keyof TRequestBody](error.message);
      } else {
        errorsSetState((prev) => [...prev, error]);
      }
    });

    throw new Error(error.message);
  }
}
