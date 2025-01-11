import { browser } from "$app/environment";

const isMac = (): boolean => {
  return isPlatform("mac");
};

const isWindows = (): boolean => {
  return isPlatform("win");
};

const isLinux = (): boolean => {
  return isPlatform("linux");
};

const isPlatform = (platform: string): boolean => {
  if (!browser) {
    return false;
  }
  return navigator.userAgent ? navigator.userAgent?.toLowerCase().includes(platform) : false;
};

export const platform = {
  isMac,
  isWindows,
  isLinux,
};
