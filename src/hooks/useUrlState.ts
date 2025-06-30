import { useCallback, useEffect, useState } from "react";
import { SearchFilters, SortOption, OrderOption } from "../types/repository";

export const useUrlState = (
  filters: SearchFilters,
  updateFilters: (updates: Partial<SearchFilters>) => void
) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // load filters from URL on mount
  const loadFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilters: Partial<SearchFilters> = {};

    if (params.get("q")) urlFilters.query = params.get("q")!;
    if (params.get("language")) urlFilters.language = params.get("language")!;
    if (params.get("minStars")) urlFilters.minStars = params.get("minStars")!;
    if (params.get("maxStars")) urlFilters.maxStars = params.get("maxStars")!;
    if (params.get("license")) urlFilters.license = params.get("license")!;
    if (params.get("sort")) urlFilters.sort = params.get("sort")! as SortOption;
    if (params.get("order"))
      urlFilters.order = params.get("order")! as OrderOption;
    if (params.get("page")) urlFilters.page = parseInt(params.get("page")!);
    if (params.get("perPage"))
      urlFilters.perPage = parseInt(params.get("perPage")!);

    if (Object.keys(urlFilters).length > 0) {
      updateFilters(urlFilters);
    }
    setIsInitialized(true); //  initialize the state after loading from URL
  }, [updateFilters]);

  // load filters and initialize the state from URL only once on mount
  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl]);

  //  update the url when filters change and the state is initialized
  useEffect(() => {
    if (!isInitialized) return; // don't update URL until we've loaded from it

    const params = new URLSearchParams();

    if (filters.query) params.set("q", filters.query);
    if (filters.language) params.set("language", filters.language);
    if (filters.minStars) params.set("minStars", filters.minStars);
    if (filters.maxStars) params.set("maxStars", filters.maxStars);
    if (filters.license) params.set("license", filters.license);
    if (filters.sort !== "stars") params.set("sort", filters.sort);
    if (filters.order !== "desc") params.set("order", filters.order);
    if (filters.page !== 1) params.set("page", filters.page.toString());
    if (filters.perPage !== 10)
      params.set("perPage", filters.perPage.toString());

    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }, [filters, isInitialized]);
};
