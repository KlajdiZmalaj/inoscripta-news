import moment from "moment";
import { FiltersType } from "./types";
export const generateApiParams = (filters: FiltersType, type: keyof typeof apis) => {
  const apis = {
    //Guardian api url + api_key + all params from guardian documentations
    guardian: {
      url: "https://content.guardianapis.com/search?",
      "api-key": "80885092-60ad-4fc0-826c-91596fe5f1c7",
      "page-size": 20,
      format: "json",
      "show-elements": "image",
      q: filters["search"],

      // AUTHOR SEARCH QUERY on guardian tag=contributor/john-smith (this filter params doesnt work well with guardian api)
      tag: filters["author"] ? `contributor/${filters["author"]}` : "",
      "show-tags": "contributor",
      category: filters["category"],
      "from-date": filters["startDate"] ? moment(filters["startDate"]).format("YYYY-MM-DD") : "",
      "to-date": filters["endDate"] ? moment(filters["endDate"]).format("YYYY-MM-DD") : "",
    },
    //New york times api url + api_key + all params from nyt documentations
    nyt: {
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
      "api-key": "GtT7ebLmEGST0NJIdGlPMJTsIjzwDg0e",
      q: filters["search"],
      // AUTHOR SEARCH QUERY on nyt fq=byline:("John")
      fq: filters["author"] ? `byline:(${filters["author"]})` : "",
      category: filters["category"],
      begin_date: filters["startDate"] ? moment(filters["startDate"]).format("YYYYMMDD") : "",
      end_date: filters["endDate"] ? moment(filters["endDate"]).format("YYYYMMDD") : "",
    },
    //news.org york times api url + api_key + all params from news.org documentations
    news: {
      url: "https://newsapi.org/v2/top-headlines?",
      apiKey: "a947eda0d5c64da3b70f9f792c5062c6",
      q: filters["search"] || "news",

      //they dont provide filters for author but anyway i send it
      authors: filters["author"],

      category: filters["category"],

      from: filters["startDate"] ? moment(filters["startDate"]).format("YYYY-MM-DD") : "",
      to: filters["endDate"] ? moment(filters["endDate"]).format("YYYY-MM-DD") : "",
    },
  };
  const filteredValues = Object.entries(apis[type]).filter(
    ([_, value]) => value !== null && value !== undefined && value !== ""
  );
  return filteredValues;
};
