import { twMerge } from "tailwind-merge";

interface ProfileImageProps {
  canHoverOn: boolean;
  image?: string;
  classNames?: {
    image?: string;
    picture?: string;
    pictureHover?: string;
  };
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  canHoverOn = false,
  image = "/defualt-no-image.png",
  classNames = {
    image: "w-full h-full",
    picture:
      "block w-[37.5px] h-[37.5px] rounded-full overflow-hidden border transition-all duration-[0.35s] ease-in-out cursor-pointer",
    pictureHover: "ring",
  },
}) => {
  return (
    <picture
      className={twMerge(
        classNames.picture,
        canHoverOn ? classNames.pictureHover : ""
      )}
    >
      <img
        src={image}
        alt="Profile Image"
        referrerPolicy="no-referrer"
        className={twMerge(classNames.image)}
      />
    </picture>
  );
};

export default ProfileImage;
