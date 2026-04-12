export async function searchRepositories(query: string) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const linkHeader = response.headers.get("link");
    const data = await response.json();
    return { data: data, headers: { link: linkHeader } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
