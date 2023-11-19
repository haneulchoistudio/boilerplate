import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryStaticImage = {
  public_id: string;
  format: string;
  src: string;
};

export async function getCloudinaryStaticImages() {
  const results = await cloudinary.search.expression().execute();
  const resources = results.resources;
  const staticImages = resources.map(
    (src: any) =>
      ({
        public_id: src.public_id,
        format: src.format,
        src: [src.public_id, src.format].join("."),
      } as CloudinaryStaticImage)
  ) as CloudinaryStaticImage[];

  return staticImages;
}
