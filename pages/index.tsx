import { useEffect, useState } from "react";
import { getTimezone, hhmm, yyyyMMdd } from "~/apis/client";
import { Toggler } from "~/components/buttons";
import { FormWithSections } from "~/components/forms";
import { ChooseDate, ChooseTime, Select, Write } from "~/components/inputs";
import { Route } from "~/components/links";
import { Container } from "~/components/screens";

export default function Home() {
  const [v1, sv1] = useState<string>("");
  const [v2, sv2] = useState<"hello" | "bye">("hello");

  const [validating, setValidating] = useState<boolean>(false);

  const [selected, setSelected] = useState<"apple" | "pear" | "berries">(
    "apple"
  );

  const [date, setDate] = useState<string>(yyyyMMdd(new Date()));
  const [time, setTime] = useState<string>(hhmm(new Date()));

  return (
    <Container
      TITLE="Create Form"
      coverScreen
      hasWrapper
      classNames={{ screen: "flex flex-col justify-center items-center" }}
    >
      <FormWithSections
        classNames={{
          form: "w-full max-w-[500px] mx-auto flex flex-col gap-y-4",
          section: "px-8",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        sections={[
          <Write
            key={1}
            html="textarea"
            value={v1}
            chars={{ min: 4, max: 10 }}
            onChange={(e) => sv1(e.target.value)}
            validateNow={validating}
            label="Description"
            placeholder="Write some text..."
            classNames={{
              input: "rounded px-4 py-3",
              label: "font-medium text-lg mb-2.5 block",
              error: "text-red-500 text-sm mt-0.5",
            }}
            errors={{
              emptyChar: "아무것도 없습니다.",
              overChar: "너무 길어요...ㅎㄷㄷ",
              underChar: "너무 짧네요...",
            }}
          />,
          <Select
            key={2}
            items={["apple", "berries", "pear"]}
            selected={selected}
            onSelect={(item) => setSelected(item)}
            onSelectCreateText={(item) => `You have selected ${item}.`}
            classNames={{
              list: "w-full grid grid-cols-1 md:grid-cols-3",
              item: "capitalize px-5 py-2.5 rounded-md lg:hover:bg-neutral-100",
              selected:
                "capitalize px-5 py-2.5 rounded-md bg-neutral-900 text-white",
              text: "mt-1 text-sm text-neutral-600",
            }}
          />,
          <ChooseDate
            key={3}
            date={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            label="Choose your date"
            classNames={{
              input: "rounded px-4 py-3",
              label: "font-medium text-lg mb-2.5 block",
            }}
          />,

          <ChooseTime
            key={4}
            time={time}
            onChange={(e) => {
              console.log(e.target.value);
              setTime(e.target.value);
            }}
            label="Choose your date"
            classNames={{
              input: "rounded px-4 py-3",
              label: "font-medium text-lg mb-2.5 block",
            }}
          />,
        ]}
      />

      <Toggler
        classNames={{
          button:
            "rounded-full w-[40px] h-[40px] flex justify-center items-center border bg-red-500 text-white lg:hover:bg-red-400",
          modal:
            "px-3 py-2 rounded shdaow-2xl bg-white absolute top-12 z-10 border",
        }}
        childrens={{
          button: <>Toggle</>,
          modal: (
            <ul className="flex flex-col gap-y-2.5">
              <Route href="/about" className="lg:hover:opacity-60">
                About
              </Route>
            </ul>
          ),
        }}
      />
    </Container>
  );
}
