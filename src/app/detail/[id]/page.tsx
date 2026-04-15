"use client";

import Header from "@/src/components/header";
import { useDetail } from "@/src/hooks/useDetail";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function Detail() {
  const params = useParams();
  const id = params.id as string;
  const { repository } = useDetail(id);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-24 px-24 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full row mb-8">
          <Image
            src={repository?.avatarUrl}
            alt={repository?.name}
            width={96}
            height={96}
            className="rounded-full object-cover mr-4"
          />
          <div>
            <p className="text-lg font-semibold mb-8">{repository?.name}</p>
            <p className="text-lg font-semibold">{repository?.language}</p>
          </div>
        </div>
        <div className="flex w-full row mb-4">
          <div className="flex-1 flex-col text-center">
            <p className="text-lg font-semibold">Star数</p>
            <p className="text-lg font-semibold">
              {repository?.stargazersCount ?? 0}
            </p>
          </div>
          <div className="flex-1 flex-col text-center">
            <p className="text-lg font-semibold">Watchers数</p>
            <p className="text-lg font-semibold">
              {repository?.watchersCount ?? 0}
            </p>
          </div>
          <div className="flex-1 flex-col text-center">
            <p className="text-lg font-semibold">Forks数</p>
            <p className="text-lg font-semibold">
              {repository?.forksCount ?? 0}
            </p>
          </div>
          <div className="flex-1 flex-col text-center">
            <p className="text-lg font-semibold">Issues数</p>
            <p className="text-lg font-semibold">
              {repository?.openIssuesCount ?? 0}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
