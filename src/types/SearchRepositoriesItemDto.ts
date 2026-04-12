import { SearchRepositoriesOwnerDto } from "./SearchRepositoriesOwnerDto";

export interface SearchRepositoriesItemDto {
  id: number;
  name: string;
  owner: SearchRepositoriesOwnerDto;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  issues_count: number;
  updated_at: string;
}
