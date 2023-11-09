import { createImageCid, createResourceLink, send } from "@/apis/server";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  id: string;
};

type BodyContent = {
  sender: string;
  subject: string;
  text: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== "POST") {
    res.status(500).end();
    return;
  }
  if (!req.body) {
    res.status(404).end();
    return;
  }

  /** body content received from the client */
  const content = req.body as BodyContent;
  /** application origin where request was sent */
  const origin = req.headers.origin || "";
  /** create resource link (*in case need to invite the user from email to the application) */
  const resourceLink = createResourceLink(origin, "a", "b");
  /** create image's unique cid (*in case need to attach an image file) */
  const imageCid = createImageCid({
    color: "red",
    date: new Date().toLocaleDateString(),
    source: origin,
  });

  try {
    const attachmentFilename = "";
    const attachmentFilepath = "";
    const id = await send({
      from: '"Potluck Party" <invite@potluckparty.com>',
      to: content.sender,
      subject: content.subject,
      text: content.text,
      html: `<div>
            <img src="cid:${imageCid}" alt="Application Placeholder Email Image" />
      </div>`,
      attachments: [
        {
          filename: attachmentFilename,
          path: attachmentFilepath,
          cid: imageCid,
        },
      ],
    });
    res.status(200).json({ id });
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log("❌ Fail > \n\tThere was an error while sending email.");
      console.error(`\t${error.message}`);
      res.status(500).end();
      return;
    }
  }
}

export default handler;
