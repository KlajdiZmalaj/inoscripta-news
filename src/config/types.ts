export type Sources = "nyt" | "guardian" | "news";
export type FiltersType = {
  source: Sources;
  category: string;
  author: string;
  search: string;
  startDate: string;
  endDate: string;
};

export interface NYTModel {
  abstract: string;
  byline: {
    original: string | null;
    person: Array<{ firstname?: string; lastname?: string; middlename?: string }>; // Adjust based on actual structure
    organization: string | null;
  };
  document_type: string;
  headline: {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    // Add other properties if needed
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  lead_paragraph: string;
  multimedia: Array<{
    rank: number;
    subtype: string;
    caption: string | null;
    credit: string | null;
    type: string;
    url: string;
    // Add other properties if needed
  }>;
  news_desk: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}
export interface GuardianModel {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  tags: Array<{
    id: string;
    type: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    references: Array<unknown>;
    bio: string;
    firstName: string;
    lastName: string;
  }>;
  elements: Array<{
    id: string;
    relation: string;
    type: string;
    assets: Array<{
      type: string;
      mimeType?: string;
      file: string;
      typeData: {
        altText: string;
        caption?: string;
        credit: string;
        photographer: string;
        source: string;
        width: string;
        height: string;
        secureFile: string;
        displayCredit: string;
        mediaId: string;
        imageType: string;
        suppliersReference: string;
      };
    }>;
  }>;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}
export interface NewsModel {
  id: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}
export type NewsDataType = NYTModel & GuardianModel & NewsModel;
