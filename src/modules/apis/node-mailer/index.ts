import dotenv from "dotenv";
import nodeMailer, { type SendMailOptions } from "nodemailer";

dotenv.config();

const user = process.env.NEXT_PUBLIC_NODEMAILER_USER || "";
const pass = process.env.NEXT_PUBLIC_NODEMAILER_PASS || "";

function transport() {
  return nodeMailer.createTransport({ service: "gmail", auth: { user, pass } });
}
export function sendMail(
  option: SendMailOptions,
  onError: (error?: Error) => void
) {
  const t = transport();

  t.sendMail(option, (err, _info) => {
    onError(err || new Error("Mail Error"));
  });
}
