import { GuardianModel, NewsDataType, NewsModel, NYTModel } from "./types";

export const newsMapper = (newsData: NewsDataType[], type: "guardian" | "nyt" | "news") => {
  switch (type) {
    case "guardian":
      return (newsData || []).map((news: GuardianModel) => guardianModel(news));
    case "nyt":
      return (newsData || []).map((news: NYTModel) => nytModel(news));
    case "news":
      return (newsData || []).map((news: NewsModel) => newsModel(news));
    default:
      return [];
  }
};

const nytModel = (newsData: NYTModel) => {
  return {
    id: newsData._id,
    date: newsData.pub_date,
    category: newsData.section_name,
    title: newsData.headline.main,
    author: joinStrings([
      newsData.byline?.person?.[0]?.firstname,
      newsData.byline?.person?.[0]?.middlename,
      newsData.byline?.person?.[0]?.lastname,
    ]),
    link: newsData.web_url,
    image: newsData.multimedia?.[0]?.url
      ? "https://www.nytimes.com/" + newsData.multimedia?.[0]?.url
      : "https://placehold.co/500x500",
  };
};

const guardianModel = (newsData: GuardianModel) => {
  return {
    id: newsData.id,
    date: newsData.webPublicationDate,
    category: newsData.pillarName,
    title: newsData.webTitle,
    author: newsData.tags?.[0]?.webTitle,
    link: newsData.webUrl,
    image: newsData.elements?.[0]?.assets?.[0]?.file || "https://placehold.co/500x500",
  };
};

const newsModel = (newsData: NewsModel) => {
  return {
    id: newsData.id,
    date: newsData.publishedAt,
    source: newsData.source?.name,
    title: newsData.title,
    author: newsData.author,
    link: newsData.url,
    image: newsData.urlToImage || "https://placehold.co/500x500",
  };
};

export type NewsModelType = ReturnType<any>; //TODO : add type return of all newsModel | nytModel | guardianModel

const joinStrings = (items: any) => {
  return items.filter((i: any) => i).join(" ");
};
