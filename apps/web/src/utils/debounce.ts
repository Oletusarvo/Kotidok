export function debounce<Fn extends Function>(fn: Fn, timeout: number) {
  let t: number | null = null;

  return <ArgsT extends any[]>(...args: ArgsT) => {
    if (t) {
      clearTimeout(t);
    }

    t = setTimeout(async () => {
      await fn(...args);
    }, timeout);
  };
}
