import { describe } from "node:test";
import { searchRepositories } from "./searchApi";

describe("searchRepositories", () => {
  test("正常に検索できる", async () => {
    const mockResponse = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          name: "repo1",
          owner: { avatar_url: "avatar" },
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
    const result = await searchRepositories("test", 1, 30);

    expect(result.data.items[0]).toMatchObject({
      id: 1,
      name: "repo1",
      owner: { avatar_url: "avatar" },
      language: "TypeScript",
      stargazers_count: 10,
      watchers_count: 20,
      forks_count: 30,
      open_issues_count: 40,
    });
    expect(result.data.total_count).toBe(1);
    expect(result.data.incomplete_results).toBe(false);
    expect(result.headers.link).toBe(
      '<xxx?page=2>; rel="next", <xxx?page=34>; rel="last"',
    );
  });

  test("422エラー時に例外を投げる", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 422,
    });

    await expect(searchRepositories("invalid", 1, 30)).rejects.toThrow(
      "Invalid request",
    );
  });
  test("503エラー時に例外を投げる", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
    });

    await expect(searchRepositories("test", 1, 30)).rejects.toThrow(
      "Service unavailable",
    );
  });
});
