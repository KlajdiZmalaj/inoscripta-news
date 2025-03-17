import moment from "moment";

type FiltersType = {
  search?: string;
  author?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
};

type ApiConfig = {
  url: string;
  [key: string]: string | number | undefined;
};

const GUARDIAN_API_KEY = "80885092-60ad-4fc0-826c-91596fe5f1c7";
const NYT_API_KEY = "GtT7ebLmEGST0NJIdGlPMJTsIjzwDg0e";
const NEWS_API_KEY = "a947eda0d5c64da3b70f9f792c5062c6";

const getFormattedDate = (date?: string, format: string = "YYYY-MM-DD") => {
  return date ? moment(date).format(format) : "";
};

const generateGuardianParams = (filters: FiltersType): ApiConfig => ({
  url: "https://content.guardianapis.com/search?",
  "api-key": GUARDIAN_API_KEY,
  "page-size": 20,
  format: "json",
  "show-elements": "image",
  q: filters.search,
  tag: filters.author ? `contributor/${filters.author}` : "",
  "show-tags": "contributor",
  category: filters.category,
  "from-date": getFormattedDate(filters.startDate),
  "to-date": getFormattedDate(filters.endDate),
});

const generateNytParams = (filters: FiltersType): ApiConfig => ({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
  "api-key": NYT_API_KEY,
  q: filters.search,
  fq: filters.author ? `byline:(${filters.author})` : "",
  category: filters.category,
  begin_date: getFormattedDate(filters.startDate, "YYYYMMDD"),
  end_date: getFormattedDate(filters.endDate, "YYYYMMDD"),
});

const generateNewsParams = (filters: FiltersType): ApiConfig => ({
  url: "https://newsapi.org/v2/top-headlines?",
  apiKey: NEWS_API_KEY,
  q: filters.search || "news",
  authors: filters.author,
  category: filters.category,
  from: getFormattedDate(filters.startDate),
  to: getFormattedDate(filters.endDate),
});

const apis = {
  guardian: generateGuardianParams,
  nyt: generateNytParams,
  news: generateNewsParams,
};

export const generateApiParams = (filters: FiltersType, type: keyof typeof apis) => {
  const apiParams = apis[type](filters);
  return Object.entries(apiParams).filter(([_, value]) => value && value !== "");
};
