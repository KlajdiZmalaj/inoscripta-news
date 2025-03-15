import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateApiParams } from "../../config/api";
import { newsMapper, NewsModelType } from "../../config/utils";
import { FiltersType, GuardianModel, NewsDataType, NYTModel } from "../../config/types";
import mockData from "../../mocks/mock.json";

const DEFAULT_FILTER: FiltersType = {
  source: "nyt",
  category: "",
  author: "",
  search: "",
  startDate: "",
  endDate: "",
};
//create context
const NewsContext = createContext<{
  newsData: NewsModelType[];
  loading: boolean;
  filters: FiltersType;
  handleFilterChange: (type: keyof typeof DEFAULT_FILTER, newValue: string) => void;
  handleSubmit: () => void;
}>({
  newsData: [],
  loading: false,
  filters: DEFAULT_FILTER,
  handleFilterChange: () => {},
  handleSubmit: () => {},
});
//export as hook
export const useNewsContext = () => useContext(NewsContext);

type Props = {};
const NewsProvider = ({ children }: PropsWithChildren<Props>) => {
  const [newsData, setNewsData] = useState<NewsModelType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTER);

  const getData = useCallback(async () => {
    //query params filters we send to backend
    const setMockData = () => {
      setNewsData(newsMapper(mockData?.data as NewsModelType[], "nyt")); //setting mock data instaead of read data (apis not working, so using mock data)
      setLoading(false);
    };
    try {
      const params: any = generateApiParams(filters, filters["source"]);
      setLoading(true);
      setNewsData([]);
      const response = await fetch(params[0][1] + new URLSearchParams(params).toString());
      const newsDataApi = await response.json();
      setLoading(false);

      if (newsDataApi) {
        //some apis use response.docs, some articles and some response.results
        setNewsData(
          newsMapper(
            newsDataApi?.response?.docs || newsDataApi?.response?.results || newsDataApi?.articles,
            filters.source
          )
        );
      } else {
        //handle error
        setMockData();
      }
    } catch (error) {
      setMockData();
    }
  }, [filters, mockData]);

  const handleFilterChange = (type: keyof typeof DEFAULT_FILTER, newValue: string) => {
    setFilters({
      ...filters,
      [type]: newValue,
    });
  };

  const handleSubmit = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, loading, filters, handleFilterChange, handleSubmit }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
