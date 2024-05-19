export async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return res.json();
}
