/**
 * Convert a time task string to an object with seconds, minutes, hours and days as properties.
 *
 * @param time The time task string, for example "1w1d2h3m4s".
 * @returns An object with seconds, minutes, hours and days as properties.
 */
export function fnConvertTimeTaskToObject(time?: string): {
  w?: number;
  d?: number;
  h?: number;
  m?: number;
  s?: number;
} {
  // Regular expression to match a number and a unit (w, d, h, m or s).
  const regex = /(\d+)([wdhms])/g;
  const valores: {
    w?: number;
    d?: number;
    h?: number;
    m?: number;
    s?: number;
  } = {};

  let match: RegExpExecArray | null;

  if (!time) return valores;

  // Loop through all matches of the regular expression in the time task
  // string.
  while ((match = regex.exec(time)) !== null) {
    // Get the value and unit from the match.
    const valor = parseInt(match[1], 10);
    const unidad = match[2] as 'w' | 'd' | 'h' | 'm' | 's';

    // Add the value to the corresponding property in the result object.
    valores[unidad] = valor;
  }

  return valores;
}

/**
 * Convert a time task string to a number of minutes.
 *
 * @param timeTaskString The time task string, for example "2w1d2h3m4s".
 * @returns The number of minutes.
 */
export function fnConvertTimeTaskToStringNumber(timeTaskString: string): number {
  // Convert the time task string to an object with seconds, minutes, hours and days as properties.
  var values = fnConvertTimeTaskToObject(timeTaskString)

  // Total time in minutes.
  var time = 0

  // Convert weeks to minutes.
  if (values.w) {
    time += values.w * 7 * 24 * 60
  }
  // Convert days to minutes.
  if (values.d) {
    time += values.d * 24 * 60
  }
  // Convert hours to minutes.
  if (values.h) {
    time += values.h * 60
  }
  // Sum minutes.
  if (values.m) {
    time += values.m
  }

  return time
}

/**
 * Convert a number of minutes to a time task string.
 *
 * @param timeNumber The number of minutes.
 * @returns The time task string, for example "2w1d2h3m4s".
 */
export function fnConvertTimeTaskNumberToString(timeNumber: number): string {
  // Calculate weeks, days, hours and minutes.
  const semanas = Math.floor(timeNumber / (7 * 24 * 60))
  const dias = Math.floor((timeNumber % (7 * 24 * 60)) / (24 * 60))
  const horas = Math.floor((timeNumber % (24 * 60)) / 60)
  const minutos = timeNumber % 60

  // Initialize the time string with the weeks.
  let timeString = ''
  if (semanas > 0) {
    timeString += semanas + 'w '
  }

  // Add the days.
  if (dias > 0) {
    timeString += dias + 'd '
  }

  // Add the hours.
  if (horas > 0) {
    timeString += horas + 'h '
  }

  // Add the minutes.
  if (minutos > 0) {
    timeString += minutos + 'm'
  }

  return timeString.trim()
}
