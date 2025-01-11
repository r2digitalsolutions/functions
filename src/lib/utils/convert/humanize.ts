export function fnHumanize(number: number) {
  const suffixes = ['', 'k', 'M', 'B', 'T', 'Qa'];
  const base = 1000;
  let exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  if (exponent < 0) exponent = 0;
  const divisor = Math.pow(base, exponent);
  const suffix = suffixes[exponent];
  const rounded = Math.round((number / divisor) * 100) / 100;
  const formatted =
    rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2);
  return `${formatted}${suffix}`;
}