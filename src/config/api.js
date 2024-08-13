import moment from "moment";
export const generateApiParams = (filters, type) => {
  const apis = {
    guardian: {
      url: "https://content.guardianapis.com/search?",
      "api-key": "633c84af-0182-44ff-a5fd-3e4d2b1ca14a",
      "page-size": 20,
      format: "json",
      "show-elements": "image",
      q: filters["search"],
      // AUTHOR SEARCH QUERY on guardian tag=contributor/john-smith
      tag: filters["author"] ? `contributor/${filters["author"]}` : "",
      "show-tags": "contributor",

      "from-date": filters["startDate"] ? moment(filters["startDate"]).format("YYYY-MM-DD") : "",
      "to-date": filters["endDate"] ? moment(filters["endDate"]).format("YYYY-MM-DD") : "",
    },
    nyt: {
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
      "api-key": "GtT7ebLmEGST0NJIdGlPMJTsIjzwDg0e",
      q: filters["search"],
      // AUTHOR SEARCH QUERY on nyt fq=byline:("test author")
      fq: filters["author"] ? `byline:(${filters["author"]})` : "",

      begin_date: filters["startDate"] ? moment(filters["startDate"]).format("YYYYMMDD") : "",
      end_date: filters["endDate"] ? moment(filters["endDate"]).format("YYYYMMDD") : "",
    },
    news: {
      url: "https://newsapi.org/v2/top-headlines?",
      apiKey: "a947eda0d5c64da3b70f9f792c5062c6",
      q: filters["search"] || "news",

      authors: filters["author"],

      category: filters["category"],

      from: filters["startDate"] ? moment(filters["startDate"]).format("YYYY-MM-DD") : "",
      to: filters["endDate"] ? moment(filters["endDate"]).format("YYYY-MM-DD") : "",
    },
  };
  const filteredValues = Object.entries(apis[type]).filter(
    ([key, value]) => value !== null && value !== undefined && value !== ""
  );
  return filteredValues;
};
