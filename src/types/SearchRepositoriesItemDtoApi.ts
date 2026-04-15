import { SearchRepositoriesOwnerDtoApi } from "./SearchRepositoriesOwnerDtoApi";

export type SearchRepositoriesItemDtoApi = {
  id: number;
  name: string;
  owner: SearchRepositoriesOwnerDtoApi;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
};
