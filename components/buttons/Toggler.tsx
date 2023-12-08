import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  open: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps & React.PropsWithChildren> = ({
  open,
  children = null,
  className = "",
}) => {
  return (
    open &&
    children && <aside className={twMerge("", className)}>{children}</aside>
  );
};

interface ModalButtonProps {
  onToggle: () => void;
  className?: string;
}

const ModalButton: React.FC<ModalButtonProps & React.PropsWithChildren> = ({
  onToggle,
  children = null,
  className = "",
}) => {
  return (
    children && (
      <button
        type="button"
        onClick={onToggle}
        className={twMerge("", className)}
      >
        {children}
      </button>
    )
  );
};

interface TogglerProps {
  classNames?: {
    button?: string;
    modal?: string;
  };
  childrens?: {
    button?: React.ReactNode;
    modal?: React.ReactNode;
  };
}

const Toggler: React.FC<TogglerProps> = ({
  classNames = { button: "", modal: "" },
  childrens,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-center">
      {childrens?.button && (
        <ModalButton
          onToggle={() => setOpen(!open)}
          className={classNames.button}
        >
          {childrens.button}
        </ModalButton>
      )}
      {childrens?.modal && (
        <Modal open={open} className={classNames.modal}>
          {childrens.modal}
        </Modal>
      )}
    </div>
  );
};

export default Toggler;
