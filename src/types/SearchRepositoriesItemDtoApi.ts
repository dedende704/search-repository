import { SearchRepositoriesOwnerDtoApi } from "./SearchRepositoriesOwnerDtoApi";

export type SearchRepositoriesItemDtoApi = {
  id: number;
  name: string;
  owner: SearchRepositoriesOwnerDtoApi;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  issues_count: number;
};
