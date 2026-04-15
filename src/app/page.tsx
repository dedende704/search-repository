"use client";

import Link from "next/link";
import Header from "../components/header";
import { useSearchRepositories } from "../hooks/useSearchRepositories";
import Image from "next/image";
import Loading from "../components/loading";

export default function Home() {
  const {
    query,
    setQuery,
    repositories,
    isLoading,
    error,
    meta,
    page,
    perPage,
    setPerPage,
    handleSearch,
    handlePageChange,
  } = useSearchRepositories();
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center
    bg-zinc-50 font-sans dark:bg-black"
    >
      <Header />
      {isLoading && <Loading />}
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
        {error && <p className="text-red-500">エラーが発生しました</p>}
        <div className="flex w-full row mb-4 items-center">
          <div className="flex w-full row">
            <p>検索結果: {meta?.totalCount}件</p>
          </div>
          <div className="flex w-full row justify-center items-center">
            <p>表示件数：</p>
            <select
              id="perPage"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border rounded-md p-2"
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="flex w-full row justify-end">
            {Object.keys(repositories).length > 0 && (
              <div className="flex w-full row justify-end">
                {meta.firstPage && page > 1 && (
                  <button
                    className="flex-shrink-0 border px-2 mx-1"
                    onClick={() => handlePageChange(meta?.firstPage)}
                  >
                    {"<<"}
                  </button>
                )}
                {meta.prevPage && page > 1 && (
                  <button
                    className="flex-shrink-0 border px-2 mx-1"
                    onClick={() => handlePageChange(meta?.prevPage)}
                  >
                    {"<"}
                  </button>
                )}
                <p className="flex-shrink-0 px-2 mx-1">
                  {page + "/" + (meta.lastPage ? meta.lastPage : page)}
                </p>
                {meta.nextPage && page < Number(meta.lastPage) && (
                  <button
                    className="flex-shrink-0 border px-2 mx-1"
                    onClick={() => handlePageChange(meta?.nextPage)}
                  >
                    {">"}
                  </button>
                )}
                {meta.lastPage && page < Number(meta.lastPage) && (
                  <button
                    className="flex-shrink-0 border px-2 mx-1"
                    onClick={() => handlePageChange(meta?.lastPage)}
                  >
                    {">>"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {repositories &&
          Object.values(repositories).map((item) => (
            <div
              className="flex w-full border rounded-md p-2 m-2"
              key={item.id}
            >
              <Link
                href={`/detail/${item.id}`}
                className="flex w-full row items-center"
                key={item.id}
              >
                <Image
                  src={item?.avatarUrl}
                  alt={item?.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover mr-4"
                />
                <p className="text-lg font-semibold">{item.name}</p>
              </Link>
            </div>
          ))}
        {Object.keys(repositories).length > 0 && (
          <div className="flex w-full row justify-end">
            {meta.firstPage && page > 1 && (
              <button
                className="flex-shrink-0 border px-2 mx-1"
                onClick={() => handlePageChange(meta?.firstPage)}
              >
                {"<<"}
              </button>
            )}
            {meta.prevPage && page > 1 && (
              <button
                className="flex-shrink-0 border px-2 mx-1"
                onClick={() => handlePageChange(meta?.prevPage)}
              >
                {"<"}
              </button>
            )}
            <p className="flex-shrink-0 px-2 mx-1">
              {page + "/" + meta.lastPage}
            </p>
            {meta.nextPage && page < Number(meta.lastPage) && (
              <button
                className="flex-shrink-0 border px-2 mx-1"
                onClick={() => handlePageChange(meta?.nextPage)}
              >
                {">"}
              </button>
            )}
            {meta.lastPage && page < Number(meta.lastPage) && (
              <button
                className="flex-shrink-0 border px-2 mx-1"
                onClick={() => handlePageChange(meta?.lastPage)}
              >
                {">>"}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
