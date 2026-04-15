import { renderHook, act } from "@testing-library/react";
import { useSearchRepositories } from "./useSearchRepositories";
import { SearchRepositoriesResDtoApi } from "../types/SearchRepositoriesResDtoApi";
import { useRepositoriesStore } from "../types/RepositoriesStore";
import { RepositoriesDetailItemDto } from "../types/RepositoriesDetailItemDto";

describe("useSearchRepositories", () => {
  test("検索するとデータが更新される", async () => {
    const { result } = renderHook(() => useSearchRepositories());

    const mockResponse: SearchRepositoriesResDtoApi = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          name: "repo1",
          owner: { avatar_url: "avatar", id: 1 },
          language: "TypeScript",
          stargazers_count: 10,
          watchers_count: 20,
          forks_count: 30,
          open_issues_count: 40,
        },
      ],
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
      headers: {
        get: () => '<xxx?page=2>; rel="next", <xxx?page=34>; rel="last"',
      },
    });
    await act(async () => {
      result.current.setQuery("test");
    });
    await act(async () => {
      await result.current.handleSearch();
    });

    const state = useRepositoriesStore.getState();
    expect(state.repositories["1"]).toMatchObject({
      id: 1,
      name: "repo1",
      avatarUrl: "avatar",
      language: "TypeScript",
      stargazersCount: 10,
      watchersCount: 20,
      forksCount: 30,
      openIssuesCount: 40,
    });
    expect(state.meta).toMatchObject({
      query: "test",
      totalCount: 1,
      incompleteResults: false,
      firstPage: "",
      lastPage: "34",
      prevPage: "",
      nextPage: "2",
      page: 1,
      perPage: 30,
    });
  });
  test("検索時エラー発生", async () => {
    const { result } = renderHook(() => useSearchRepositories());

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
    });
    await act(async () => {
      result.current.setQuery("test");
    });
    await act(async () => {
      await result.current.handleSearch();
    });

    const state = useRepositoriesStore.getState();
    expect(state.repositories).toMatchObject({});
    expect(result.current.error).toBe(true);
  });
});

describe("handlePageChange", () => {
  test("ページを変更するとデータが更新される", async () => {
    const { result } = renderHook(() => useSearchRepositories());

    await act(async () => {
      await result.current.handlePageChange("2");
    });
    expect(result.current.page).toBe(2);
  });
  test("空文字の場合処理されない", async () => {
    const { result } = renderHook(() => useSearchRepositories());

    await act(async () => {
      result.current.setPage(10);
    });
    await act(async () => {
      await result.current.handlePageChange("");
    });
    expect(result.current.page).toBe(10);
  });
});

describe("getPageFromLink", () => {
  test("ページ番号を取得できる", async () => {
    const { result } = renderHook(() => useSearchRepositories());
    let page: string | null = null;
    await act(async () => {
      page = result.current.getPageFromLink(
        '<xxx?page=2>; rel="next", <xxx?page=34>; rel="last"',
        "next",
      );
    });
    expect(page).toBe("2");
  });
  test("nullの場合処理されない", async () => {
    const { result } = renderHook(() => useSearchRepositories());
    let page: string | null = "null";
    await act(async () => {
      page = result.current.getPageFromLink(null, "next");
    });
    expect(page).toBe(null);
  });
  test("空文字の場合処理されない", async () => {
    const { result } = renderHook(() => useSearchRepositories());
    let page: string | null = "null";
    await act(async () => {
      page = result.current.getPageFromLink("", "next");
    });
    expect(page).toBe(null);
  });
  test("検索条件が存在しなかった場合", async () => {
    const { result } = renderHook(() => useSearchRepositories());
    let page: string | null = "null";
    await act(async () => {
      page = result.current.getPageFromLink(
        '<xxx?page=1>; rel="first", <xxx?page=2>; rel="prev"',
        "next",
      );
    });
    expect(page).toBe(null);
  });
});

describe("convertItem", () => {
  test("ページを変更するとデータが更新される", async () => {
    const { result } = renderHook(() => useSearchRepositories());

    let item: RepositoriesDetailItemDto | null = null;
    await act(async () => {
      item = result.current.convertItem({
        id: 1,
        name: "repo1",
        owner: { avatar_url: "avatar", id: 1 },
        language: "TypeScript",
        stargazers_count: 10,
        watchers_count: 20,
        forks_count: 30,
        open_issues_count: 40,
      });
    });
    expect(item).toStrictEqual({
      id: 1,
      name: "repo1",
      avatarUrl: "avatar",
      language: "TypeScript",
      stargazersCount: 10,
      watchersCount: 20,
      forksCount: 30,
      openIssuesCount: 40,
    });
  });
});
