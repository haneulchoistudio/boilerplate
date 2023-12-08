import { twMerge } from "tailwind-merge";

interface FormWithSectionsProps {
  classNames?: {
    form?: string;
    section?: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  sections: React.ReactNode[];
}

const FormWithSections: React.FC<FormWithSectionsProps> = ({
  onSubmit,
  classNames = { form: "", section: "" },
  sections,
}) => {
  return (
    <form onSubmit={onSubmit} className={twMerge("", classNames.form)}>
      {sections.map((section, idx) => (
        <section key={idx} className={twMerge("", classNames.section)}>
          {section}
        </section>
      ))}
    </form>
  );
};

export default FormWithSections;
