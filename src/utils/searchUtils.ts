import { SearchFilters } from "../types/repository";

export const buildSearchQuery = (filters: SearchFilters): string => {
  let query = filters.query || "stars:>1"; // set star count to 1 to avoid empty searches if no query is passed
  if (filters.language) {
    query += ` language:${filters.language}`;
  }

  if (filters.minStars && filters.maxStars) {
    query += ` stars:${filters.minStars}..${filters.maxStars}`;
  } else if (filters.minStars) {
    query += ` stars:>=${filters.minStars}`;
  } else if (filters.maxStars) {
    query += ` stars:<=${filters.maxStars}`;
  }

  if (filters.license) {
    query += ` license:${filters.license}`;
  }

  return query;
};
