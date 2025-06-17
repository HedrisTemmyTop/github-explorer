import React, { useCallback } from "react";
import { useGitHubSearch } from "../hooks/useGitHubSearch";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { Pagination } from "./Pagination";
import { RepositoryList } from "./RepositoryList";
import { SearchBar } from "./SearchBar";

export const GitHubExplorer: React.FC = () => {
  const {
    filters,
    repositories,
    totalCount,
    loading,
    error,
    hasSearched,
    totalPages,
    updateFilters,
  } = useGitHubSearch();

  const handleSearchChange = useCallback(
    (query: string) => {
      updateFilters({ query, page: 1 });
    },
    [updateFilters]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ page });

      // once you change the page, scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateFilters]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header
          totalCount={totalCount}
          loading={loading}
          hasSearched={hasSearched}
        />

        <div className="mb-8">
          <SearchBar
            value={filters.query}
            onChange={handleSearchChange}
            loading={loading}
            placeholder="Search repositories by name, description, or topic..."
          />
        </div>

        <div className="mb-8">
          <Filters filters={filters} onFiltersChange={updateFilters} />
        </div>

        <div className="mb-8">
          <RepositoryList
            repositories={repositories}
            loading={loading}
            error={error}
            hasSearched={hasSearched}
          />
        </div>

        {repositories.length > 0 && (
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};
