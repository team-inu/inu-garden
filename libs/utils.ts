import { type ClassValue, clsx } from "clsx";
import { parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import JSONBigInt from "json-bigint";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ISO_DATE_FORMAT =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

export const isIsoDateString = (value: unknown): value is string => {
  return typeof value === "string" && ISO_DATE_FORMAT.test(value);
};

export const JSONBigIntParser = JSONBigInt({ useNativeBigInt: true });

export const deserializeDate = (data: unknown) => {
  if (data === null || data === undefined || typeof data !== "object")
    return data;
  if (isIsoDateString(data)) return parseISO(data);

  for (const [key, value] of Object.entries(data)) {
    if (isIsoDateString(value)) {
      // @ts-expect-error
      data[key] = parseISO(value);
    } else if (typeof value === "object") {
      deserializeDate(value);
    }
  }
  return data;
};
