import { Suspense } from "react";
import { CloudImage } from "~/components/core";
import {
  type CloudinaryStaticImage,
  getCloudinaryStaticImages,
} from "~/server";

export default function Home({
  staticImages,
}: {
  staticImages: CloudinaryStaticImage[];
}) {
  return (
    <div className="h-screen p-20 flex flex-col gap-y-40">
      <div>
        <h3>Client</h3>
        <br />
        <Suspense
          fallback={<div className="p-5 border animate-pulse">Loading..</div>}
        >
          <CloudImage
            priority
            src={"examples/cld-sample-5.jpg"}
            alt={"Shoes"}
            classNames={{ image: "", picture: "max-w-[500px]" }}
            width={500}
            height={500}
          />
        </Suspense>
      </div>
      <div>
        <h3>Server</h3>
        <br />
        <ul className="flex flex-col gap-y-40">
          {staticImages.map((staticImage, idx) => (
            <Suspense
              key={idx}
              fallback={
                <div className="p-5 border animate-pulse">Loading..</div>
              }
            >
              <CloudImage
                priority
                src={staticImage.src}
                alt={staticImage.public_id}
                classNames={{ image: "", picture: "max-w-[500px]" }}
                width={500}
                height={500}
              />
            </Suspense>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const staticImages = await getCloudinaryStaticImages();

  return { props: { staticImages } };
};
