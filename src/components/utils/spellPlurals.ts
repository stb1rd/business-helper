export const spellPlurals = (value: string | number, word1: string, word234: string, word5: string): string => {
  const integerValue = Number.parseInt(value as string, 10);
  const decimalDigit = Math.floor(integerValue / 10) % 10;
  const lastDigit = integerValue % 10;
  if (decimalDigit !== 1) {
    if (lastDigit === 1) {
      return word1;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return word234;
    }
  }

  return word5;
};
