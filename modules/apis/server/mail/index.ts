import nodemailer, { SendMailOptions } from "nodemailer";
import { getEnv } from "../utils";

/** */

export function createResourceLink(origin: string, ...paths: string[]) {
  return [origin, ...paths].join("/");
}

export function createImageCid<ImageProperties extends object = {}>(
  option: ImageProperties
) {
  const keys = Object.keys(option);
  const values = Object.values(option);
  const cid = keys.map((_key, idx) => values[idx]).join("-");
  return cid;
}
/** */

export const __env__mailUser = getEnv("NODEMAILER_USER");
export const __env__mailPass = getEnv("NODEMAILER_PASS");
export const __env__mailService = getEnv("NODEMAILER_HOST");

export function transporter() {
  return nodemailer.createTransport({
    service: __env__mailService,
    secure: true,
    auth: {
      user: __env__mailUser,
      pass: __env__mailPass,
    },
  });
}

/**
 *
 * @param mailOption
 * @returns `id` that refers to mail sent.
 */
export async function send(mailOption: SendMailOptions) {
  const info = await transporter().sendMail(mailOption);

  __send_end_logger();

  return info.messageId;

  function __send_end_logger() {
    const accepted =
      info.accepted.length >= 1 ? `Accepted: ${info.accepted}` : "N/A";
    const rejected =
      info.rejected.length >= 1 ? `Rejected: ${info.rejected}` : "N/A";
    const response = info.response;
    const messageId = info.messageId;

    console.table([{ response }, { accepted }, { rejected }, { messageId }]);
    console.log(`✅📧 Mail sent to ${mailOption.to}`);
  }
}
