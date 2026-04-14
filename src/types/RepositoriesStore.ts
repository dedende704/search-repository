import { create } from "zustand";
import { RepositoriesDetailItemDto } from "./RepositoriesDetailItemDto";
import { SearchRepositoriesResMetaDto } from "./SearchRepositoriesResMetaDto";

type RepositoriesStore = {
  repositories: Record<string, RepositoriesDetailItemDto>;
  meta: SearchRepositoriesResMetaDto;
  setSearchResult: (params: {
    meta: SearchRepositoriesResMetaDto;
    repositories: RepositoriesDetailItemDto[];
  }) => void;
};

export const useRepositoriesStore = create<RepositoriesStore>((set) => ({
  repositories: {},
  meta: {
    query: "",
    totalCount: 0,
    incompleteResults: false,
    firstPage: "",
    lastPage: "",
    prevPage: "",
    nextPage: "",
    page: 1,
    perPage: 30,
  },
  setSearchResult: ({ repositories, meta }) =>
    set(() => ({
      repositories: Object.fromEntries(
        repositories.map((repository) => [repository.id, repository]),
      ),
      meta: {
        ...meta,
        query: meta.query,
        totalCount: meta.totalCount,
        incompleteResults: meta.incompleteResults,
        firstPage: meta.firstPage,
        lastPage: meta.lastPage,
        prevPage: meta.prevPage,
        nextPage: meta.nextPage,
        page: meta.page,
        perPage: meta.perPage,
      },
    })),
}));
