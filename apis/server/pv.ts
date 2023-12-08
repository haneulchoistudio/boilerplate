// Use this on nodejs runtime.

import dotenv from "dotenv";

class PVError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ABCError";
  }
}

/** Reads a value corresponding to the key from the local environmental file. */
function __pv__<ProtectedVariableKey extends string>(
  key: ProtectedVariableKey
) {
  dotenv.config();
  const value = process.env[key];
  return value
    ? value
    : (() => {
        throw new PVError(
          `Found out the value of your environment variable with key '${key}' is either empty "" or not added.`
        );
      })();
}

export { __pv__, PVError };
