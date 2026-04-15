import { SearchRepositoriesResDtoApi } from "../types/SearchRepositoriesResDtoApi";

export async function searchRepositories(
  query: string,
  page: number,
  perPage: number,
) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
    );
    if (!response.ok) {
      if (response.status === 422) {
        throw new Error("Invalid request");
      }
      if (response.status === 503) {
        throw new Error("Service unavailable");
      }
      throw new Error(`HTTP error: ${response.status}`);
    }
    const linkHeader = response.headers.get("link");
    const data: SearchRepositoriesResDtoApi = await response.json();
    return { data: data, headers: { link: linkHeader } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
