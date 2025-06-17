export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  license: {
    key: string;
    name: string;
  } | null;
  updated_at: string;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  topics: string[];
  open_issues_count: number;
  watchers_count: number;
  size: number;
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export type SortOption = 'stars' | 'forks' | 'updated';
export type OrderOption = 'desc' | 'asc';

export interface SearchFilters {
  query: string;
  language: string;
  minStars: string;
  maxStars: string;
  license: string;
  sort: SortOption;
  order: OrderOption;
  page: number;
  perPage: number;
}

export interface SearchState {
  filters: SearchFilters;
  repositories: Repository[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}