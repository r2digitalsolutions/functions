/**
 * 
var tiempo1 = "1d 8m";
var tiempo2 = "2d 4h 20m";
var tiempo3 = "1h 10m";
var tiempo4 = "1s 5d 3h 11m";
var tiempo5 = "20m";
 * @param tiempo 
 * @returns 
 */
export function fnValidateTaskTime(time: string): boolean {
  var regex =
    /^(?:(?:(\d+)s\s*)?(?:(\d+)d\s*)?(?:(\d+)h\s*)?(?:(\d+)m\s*)?)(?!(.*\b(\d+s|d|h|m)\b.*){2})$/
  return regex.test(time)
}