export function range(
  from: number,
  to: number,
  exclusive: boolean = true,
): number[] {
  const snd = (_: any, y: any) => y;

  const add = (x: number) => (y: number) => x + y;

  const included = exclusive ? 0 : 1;

  return Array.from(Array(to - from + included))
    .map(snd)
    .map(add(from));
}
