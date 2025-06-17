import { Filter, RotateCcw } from "lucide-react";
import { memo } from "react";
import { OrderOption, SearchFilters, SortOption } from "../types/repository";

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (updates: Partial<SearchFilters>) => void;
}

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "C++",
  "C#",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Dart",
  "Shell",
  "HTML",
  "CSS",
];

const LICENSES = [
  "mit",
  "apache-2.0",
  "gpl-3.0",
  "bsd-3-clause",
  "bsd-2-clause",
  "lgpl-3.0",
  "mpl-2.0",
  "unlicense",
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "updated", label: "Last Updated" },
];

export const Filters = memo<FiltersProps>(({ filters, onFiltersChange }) => {
  const hasActiveFilters =
    filters.language || filters.minStars || filters.maxStars || filters.license;

  const clearFilters = () => {
    onFiltersChange({
      language: "",
      minStars: "",
      maxStars: "",
      license: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) =>
              onFiltersChange({ language: e.target.value, page: 1 })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="">All Languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Stars
          </label>
          <input
            type="number"
            value={filters.minStars}
            onChange={(e) =>
              onFiltersChange({ minStars: e.target.value, page: 1 })
            }
            placeholder="e.g. 100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Stars
          </label>
          <input
            type="number"
            value={filters.maxStars}
            onChange={(e) =>
              onFiltersChange({ maxStars: e.target.value, page: 1 })
            }
            placeholder="e.g. 10000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License
          </label>
          <select
            value={filters.license}
            onChange={(e) =>
              onFiltersChange({ license: e.target.value, page: 1 })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="">All Licenses</option>
            {LICENSES.map((license) => (
              <option key={license} value={license}>
                {license.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={filters.sort}
            onChange={(e) =>
              onFiltersChange({ sort: e.target.value as SortOption, page: 1 })
            }
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Order:</label>
          <select
            value={filters.order}
            onChange={(e) =>
              onFiltersChange({ order: e.target.value as OrderOption, page: 1 })
            }
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Per page:</label>
          <select
            value={filters.perPage}
            onChange={(e) =>
              onFiltersChange({ perPage: parseInt(e.target.value), page: 1 })
            }
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
});

Filters.displayName = "Filters";
