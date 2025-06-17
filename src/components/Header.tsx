import { Github, Search } from "lucide-react";
import { memo } from "react";

interface HeaderProps {
  totalCount: number;
  loading: boolean;
  hasSearched: boolean;
}

export const Header = memo<HeaderProps>(
  ({ totalCount, loading, hasSearched }) => {
    const formatNumber = (num: number): string => {
      return num.toLocaleString();
    };

    return (
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg">
            <Github className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            GitHub Explorer
          </h1>
        </div>

        <p className="text-gray-600 text-lg mb-4">
          Discover and explore public repositories
        </p>

        {hasSearched && !loading && (
          <div className="inline-flex items-center space-x-2 bg-white rounded-full shadow-md px-4 py-2 border border-gray-100">
            <Search className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Found{" "}
              <span className="font-semibold text-blue-600">
                {formatNumber(totalCount)}
              </span>{" "}
              repositories
            </span>
          </div>
        )}
      </div>
    );
  }
);

Header.displayName = "Header";
