export function fnClassNames(...classes: (undefined | null | string | Record<string, boolean>)[]) {
  const classList: string[] = [];

  classes.forEach((item) => {
    if (!item) {
      return;
    }

    if (typeof item === 'string') {
      classList.push(item);
    } else if (typeof item === 'object') {
      Object.keys(item).forEach((key) => {
        if (item[key]) {
          classList.push(key);
        }
      });
    }
  });

  return classList.join(' ');
}