/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { str } from "~/apis/client";

interface WriteProps<
  T extends string,
  Element extends HTMLInputElement | HTMLTextAreaElement
> {
  html?: "input" | "textarea";
  chars?: {
    min: number;
    max: number;
  };
  rows?: number;

  value: T;
  onChange: (event: React.ChangeEvent<Element>) => void;
  label?: string;

  classNames?: {
    input?: string;
    label?: string;
    error?: string;
  };

  placeholder?: string;

  validateNow: boolean;

  errors?: {
    underChar: string;
    overChar: string;
    emptyChar: string;
  };
}

const Write: React.FC<
  WriteProps<string, HTMLInputElement | HTMLTextAreaElement>
> = ({
  html = "input",
  chars = { min: 0, max: 0 },
  rows = html === "input" ? 0 : 3,
  value,
  placeholder = "",
  onChange,
  label = "",
  classNames = { input: "", label: "", error: "" },
  validateNow = false,

  errors = {
    underChar: "This field value is too short.",
    overChar: "This field value exceeds the maximum character limit.",
    emptyChar: "This field cannot be empty.",
  },
}) => {
  const [error, setError] = useState<string>("");

  function validate() {
    const length = str(value);
    if (length.eq(0)) {
      setError(errors.emptyChar);
      return;
    }
    if (chars.min > 0) {
      // validate if the value length greater than or equal to `chars.min`
      if (length.geq(chars.min)) {
        // validated
      } else {
        // not validated
        setError(errors.underChar);
        return;
      }
    }
    if (chars.max > 0) {
      // validate if the value length less than or equal to `chars.max`
      if (length.leq(chars.max)) {
        // validated
      } else {
        // not validated
        setError(errors.overChar);
        return;
      }
    }

    return true;
  }

  useEffect(() => {
    if (validateNow) {
      validate();
    } else {
      setError("");
    }
  }, [validateNow]);

  return html === "input" || html === "textarea" ? (
    <div className="relative w-full">
      {label && (
        <label className={twMerge("", classNames.label)}>{label}</label>
      )}
      {html === "input" ? (
        <input
          autoFocus
          value={value}
          onChange={onChange}
          type="text"
          className={twMerge("w-full", classNames.input ?? "")}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          autoFocus
          rows={rows}
          value={value}
          onChange={onChange}
          className={twMerge("w-full", classNames.input ?? "")}
          placeholder={placeholder}
        />
      )}
      {error && <p className={twMerge("", classNames.error ?? "")}>{error}</p>}
    </div>
  ) : null;
};

export default Write;
