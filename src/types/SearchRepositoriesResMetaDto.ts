export type SearchRepositoriesResMetaDto = {
  totalCount: number;
  incompleteResults: boolean;
  firstPage: string;
  lastPage: string;
  prevPage: string;
  nextPage: string;
  page: number;
  perPage: number;
  query: string;
};
