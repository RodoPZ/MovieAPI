export async function api(section: string, args: string = "") {
  const response = await fetch(
    `/.netlify/functions/fetch-movies?section=${section}&args=${args}`
  );
  const data = await response.json();
  return data.data;
}
