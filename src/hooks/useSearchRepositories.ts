import { useEffect, useState } from "react";
import { SearchRepositoriesResDtoApi } from "../types/SearchRepositoriesResDtoApi";
import { searchRepositories } from "../api/searchApi";
import { useRepositoriesStore } from "../types/RepositoriesStore";
import { RepositoriesDetailItemDto } from "../types/RepositoriesDetailItemDto";

export function useSearchRepositories() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const { repositories, meta, setSearchResult } = useRepositoriesStore();

  /**
   * 検索処理
   */
  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setError(false);
    try {
      const response = await searchRepositories(query, page, perPage);
      setSearchResult({
        repositories: response.data.items.map(convertItem),
        meta: {
          query: query,
          totalCount: response.data.total_count,
          incompleteResults: response.data.incomplete_results,
          firstPage: getPageFromLink(response.headers.link, "first") ?? "",
          lastPage: getPageFromLink(response.headers.link, "last") ?? "",
          prevPage: getPageFromLink(response.headers.link, "prev") ?? "",
          nextPage: getPageFromLink(response.headers.link, "next") ?? "",
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
      setIsLoading(false);
    }
  };

  /**
   * ページ変更処理
   * @param url URL
   */
  const handlePageChange = async (page: string) => {
    if (!page) return;
    const pageNumber = Number(page);
    setPage(pageNumber);
  };

  /**
   * ページ変更で検索処理が発火する
   */
  useEffect(() => {
    handleSearch();
  }, [page]);

  /**
   * リンクヘッダーからページ番号を取得する
   * @param link リンクヘッダー
   * @param rel リレーション
   * @returns ページ番号
   */
  const getPageFromLink = (link: string | null, rel: string) => {
    if (!link) return null;

    const match = link.match(new RegExp(`<([^>]+)>; rel="${rel}"`));
    if (!match) return null;

    const url = new URL(match[1], "https://api.github.com/search/repositories");

    return url.searchParams.get("page");
  };

  /**
   * 取得結果をDTOに変換する
   * @param item 取得結果
   * @returns DTO
   */
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
      openIssuesCount: item.open_issues_count,
    };
  };

  return {
    query,
    setQuery,
    repositories,
    isLoading,
    error,
    meta,
    page,
    setPage,
    perPage,
    setPerPage,
    handleSearch,
    handlePageChange,
    getPageFromLink,
    convertItem,
  };
}
