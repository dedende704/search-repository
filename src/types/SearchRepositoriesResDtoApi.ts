import { SearchRepositoriesItemDtoApi } from "./SearchRepositoriesItemDtoApi";

export type SearchRepositoriesResDtoApi = {
  total_count: number;
  incomplete_results: boolean;
  items: SearchRepositoriesItemDtoApi[];
};
