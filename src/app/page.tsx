"use client";

import Link from "next/link";
import Header from "../components/header";
import { useSearchRepositories } from "../hooks/useSearchRepositories";

export default function Home() {
  const { query, setQuery, repositories, loading, error, links, handleSearch } =
    useSearchRepositories();
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center
    bg-zinc-50 font-sans dark:bg-black"
    >
      <Header />
      <main
        className="flex flex-1 w-full max-w-3xl flex-col items-center
      py-16 px-16 bg-white dark:bg-black sm:items-start"
      >
        <div className="flex w-full row mb-4">
          <input
            type="text"
            className="flex-grow border rounded-md p-2 mx-8"
            placeholder="リポジトリ名を入力してください"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 border rounded-md px-8 mr-8"
            onClick={handleSearch}
          >
            検索
          </button>
        </div>
        {loading && <p>検索中...</p>}
        {error && <p>エラーが発生しました</p>}
        {repositories &&
          repositories.items.map((item) => (
            <div
              className="flex w-full border rounded-md p-2 m-2"
              key={item.id}
            >
              <Link
                href="detail"
                className="flex w-full row items-center"
                key={item.id}
              >
                <img
                  src={item.owner.avatar_url}
                  className="w-24 h-24 rounded-full object-cover mr-4"
                ></img>
                <p className="text-lg font-semibold">{item.name}</p>
              </Link>
            </div>
          ))}
      </main>
    </div>
  );
}
