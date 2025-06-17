import {
  Calendar,
  ExternalLink,
  Eye,
  GitFork,
  Scale,
  Star,
} from "lucide-react";
import { memo } from "react";
import { Repository } from "../types/repository";

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard = memo<RepositoryCardProps>(({ repository }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
      javascript: "#f1e05a",
      typescript: "#2b7489",
      python: "#3572a5",
      java: "#b07219",
      go: "#00add8",
      rust: "#dea584",
      "c++": "#f34b7d",
      "c#": "#239120",
      php: "#4f5d95",
      ruby: "#701516",
      swift: "#ffac45",
      kotlin: "#f18e33",
      dart: "#00b4ab",
      shell: "#89e051",
      html: "#e34c26",
      css: "#1572b6",
    };
    return colors[language?.toLowerCase() || ""] || "#6b7280";
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* header of the repository card */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className="w-10 h-10 rounded-full ring-2 ring-gray-100"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {repository.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {repository.owner.login}
            </p>
          </div>
        </div>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>

      {/* description of the repository card */}
      {repository.description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {repository.description}
        </p>
      )}

      {/* topics of the repository card */}
      {repository.topics && repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {repository.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
          {repository.topics.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{repository.topics.length - 3}
            </span>
          )}
        </div>
      )}

      {/* stats of the repository card */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">
              {formatNumber(repository.stargazers_count)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="h-4 w-4 text-gray-500" />
            <span>{formatNumber(repository.forks_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4 text-gray-500" />
            <span>{formatNumber(repository.watchers_count)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-xs">{formatDate(repository.updated_at)}</span>
        </div>
      </div>

      {/* footer of the repository card */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          {repository.language && (
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getLanguageColor(repository.language),
                }}
              />
              <span className="text-sm text-gray-700">
                {repository.language}
              </span>
            </div>
          )}

          {repository.license && (
            <div className="flex items-center space-x-1">
              <Scale className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">
                {repository.license.name}
              </span>
            </div>
          )}
        </div>

        {repository.open_issues_count > 0 && (
          <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            {repository.open_issues_count} issues
          </span>
        )}
      </div>
    </div>
  );
});

RepositoryCard.displayName = "RepositoryCard";
