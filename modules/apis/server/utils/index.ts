import dotenv from "dotenv";

class EnvVarError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "EnvVarError";
  }
}

export function getEnv(key: string) {
  dotenv.config();
  const envVar = process.env[key];

  if (!envVar) {
    let message: string = `❌ Failed to get environmental variable > '${key}'.`;
    throw new EnvVarError(message);
  } else {
    let message: string = `✅ Successfully got environmental variable > '${key}'.`;
    console.log(message);
  }

  return envVar;
}
