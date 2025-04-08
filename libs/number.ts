export const parseNumber = (input: any, defaultValue: number): number => {
  const parsed = Number(input);
  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
};
