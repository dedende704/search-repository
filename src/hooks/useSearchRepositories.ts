import { useState } from "react";
import { SearchRepositoriesResDto } from "../types/searchRepositoriesResDto";
import { searchRepositories } from "../api/searchApi";
import { SearchRepositoriesHeaderLinkDto } from "../types/SearchRepositoriesHeaderLinkDto";

export function useSearchRepositories() {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState<SearchRepositoriesResDto>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [links, setLinks] = useState<SearchRepositoriesHeaderLinkDto>();
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(false);
    try {
      const response = await searchRepositories(query);
      setRepositories(response.data);
      console.log(response.headers);
      setLinks(parseLinkHeader(response.headers.link));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(true);
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const parseLinkHeader = (header: string | null) => {
    if (!header) return;
    const links: SearchRepositoriesHeaderLinkDto = {
      first: "",
      last: "",
      prev: "",
      next: "",
    };
    const linkHeaders = header.split(",");
    linkHeaders.forEach((linkHeader) => {
      const match = linkHeader.match(/<(.*)>; rel="(.*)"/);
      if (match) {
        if (linkHeader.includes(`rel=\"next\"`)) {
          links.next = match[1];
        }
        if (linkHeader.includes(`rel=\"last\"`)) {
          links.last = match[1];
        }
        if (linkHeader.includes(`rel=\"prev\"`)) {
          links.prev = match[1];
        }
        if (linkHeader.includes(`rel=\"first\"`)) {
          links.first = match[1];
        }
      }
    });
    return links;
  };
  return {
    query,
    setQuery,
    repositories,
    loading,
    error,
    links,
    handleSearch,
  };
}
