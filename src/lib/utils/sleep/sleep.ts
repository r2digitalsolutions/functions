export const fnSleep = <T = void>(timeout: number = 1000): Promise<T> =>
  new Promise<T>((resolve) => setTimeout(resolve, timeout));
