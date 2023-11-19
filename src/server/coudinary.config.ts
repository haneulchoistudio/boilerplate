import { v2 as cloudinary } from "cloudinary";
import { abc } from "./dotenv.config";

cloudinary.config({
  cloud_name: abc("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  api_key: abc("CLOUDINARY_API_KEY"),
  api_secret: abc("CLOUDINARY_API_SECRET"),
});

export type CloudinaryImage = {
  public_id: string;
  format: string;
  src: string;
};

export async function getCloudinaryImages() {
  const results = await cloudinary.search.expression().execute();
  const resources = results.resources;
  const cloudinaryImages = resources.map(
    (src: any) =>
      ({
        public_id: src.public_id,
        format: src.format,
        src: [src.public_id, src.format].join("."),
      } as CloudinaryImage)
  ) as CloudinaryImage[];

  return cloudinaryImages;
}
