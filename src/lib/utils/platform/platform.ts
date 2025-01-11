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
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  return navigator.userAgent.toLowerCase().includes(platform.toLowerCase());
};


export const platform = {
  isMac,
  isWindows,
  isLinux,
};
