import { useReducer, useCallback, useEffect, useMemo } from "react";
import {
  SearchState,
  SearchFilters,
  Repository,
  SearchResponse,
} from "../types/repository";
import { useDebounce } from "./useDebounce";
import { useUrlState } from "./useUrlState";
import { buildSearchQuery } from "../utils/searchUtils";
import { GITHUB_API_BASE_URL, DEFAULT_PER_PAGE } from "../constants";

const initialFilters: SearchFilters = {
  query: "",
  language: "",
  minStars: "",
  maxStars: "",
  license: "",
  sort: "stars",
  order: "desc",
  page: 1,
  perPage: DEFAULT_PER_PAGE,
};

const initialState: SearchState = {
  filters: initialFilters,
  repositories: [],
  totalCount: 0,
  loading: false,
  error: null,
  hasSearched: false,
};

type SearchAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_RESULTS";
      payload: { repositories: Repository[]; totalCount: number };
    }
  | { type: "UPDATE_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "SET_HAS_SEARCHED"; payload: boolean };

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_RESULTS":
      return {
        ...state,
        repositories: action.payload.repositories,
        totalCount: action.payload.totalCount,
        loading: false,
        error: null,
      };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case "SET_HAS_SEARCHED":
      return { ...state, hasSearched: action.payload };
    default:
      return state;
  }
};

export const useGitHubSearch = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const debouncedQuery = useDebounce(state.filters.query, 500);

  const updateFilters = useCallback((updates: Partial<SearchFilters>) => {
    dispatch({ type: "UPDATE_FILTERS", payload: updates });
  }, []);

  useUrlState(state.filters, updateFilters);

  const searchRepositories = useCallback(async (filters: SearchFilters) => {
    if (
      !filters.query.trim() &&
      !filters.language &&
      !filters.minStars &&
      !filters.maxStars &&
      !filters.license
    ) {
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true }); // set the loading state to true  so that a skeleton can show to the user
    try {
      const searchQuery = buildSearchQuery(filters); //
      const url = new URL(`${GITHUB_API_BASE_URL}/search/repositories`); // create a new URL object with the GitHub API base URL and the search repositories endpoint

      url.searchParams.set("q", searchQuery); // set the search query to the URL
      url.searchParams.set("sort", filters.sort); // set the sort to the URL
      url.searchParams.set("order", filters.order); // set the order to the URL
      url.searchParams.set("page", filters.page.toString()); // set the page to the URL
      url.searchParams.set("per_page", filters.perPage.toString()); // set the per page to the URL

      const response = await fetch(url.toString()); // fetch the response from the URL

      if (!response.ok) {
        // if the response has 403, it means you hit the rate limit
        if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data: SearchResponse = await response.json(); // convert to json

      dispatch({
        type: "SET_RESULTS",
        payload: {
          repositories: data.items,
          totalCount: data.total_count,
        },
      });
      dispatch({ type: "SET_HAS_SEARCHED", payload: true });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "An error occurred while searching",
      });
    }
  }, []);

  // the useEffect tha runs whenevr the query or the filters changes
  useEffect(() => {
    const filters = { ...state.filters, query: debouncedQuery };
    searchRepositories(filters);
  }, [debouncedQuery, state.filters, searchRepositories]);

  const totalPages = useMemo(() => {
    return Math.min(Math.ceil(state.totalCount / state.filters.perPage), 100);
  }, [state.totalCount, state.filters.perPage]);

  return {
    ...state,
    updateFilters,
    totalPages,
    searchRepositories: () => searchRepositories(state.filters),
  };
};
