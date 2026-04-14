import { useState } from "react";
import { SearchRepositoriesResDtoApi } from "../types/SearchRepositoriesResDtoApi";
import { searchRepositories } from "../api/searchApi";
import { useRepositoriesStore } from "../types/RepositoriesStore";
import { RepositoriesDetailItemDto } from "../types/RepositoriesDetailItemDto";

export function useSearchRepositories() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const { repositories, meta, setSearchResult } = useRepositoriesStore();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(false);
    try {
      const response = await searchRepositories(query, page, perPage);
      setSearchResult({
        repositories: response.data.items.map(convertItem),
        meta: {
          query: query,
          totalCount: response.data.total_count,
          incompleteResults: response.data.incomplete_results,
          firstPage: response.headers.link?.includes('rel="first"')
            ? response.headers.link.match(/<(.*)>; rel=\"first\"/)![1]
            : "",
          lastPage: response.headers.link?.includes('rel="last"')
            ? response.headers.link.match(/<(.*)>; rel=\"last\"/)![1]
            : "",
          prevPage: response.headers.link?.includes('rel="prev"')
            ? response.headers.link.match(/<(.*)>; rel=\"prev\"/)![1]
            : "",
          nextPage: response.headers.link?.includes('rel="next"')
            ? response.headers.link.match(/<(.*)>; rel=\"next\"/)![1]
            : "",
          page: page,
          perPage: perPage,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(true);
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const convertItem = (
    item: SearchRepositoriesResDtoApi["items"][number],
  ): RepositoriesDetailItemDto => {
    return {
      id: item.id,
      name: item.name,
      avatarUrl: item.owner.avatar_url,
      language: item.language,
      stargazersCount: item.stargazers_count,
      watchersCount: item.watchers_count,
      forksCount: item.forks_count,
      issuesCount: item.issues_count,
    };
  };

  return {
    query,
    setQuery,
    repositories,
    loading,
    error,
    meta,
    handleSearch,
  };
}
