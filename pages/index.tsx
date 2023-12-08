import { useEffect, useState } from "react";
import { getTimezone, hhmm, yyyyMMdd } from "~/apis/client";
import { ChooseDate, ChooseTime, Select, Write } from "~/components/inputs";

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
    <div className="h-screen w-full flex flex-col justify-center items-center p-8 lg:p-16 max-w-[500px] mx-auto">
      <Write
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
      />
      <button
        onClick={() => setValidating(!validating)}
        className="border rounded p-2"
      >
        validate
      </button>

      <br />

      <Select
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
      />

      <br />

      <ChooseDate
        date={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        label="Choose your date"
        classNames={{
          input: "rounded px-4 py-3",
          label: "font-medium text-lg mb-2.5 block",
        }}
      />

      <br />

      <ChooseTime
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
      />
    </div>
  );
}
