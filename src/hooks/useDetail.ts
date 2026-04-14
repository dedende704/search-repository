import { useRepositoriesStore } from "../types/RepositoriesStore";

export function useDetail(id: string) {
  const { repositories } = useRepositoriesStore();
  const repository = repositories[Number(id)];
  return {
    repository,
  };
}
