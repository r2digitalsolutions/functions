export const fnFormatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

export const fnFormatDateTimeToSelect = (date: Date): `${number}-${string}-${string}T${string}:${string}` => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function fnMonthsForLocale(localeName = 'en-US', monthFormat: 'long' | 'short' | 'narrow' = 'long') {
  const format = new Intl
    .DateTimeFormat(localeName, { month: monthFormat }).format;
  return [...Array(12).keys()]
    .map((m) => format(new Date(Date.UTC(2021, (m + 0) % 12))));
}

export const secondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toFixed(0)
    .padStart(2, '0');
  const remainingSeconds = Math.floor(seconds % 60);
  const newSeconds = remainingSeconds.toFixed(0).padStart(2, '0');

  return `${minutes}:${newSeconds}`;
};