import { Search, X } from "lucide-react";
import { memo } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export const SearchBar = memo<SearchBarProps>(
  ({
    value,
    onChange,
    placeholder = "Search repositories...",
    loading = false,
  }) => {
    const handleClear = () => {
      onChange("");
    };

    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search
            className={`h-5 w-5 transition-colors duration-200 ${
              loading ? "text-blue-500 animate-pulse" : "text-gray-400"
            }`}
          />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg bg-white rounded-2xl shadow-lg border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder-gray-400"
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
