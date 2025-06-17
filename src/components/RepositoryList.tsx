import { memo } from "react";
import { Repository } from "../types/repository";
import { RepositoryCard } from "./RepositoryCard";
import { SkeletonCard } from "./SkeletonCard";

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export const RepositoryList = memo<RepositoryListProps>(
  ({ repositories, loading, error, hasSearched }) => {
    // if the loading state is true, render the skeleton cards
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    // if the error state is not null, render the error message
    if (error) {
      return (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <div className="text-red-600 text-lg font-semibold mb-2">
              Search Error
            </div>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      );
    }

    // if the hasSearched state is false, render the welcome message
    if (!hasSearched) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            Welcome to GitHub Explorer
          </div>
          <p className="text-gray-400">
            Search for repositories or apply filters to get started
          </p>
        </div>
      );
    }

    // if the repositories array is empty, render the no repositories found message
    if (repositories.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            No repositories found
          </div>
          <p className="text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      );
    }

    // if the repositories array is not empty, render the repository cards
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    );
  }
);

RepositoryList.displayName = "RepositoryList";
