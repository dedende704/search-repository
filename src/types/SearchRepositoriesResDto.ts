import { SearchRepositoriesItemDto } from "./SearchRepositoriesItemDto";

export interface SearchRepositoriesResDto {
  totalCount: number;
  incomplete_results: boolean;
  items: SearchRepositoriesItemDto[];
}
