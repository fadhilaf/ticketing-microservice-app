import { FormEvent, useId } from "react";

import { ErrorDetails } from "@/hook/use-form-submit";

type FieldDatas = {
  display: string;
  name: string;
  type: "text" | "email" | "password";
  error: string;
  required: boolean;
  readonly: boolean;
}[];

export default function AuthForm(props: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  fields: FieldDatas;
  errors: ErrorDetails;
  successMessage: string;
  isSubmitDisabled: boolean;
}) {
  return (
    <form onSubmit={props.onSubmit}>
      {props.fields.map((field, index) => {
        const fieldId = useId();
        return (
          <div key={index} className="mb-3">
            <label htmlFor={fieldId} className="form-label">
              {field.display}
            </label>
            {field.error ? (
              <>
                <input
                  type={field.type}
                  className="form-control is-invalid"
                  name={field.name}
                  id={fieldId}
                />
                <div id={fieldId} className="invalid-feedback">
                  {field.error}
                </div>
              </>
            ) : (
              <input type={field.type} className="form-control" name={field.name} id={fieldId} />
            )}
          </div>
        );
      })}

      <ul>
        {props.errors.map((error, index) => (
          <li>
            <div key={index} className="alert alert-danger" role="alert">
              {error.message}
            </div>
          </li>
        ))}
      </ul>

      {props.successMessage && (
        <div className="alert alert-primary" role="alert">
          {props.successMessage}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={props.isSubmitDisabled}>
        Sign Up
      </button>
    </form>
  );
}
