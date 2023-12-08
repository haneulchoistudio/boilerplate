function yyyyMMdd(d: Date) {
  const isoString = d.toISOString();
  const isoDate = new Date(isoString);

  const date = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(isoDate);
  const [MM, dd, yyyy] = date.split("/");
  const str = [yyyy, MM, dd].join("-");
  return str;
}

export { yyyyMMdd };

function getTimezone() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export { getTimezone };

function hhmm(d: Date) {
  return __hhmm(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: getTimezone(),
    }).format(new Date())
  );
}

function __hhmm(t: string) {
  const [hhmm, time] = t.split(" ");
  const [hh, mm] = hhmm.split(":");
  let hhN = Number(hh);

  if (["PM", "pm"].includes(time)) {
    hhN += 12;
  }
  const str = [hhN, mm].join(":");
  return str;
}

export { hhmm };
